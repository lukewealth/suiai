"use client";
import { questions } from "@/lib/db/data";
import Image from "next/image";
import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SampleQuestion from "@/components/chat/SampleQuestion";
import { AnimatePresence, motion } from "framer-motion";

const Chat = () => {
  const [value, setValue] = useState("");
  const dotVariants = {
    start: {
      x: "-50%",
      opacity: 0.5,
    },
    end: {
      x: "0%",
      opacity: 1,
    },
  };
  return (
    <div className='w-full relative flex flex-col h-full'>
      {/* Header Section */}
      <section className='flex justify-between px-[20px] mx-[26px] mt-[30px]  items-center'>
        <div className='flex flex-col items-center'>
          <div className='w-[107.12px] h-[45px]  relative'>
            <Image src={"/images/ailogo.png"} fill alt='logo' />
          </div>
          <p className=' text-[#C3C3C3] text-xs self-center '>Ver 1.0 Apr 24</p>
        </div>

        <div className='flex gap-2'>
          <Image src={"/images/sun.png"} width={24} height={24} alt='sun' />
          <p className='text-white font-light'>Light Mode</p>
        </div>
      </section>
      <AnimatePresence mode='wait'>
        <motion.div
          initial='start'
          animate='end'
          transition={{
            duration: 0.3,
            staggerChildren: 0.2,
            delayChildren: 0.1,
          }}
          className='w-[75%] absolute bottom-[20%] flex flex-col justify-end gap-4 self-center'
        >
          {questions.map((item, index) => {
            return (
              <motion.div
                key={index.toString()}
                variants={dotVariants}
                transition={{
                  duration: 0.3,
                  // repeat: Infinity,
                  // repeatType: "reverse",
                }}
                className='h-max  flex w-max'
              >
                <SampleQuestion question={item.q} />;
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Bottom INput section */}
      <div className='absolute w-[75%] self-center bottom-[5%]'>
        <div className='flex mb-2 gap-3 '>
          <div className='flex w-max active:scale-95 cursor-pointer hover:bg-appAsh hover:bg-opacity-50 text-appAsh duration-100 hover:text-white items-center gap-2 px-2 h-[27px] rounded-[8px] bg-[#EEEEEE]'>
            <Image
              src={"/icons/syntax.svg"}
              width={15}
              height={13}
              alt='syntax'
            />
            <p className='text-sm '>Move Syntax</p>
          </div>
          <div className='flex w-max active:scale-95 cursor-pointer hover:bg-appAsh hover:bg-opacity-50 text-appAsh duration-100 hover:text-white items-center gap-2 px-2 h-[27px] rounded-[8px] bg-[#EEEEEE]'>
            <Image
              src={"/icons/contract.svg"}
              width={12}
              height={13.8}
              alt='contracts'
            />
            <p className='text-sm '>Smart Contracts</p>
          </div>
          <div className='flex w-max active:scale-95 cursor-pointer hover:bg-appAsh hover:bg-opacity-50 text-appAsh duration-100 hover:text-white items-center gap-2 px-2 h-[27px] rounded-[8px] bg-[#EEEEEE]'>
            <Image
              src={"/icons/tests.svg"}
              width={12}
              height={13.8}
              alt='test'
            />
            <p className='text-sm '>Unit Tests</p>
          </div>
          <div
            title='Defi and lending smart contracts'
            className='flex w-max active:scale-95 cursor-pointer hover:bg-appAsh hover:bg-opacity-50 text-appAsh duration-100 hover:text-white items-center gap-2 px-2 h-[27px] rounded-[8px] bg-[#EEEEEE]'
          >
            <Image src={"/icons/defi.svg"} width={14} height={18} alt='test' />
            <p className='text-sm '>Defi & Lending</p>
          </div>
        </div>
        <div className='w-full flex items-center h-full  relative'>
          <TextareaAutosize
            value={value}
            maxRows={8}
            minRows={1}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Talk to SuiAI...'
            className=' w-full text-lg resize-none flex py-[1em] scrollbar-hide   items-center justify-start focus:outline-none min-h-[52px] max-h-[400px] pl-[2%]  pr-[5%] rounded-[8px] bg-white'
          />
          <Image
            className='absolute right-3 bottom-5'
            src={"icons/send.svg"}
            width={24}
            height={24}
            alt='send'
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
