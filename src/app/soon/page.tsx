"use client";
import Header from "@/components/static/Header";
import useFonts from "@/hooks/useFonts";
import { baseUrl } from "@/lib/utils/config";
import Image from "next/image";
import React, { useState } from "react";

const Index = () => {
  const { poppins } = useFonts();
  const [email, setEmail] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("The email must be a valid email address.");
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/api/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const response = await res.json();
      console.log(res, response);

      if (res.ok) {
        alert("Subscription successful!");
      } else {
        alert(`Failed to subscribe:${response.message}.`);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={poppins.style}
      className='w-screen flex relative flex-col bg-call_to_action items-center justify-center h-screen'
    >
      <Header />
      <h4 className='text-[54px] font-semibold text-[#E7E7E7]'>Coming Soon!</h4>
      <p className='text-2xl mt-[4vh] mb-[3vh] text-[#B9B9B9]'>
        Be the first person to get notified
      </p>
      <div className='w-[523px] px-2 bg-white flex justify-between items-center h-[78px] rounded-[8px]'>
        <input
          type='text'
          value={email}
          onChange={handleChange}
          className='bg-transparent ml-4 focus:outline-none placeholder:text-call_to_action text-[#100146] font-medium text-[20px]'
          placeholder='Enter your email address'
        />
        <button
          onClick={handleSubmit}
          className='bg-gradient-to-r hover:border-4 active:scale-95 border-call_to_action hover:border-opacity-40 duration-150 flex items-center justify-around min-w-[167px] h-[67px] rounded-lg from-[#9715FF] to-[#F258FF]'
        >
          <p className='font-medium text-xl text-white'>Notify me</p>
          <Image
            src={"/icons/arr_white.svg"}
            width={24}
            height={24}
            alt='arr'
          />
        </button>
      </div>
      <section className='flex text-white text-sm absolute bottom-0 gap-7 px-12 justify-end items-center py-4 w-full'>
        <div>Terms & Condition</div>
        <div>Privacy Policy</div>
      </section>
    </div>
  );
};

export default Index;
