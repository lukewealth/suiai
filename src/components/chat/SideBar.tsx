"use client";
import Image from "next/image";
import ChatMessageComponent from "./ChatMessageComponent";
import { useState } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";

const SideBar = () => {
  const [popup, setPopup] = useState(!false);
  const chats = [
    { title: "AI Chat Tool Ethics" },
    { title: "Al Chat Tool Impact Writing" },
    { title: "New chat" },
  ];
  return (
    <section className='h-full relative w-[20%] bg-gradient-to-b flex flex-col items-center to-[#E750FF] from-[#9D1AFE]'>
      {/* New Chat Button */}
      <button className='bg-white rounded-md text-lg  h-[40px] mt-[30px] mb-[10px] w-[90%] mx-auto'>
        + NewChat
      </button>
      {/* Chat History */}
      <div className='w-full flex flex-col items-center'>
        {chats.map((item: any, index: number) => {
          return (
            <ChatMessageComponent key={index.toString()} title={item.title} />
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
            <div className='w-6 hover:scale-110 duration-150 rotateIcon  cursor-pointer hover:rounded-full rounded-md bg-call_to_action  text-white flex items-center justify-center h-6'>
              <p className='text-'>U</p>
            </div>
            <p className='text-call_to_action moveText font-medium'>
              Uche Noble
            </p>
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
                uchenoble@gmail.com
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
                <div className='flex items-center hover:bg-call_to_action hover:bg-opacity-20 rounded-md hover:cursor-pointer px-[2%] py-[4%] my-[5px] gap-3 border- opacity-80 border-[#666666] border-opacity-50 pb-1'>
                  <Image
                    src={"icons/logout.svg"}
                    alt='logout'
                    width={16}
                    height={16}
                  />
                  <p className='font-medium text-sm '>Logout</p>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </OutsideClickHandler>
    </section>
  );
};

export default SideBar;
