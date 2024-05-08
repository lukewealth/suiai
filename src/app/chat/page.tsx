import Image from "next/image";
import React from "react";

const Chat = () => {
  return (
    <div>
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
    </div>
  );
};

export default Chat;
