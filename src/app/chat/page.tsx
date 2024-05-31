"use client";
import { contracts, demo_data, questions } from "@/lib/db/data";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SampleQuestion from "@/components/chat/SampleQuestion";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Conversation, Message, useAppContext } from "@/context";
import { dotVariants } from "@/lib/utils/variables";
import showdown from "showdown";
import { remark } from "remark";
import html from "remark-html";
import rehypeRaw from "rehype-raw";
import Markdown, { compiler } from "markdown-to-jsx";
import SyntaxComponent from "@/components/chat/SyntaxHighlighter_react";
import { fresh, getConversation } from "@/lib/actions";
import { serverUrl } from "@/lib/utils/config";
import Typewriter from "typewriter-effect";
import { stringify } from "querystring";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const converter = new showdown.Converter({ simpleLineBreaks: true });

const Chat = () => {
  // showdown.setOption("simpleLineBreaks", true);
  // var defaultOptions = showdown.getOption("simpleLineBreaks");
  // console.log(defaultOptions);

  const [message, setValue] = useState<string>("");
  const [response, setResponse] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  let [conversation, setConversation] = useState<Message[]>([]);
  const { query, setQuery, setNewChat, chatId, setChatId } = useAppContext();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const session = useSession();
  const router = useRouter();
  const initialResponse = response.replace(/\\n/g, "\n");
  // Counter for each user message
  let num = 0;

  // Inside the Chat component
  const addNewMessage = (question: string) => {
    setResponse("Thinking.....");
    const userMessage = {
      role: "user",
      content: question,
    };

    // Create a new message object for the response
    const newConvo =
      conversation?.length > 0
        ? [...conversation, ...[userMessage]]
        : [userMessage];

    setConversation(newConvo);
    // Scroll to bottom
    if (chatContainerRef.current) {
      const element = chatContainerRef.current;
      setTimeout(() => {
        element.scrollTop = element.scrollHeight;
      }, 0);

      // Add a class for smooth scrolling animation
      element.classList.add("smooth-scroll");

      // Remove the class after a short delay
      setTimeout(() => {
        element.classList.remove("smooth-scroll");
      }, 200); // Adjust delay for desired animation duration
    }

    // Clear input
    setValue("");
    console.log("hello bros", conversation);
  };

  const fetchId = async () => {
    const conversation: Conversation = await getConversation(chatId);
    setConversation(conversation?.messages);
  };

  /**Send message to chatbot */
  const sendMessage = async (question: string) => {
    if (!chatId) {
      try {
        const id = await fresh(mail);
        setChatId(id);
      } catch (error) {
        console.log(error);
        setError("No Conversation selected");
        return;
      }
    }
    setError("");
    try {
      const res = await fetch(
        `${serverUrl}/api/v1/conversations/${chatId}/messages?stream=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: question.concat(`.category:${query}`),
          }),
        }
      );
      console.log("response:", res);

      if (!res.ok) {
        console.log("No Response");
        setResponse("#Server is currently down. Please try again later");
        return;
      }
      if (res.body) {
        const reader = res?.body?.getReader();
        let buffer = "";
        let val = "";
        const userMessage = {
          role: "user",
          content: message,
        };
        const assistantMessage = {
          role: "assistant",
          content: message,
        };
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // If stream is done, break the loop
            fetchId();
            setResponse("");

            break;
          }

          // Append the received chunk to the buffer
          buffer += new TextDecoder().decode(value);

          // Check if the buffer contains a complete JSON object
          let startIndex = buffer.indexOf("data:");
          let endIndex = buffer.indexOf("\n", startIndex);
          // Create a new message object for the response
          // const newConvo = [...conversation, ...[userMessage]];

          // setConversation(newConvo);
          while (startIndex !== -1 && endIndex !== -1) {
            const jsonStr = buffer.substring(startIndex, endIndex);
            try {
              const data = JSON.parse(jsonStr.replace("data:", ""));
              if (data.type === "delta") {
                val += data.data;
                console.log(val);
                setResponse(val);
                setTimeout(() => {
                  if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop =
                      chatContainerRef.current.scrollHeight;
                  }
                }, 0);
              }
            } catch (error: any) {
              console.error("Error parsing JSON:", error.message);
            }

            // // Remove the parsed JSON object from the buffer
            buffer = buffer.substring(endIndex + 1);

            // Check for next JSON object in the buffer
            startIndex = buffer.indexOf("data:");
            endIndex = buffer.indexOf("\n", startIndex);
          }
        }
      }
    } catch (error: any) {
      console.error("Error getting convos:", error.message);
    }
  };
  useEffect(() => {
    const mail = localStorage.getItem("mail") as string;
    const name = localStorage.getItem("name") as string;
    console.log("messages", conversation);

    if (mail) {
      setMail(mail);
    }
    if (name) {
      setName(name);
    }
  }, []);
  useEffect(() => {
    if (chatId) {
      fetchId();
    }
  }, [chatId]);
  useEffect(() => {
    //console.log(session.status)

    if (session.status === "unauthenticated") {
      router.replace("/auth");
    }
  });

  return (
    <div className='w-full relative overflow-hidden flex flex-col h-full'>
      {/* Header Section */}
      <section className='flex justify-between px-[20px] mx-[26px] mt-[30px]  items-center'>
        <div className='flex flex-col items-center'>
          <Link href={"/"}>
            <div className='w-[107.12px] h-[45px]  relative'>
              <Image src={"/images/ailogo.png"} fill alt='logo' />
            </div>
          </Link>
          <p className=' text-[#C3C3C3] text-xs self-center '>Ver 1.0 Apr 24</p>
        </div>

        {/* <div className='flex gap-2'>
          <Image src={"/images/sun.png"} width={24} height={24} alt='sun' />
          <p className='text-white font-light'>Light Mode</p>
        </div> */}
      </section>
      {/* Body Section/ Conversations */}
      {conversation?.length > 0 && (
        <div
          ref={chatContainerRef}
          style={{ overflowAnchor: "none" }}
          className='h-[74%] overflow-y-scroll scroller  pb-14 duration-1000 self-center scrollbar-hide  w-[75%]'
        >
          {conversation.map((item: Message, index: number) => {
            const res = item.content.replace(/\\n/g, "\n");
            if (item.role === "user") {
              num += 1;
            }
            if (item.role == "assistant") {
              return (
                <div
                  key={index.toString()}
                  className='w-full flex h-max my-5 justify-start gap-5'
                >
                  <div className='bg-call_to_action rounded-full w-[48px] h-[48px] flex items-center justify-center'>
                    <Image
                      src={"icons/logo.svg"}
                      alt='logo'
                      width={36}
                      height={33}
                    />
                  </div>
                  <SyntaxComponent code={res} />
                </div>
              );
            } else if (item.role == "user") {
              return (
                <div
                  key={index.toString()}
                  className='w-full relative h-max my-5 flex justify-start gap-5'
                >
                  <div className='w-[48px]  h-[48px] text-call_to_action flex justify-center items-center text-2xl capitalize rounded-full bg-appGray'>
                    {mail.slice(0, 1) || name.slice(0, 1)}
                  </div>
                  <p className='absolute right-3 -top-3 h-max z-20 -bottom-10 text-xs text-white font-semibold'>
                    {num}
                  </p>
                  <pre className='flex-1 border-b border-appGray overflow-x-scroll pb-5 scrollbar-hide   text-white'>
                    {item.content?.split("User query:")[1] ?? item.content}
                  </pre>
                  <Image
                    src={"/icons/pencil.svg"}
                    width={24}
                    height={24}
                    alt='pencil'
                    className='absolute bottom-4 right-3'
                  />
                </div>
              );
            }
          })}
          {response && (
            <div className='w-full flex anchor h-max my-5 justify-start gap-5'>
              <div className='bg-call_to_action rounded-full w-[48px] h-[48px] flex items-center justify-center'>
                <Image
                  src={"icons/logo.svg"}
                  alt='logo'
                  width={36}
                  height={33}
                />
              </div>
              <SyntaxComponent code={initialResponse} />
            </div>
          )}
          {error !== "" && (
            <p className='text-3xl text-center my-2 text-red-600'> {error}</p>
          )}
        </div>
      )}
      {/* Default System Message */}
      <AnimatePresence mode='wait'>
        {conversation?.length == 0 && (
          <motion.div
            // key={index.toString()}
            variants={dotVariants}
            transition={{
              duration: 0.1,
              // repeat: Infinity,
              // repeatType: "reverse",
            }}
            className='h-max absolute bottom-[65%] self-center flex flex-col gap-4 items-center w-max'
          >
            <Image src={"/icons/logo.svg"} width={40} height={40} alt='logob' />
            <div className='text-white text-2xl special-text-2 cursor flex'>
              <Typewriter
                options={{
                  strings: [
                    "I am SuiAI, how can i help you today?",
                    "You can start with some of the example queries below.",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sample Queries section */}
      <AnimatePresence mode='wait'>
        {query == "Syntax" && conversation?.length == 0 && (
          <motion.div
            initial='start'
            animate='end'
            // exit='exit'
            transition={{
              duration: 0.6,
              staggerChildren: 0.3,
              delayChildren: 0.2,
            }}
            className='w-[75%] absolute bottom-[22%]  grid grid-cols-2  place-items-center gap-4 self-center'
          >
            {questions.map((item, index) => {
              return (
                <motion.div
                  // key={index.toString()}
                  key={`question_${item.q}_${query}`} // Unique key based on content and queries
                  variants={dotVariants}
                  transition={{
                    duration: 0.1,
                    // repeat: Infinity,
                    // repeatType: "reverse",
                  }}
                  className='h-max  flex w-max'
                >
                  <button
                    className='flex'
                    onClick={() => {
                      setQuery("");
                      addNewMessage(item.q);
                      sendMessage(item.q);
                      setNewChat(false);
                    }}
                  >
                    <SampleQuestion question={item.q} />;
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode='wait'>
        {query == "Contracts" && conversation.length == 0 && (
          <motion.div
            initial='start'
            animate='end'
            // exit='exit'
            transition={{
              duration: 0.3,
              staggerChildren: 0.2,
              delayChildren: 0.1,
            }}
            className='w-[75%] absolute bottom-[22%]  grid grid-cols-2  place-items-center gap-4 self-center'
          >
            {contracts.map((item, index) => {
              return (
                <motion.div
                  // key={index.toString()}
                  key={`question_${item.q}_${query}`} // Unique key based on content and queries
                  variants={dotVariants}
                  transition={{
                    duration: 0.3,
                    // repeat: Infinity,
                    // repeatType: "reverse",
                  }}
                  className='h-max  flex w-max'
                >
                  <button
                    className='flex'
                    onClick={() => {
                      setQuery("");
                      addNewMessage(item.q);
                      sendMessage(item.q);
                      setNewChat(false);
                    }}
                  >
                    <SampleQuestion question={item.q} />;
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom INput section */}
      <div className='absolute w-[75%] self-center bottom-[1%]'>
        {conversation?.length < 50 && (
          <div className='flex animate-puls mb-2 gap-3 '>
            <button
              onClick={() => setQuery("Syntax")}
              className={`flex w-max active:scale-95 ${
                query === "Syntax" && "bg-appAsh text-white"
              } cursor-pointer hover:bg-appAsh hover:bg-opacity-50 text-appAsh duration-100 hover:text-white items-center gap-2 px-2 h-[27px] rounded-[8px] bg-[#EEEEEE]`}
            >
              <Image
                src={"/icons/syntax.svg"}
                width={15}
                height={13}
                alt='syntax'
              />
              <p className='text-sm '>Move Syntax</p>
            </button>
            <button
              onClick={() => setQuery("Contracts")}
              className={`flex w-max active:scale-95 ${
                query === "Contracts" && "bg-appAsh text-white"
              } cursor-pointer hover:bg-appAsh hover:bg-opacity-50 text-appAsh duration-100 hover:text-white items-center gap-2 px-2 h-[27px] rounded-[8px] bg-[#EEEEEE]`}
            >
              <Image
                src={"/icons/contract.svg"}
                width={12}
                height={13.8}
                alt='contracts'
              />
              <p className='text-sm '>Smart Contracts</p>
            </button>
            <button
              onClick={() => setQuery("Testing")}
              className={`flex w-max active:scale-95 ${
                query === "Testing" && "bg-appAsh text-white"
              } cursor-pointer hover:bg-appAsh hover:bg-opacity-50 text-appAsh duration-100 hover:text-white items-center gap-2 px-2 h-[27px] rounded-[8px] bg-[#EEEEEE]`}
            >
              <Image
                src={"/icons/tests.svg"}
                width={12}
                height={13.8}
                alt='test'
              />
              <p className='text-sm '>Unit Tests</p>
            </button>
            <button
              onClick={() => setQuery("Debug")}
              title='Debug'
              className={`flex w-max active:scale-95 ${
                query === "Debug" && "bg-appAsh text-white"
              } cursor-pointer hover:bg-appAsh hover:bg-opacity-50 text-appAsh duration-100 hover:text-white items-center gap-2 px-2 h-[27px] rounded-[8px] bg-[#EEEEEE]`}
            >
              <Image
                src={"/icons/defi.svg"}
                width={14}
                height={18}
                alt='test'
              />
              <p className='text-sm '>Debug</p>
            </button>
          </div>
        )}
        {/* Input Area */}
        <div className='w-full flex items-center h-full  relative'>
          <TextareaAutosize
            value={message}
            maxRows={8}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !e.shiftKey) {
                // Send message on prssess of Enter

                e.preventDefault(); // Prevent default form submission or line break behavior
                addNewMessage(message);
                sendMessage(message);
              }
            }}
            // minRows={1}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Talk to SuiAI...'
            className=' w-full text-sm resize-none flex py-[1em] scrollbar-hide   items-center justify-start focus:outline-none min-h-[52px] max-h-[400px] pl-[2%]  pr-[5%] rounded-[8px] bg-white'
          />
          <button
            onClick={(e) => {
              addNewMessage(message);
              sendMessage(message);
            }}
            disabled={message === ""}
          >
            <Image
              className={`${
                message === "" ? "opacity-30" : "opacity-100"
              } absolute right-3 bottom-3`}
              // className='absolute right-3 bottom-5'
              src={"icons/send.svg"}
              width={24}
              height={24}
              alt='send'
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
