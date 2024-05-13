import Image from "next/image";
import React from "react";

const SampleQuestion = ({ question }: { question: string }) => {
  return (
    <div className='flex items-center relative hover:scale-110  hover:cursor-pointer duration-300 active:from-call_to_action active:bg-opacity-30 ease-out  px-[14px] py-[20px] justify-start gap-8  border-2 border-[#E7E7E7] h-[88px] w-[400px] bg-gradient-to-r from-appAsh hovr:from-[#D9D9D9] to-call_to_action hover:to-[#737373] bg-opacity-60 rounded-[20px]'>
      <div className='bg-call_to_action rounded-full w-[48px] h-[48px] flex items-center justify-center'>
        <Image src={"icons/logo.svg"} alt='logo' width={36} height={33} />
      </div>
      <p className=' text-sm text-white w-[70%]'>{question}</p>
      {/* <button className='text-[#9715FF] w-[30px] h-[30px] rounded-[4px] flex justify-center items-center bg-[#D9D9D9] bg-opacity-50'>
        <Image src={"icons/arr.svg"} width={21} height={0} alt='arr' />
      </button> */}
    </div>
  );
};

export default SampleQuestion;
