"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";

export default function Home() {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <div className='flex-grow flex items-center  bg-call_to_action '>
      <section className='flex w-full  text-white  px-12 lg:px-[4em] justify-between items-center h-[45%] self-center'>
        <div
          className='w-[42em] h-full flex flex-col justify-between '
          data-aos='zoom-out-right'
          data-aos-duration='1000'
          data-aos-anchor-placement='top-center'
        >
          <h1 className='text-[48px] font-[600] leading-[60px]'>
            Writing Smart Contracts for the{" "}
            <span className='special-text'>Sui Ecosystem</span> Just Got Better
          </h1>
          <p className=''>
            Your All-in-One Solution for writing Move programming language code,
            generating smart contracts, facilitating cryptocurrency transactions
          </p>
          <button
            className='bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] w-[250px] from-[#F258FF] to-[#9715FF] p-4 rounded-md'
            type='button'
            data-aos='zoom-out-right'
            data-aos-anchor-placement='center-bottom'
          >
            Explore Now with SuiAI &rarr;
          </button>
        </div>

        <div
          data-aos='fade-up'
          data-aos-anchor-placement='top-bottom'
          data-aos-duration='100'
          className='flex flex-col  h-full w-[37em] lg:w-[46em] justify-start items-end'
        >
          <h1 className='flex special-text-2 cursor text-3xl font-[600]'>
            <Typewriter
              options={{
                strings: [
                  "Create a smart contract for a marketplace.",
                  "Using the sui move programming language, create a DEX smart conract that utilized the zkSend sdk.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          {/* <div className="flex w-[82vh] h-42 mt-[-4rem] lg:mt-[-4rem] mr-[-8em] relative">
            <Image
              width={200}
              height={50}
              alt="landing-page"
              className="w-fit rounded-b-[70px]"
              src={"/images/hero_AI.png"}
            />
          </div> */}
        </div>
      </section>

      <section className='flex text-white absolute bottom-0 gap-9 px-12 justify-end items-center py-4 w-full'>
        <div>Terms & Condition</div>
        <div>Privacy Policy</div>
      </section>
    </div>
  );
}
