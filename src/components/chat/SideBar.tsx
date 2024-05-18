"use client";
import Image from "next/image";
import ChatMessageComponent from "./ChatMessageComponent";
import { useEffect, useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";
import { Conversation, useAppContext } from "@/context";
import { allConvos, fresh } from "@/lib/actions";
import { useSession, signOut } from "next-auth/react";

import useSWR from "swr";

const SideBar = () => {
  const session = useSession();

  const [popup, setPopup] = useState(false);
  const [chats, setChats] = useState<Conversation[]>([]);
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const { setQuery, setChatId, newChat, setNewChat } = useAppContext();

  const newConversation = async () => {
    if (newChat) {
      return;
    }

    setQuery("Syntax");
    if (session?.data?.user?.email !== "") {
      const id = await fresh(session?.data?.user?.email as string);
      setNewChat(true);
      setChatId(id);
    }
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchConvos = async () => {
      const allConversations: Conversation[] = await allConvos(
        session?.data?.user?.email as string
      );
      const id = allConversations[allConversations?.length - 1]?._id as string;
      setChatId(id);
      setChats(allConversations?.reverse());
    };
    if (session?.data?.user?.email) {
      setMail(session.data?.user?.email as string);
      setName(session.data?.user?.name as string);
      fetchConvos();
    }
  }, [session?.data?.user?.email]);

  return (
    <section className='h-full relative w-[20%] bg-gradient-to-b flex flex-col items-center to-[#E750FF] from-[#9D1AFE]'>
      {/* New Chat Button */}
      <button
        onClick={newConversation}
        className='bg-white active:scale-95  duration-300 hover:shadow-xl shadow-appGRay hover:-translate-y-[2px]  rounded-md text-lg  h-[40px] mt-[30px] mb-[10px] w-[90%] mx-auto'
      >
        + NewChat
      </button>
      {/* Chat History */}
      <div className='w-full flex flex-col h-[70%]  overflow-y-scroll  justify-start items-center'>
        {chats !== undefined &&
          chats.map((item: any, index: number) => {
            const title = item.messages[1]?.content;
            // ?.split("User query:")[1]

            return (
              <button
                key={index.toString()}
                className='w-[90%]  h-max'
                onClick={() => {
                  setNewChat(false);
                  setChatId(item._id);
                }}
              >
                <ChatMessageComponent title={title} />
              </button>
            );
          })}
      </div>
      {/* Bottom Section */}
      <OutsideClickHandler
        display='contents'
        onOutsideClick={() => setPopup(false)}
      >
        <div className='absolute self-start bottom-0 w-[95%] border-t-[3px] pt-[20px]    border-opacity-40 flex flex-col items-center gap-[5px] border-call_to_action h-[17%]'>
          <div className='flex gap-[12px] w-[95%] px-2 rounded-md hover:bg-call_to_action  hover:bg-opacity-20  cursor-pointer h-[50px] items-center  mx-auto justify-start'>
            <Image src={"/icons/Rash.svg"} alt='Trash' width={24} height={24} />
            <p className='text-white text-sm font-normal'>Clear conversation</p>
          </div>
          <button
            onClick={() => setPopup(!popup)}
            className={`flex gap-[12px] w-[95%] px-2 rounded-md ${
              popup && "bg-call_to_action bg-opacity-20"
            } hover:bg-call_to_action hover:bg-opacity-20  cursor-pointer  h-[50px] items-center bnav mx-auto justify-start`}
          >
            {isClient && (
              <div className='w-6 hover:scale-110 duration-150 rotateIcon  cursor-pointer hover:rounded-full rounded-md bg-call_to_action  text-white flex items-center justify-center h-6'>
                <p className='text- capitalize'>
                  {mail.slice(0, 1) || name.slice(0, 1)}
                </p>
              </div>
            )}
            {isClient && (
              <p className='text-call_to_action moveText font-medium'>
                {name || mail}
              </p>
            )}
          </button>
        </div>
        {/* Pop up section */}

        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "tween", duration: 0.3, ease: easeInOut }}
              className='absolute bottom-[9%] text-[#666666] px-6 pt-5 flex flex-col self-start ml-2 w-[90.25%] h-max shadow-[0px_0px_10px_#D7D7D7] rounded-[12px] bg-white'
            >
              <div className='font-medium text-sm border-b opacity-80 border-[#666666] border-opacity-50 pb-1'>
                {mail}
              </div>
              <section className='flex flex-col py-[10px] mt-[5px]'>
                <div className='flex items-center hover:bg-call_to_action hover:bg-opacity-20 rounded-md hover:cursor-pointer px-[2%] py-[4%] my-[5px] gap-3 border- opacity-80 border-[#666666] border-opacity-50 pb-1'>
                  <Image
                    src={"icons/accnt.svg"}
                    alt='accnt'
                    width={16}
                    height={16}
                  />
                  <p className='font-medium text-sm '>My Account</p>
                </div>
                <div className='flex items-center hover:bg-call_to_action hover:bg-opacity-20 rounded-md hover:cursor-pointer px-[2%] py-[4%] my-[5px] gap-3 border- opacity-80 border-[#666666] border-opacity-50 pb-1'>
                  <Image
                    src={"icons/achievement.svg"}
                    alt='achievement'
                    width={16}
                    height={16}
                  />
                  <p className='font-medium text-sm '>My Achievements</p>
                </div>
                <div className='flex items-center hover:bg-call_to_action hover:bg-opacity-20 rounded-md hover:cursor-pointer px-[2%] py-[4%] my-[5px] gap-3 border- opacity-80 border-[#666666] border-opacity-50 pb-1'>
                  <Image
                    src={"icons/updates.svg"}
                    alt='updates'
                    width={16}
                    height={16}
                  />
                  <p className='font-medium text-sm '>Updates & FAQ</p>
                </div>
                <div className='flex items-center hover:bg-call_to_action hover:bg-opacity-20 rounded-md hover:cursor-pointer px-[2%] py-[4%] my-[5px] gap-3 border- opacity-80 border-[#666666] border-opacity-50 pb-1'>
                  <Image
                    src={"icons/help.svg"}
                    alt='help'
                    width={16}
                    height={16}
                  />
                  <p className='font-medium text-sm '>Help</p>
                </div>
                <div className='flex items-center hover:bg-call_to_action hover:bg-opacity-20 rounded-md hover:cursor-pointer px-[2%] py-[4%] my-[5px] gap-3 border- opacity-80 border-[#666666] border-opacity-50 pb-1'>
                  <Image
                    src={"icons/api.svg"}
                    alt='api'
                    width={16}
                    height={16}
                  />
                  <p className='font-medium text-sm '>API</p>
                </div>
                <button
                  onClick={() => signOut()}
                  className='flex items-center hover:bg-call_to_action hover:bg-opacity-20 rounded-md hover:cursor-pointer px-[2%] py-[4%] my-[5px] gap-3 border- opacity-80 border-[#666666] border-opacity-50 pb-1'
                >
                  <Image
                    src={"icons/logout.svg"}
                    alt='logout'
                    width={16}
                    height={16}
                  />
                  <p className='font-medium text-sm '>Logout</p>
                </button>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </OutsideClickHandler>
    </section>
  );
};

export default SideBar;
