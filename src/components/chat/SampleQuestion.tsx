import Image from "next/image";
import React from "react";

const SampleQuestion = ({ question }: { question: string }) => {
  return (
    <div className='flex items-center relative hover:left-2 hover:cursor-pointer duration-150 ease-out gap-3 px-[14px] py-[20px] justify-between  border-2 border-[#E7E7E7] h-[88px] w-[445px] bg-gradient-to-r from-[#D9D9D9] to-[#737373] bg-opacity-60 rounded-[20px]'>
      <div className='bg-call_to_action rounded-full w-[48px] h-[48px] flex items-center justify-center'>
        <Image src={"icons/logo.svg"} alt='logo' width={36} height={33} />
      </div>
      <p className=' text-sm text-white w-[70%]'>{question}</p>
      <button className='text-[#9715FF] w-[30px] h-[30px] rounded-[4px] flex justify-center items-center bg-[#D9D9D9] bg-opacity-50'>
        <Image src={"icons/arr.svg"} width={21} height={0} alt='arr' />
      </button>
    </div>
  );
};

export default SampleQuestion;
