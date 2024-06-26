"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Typewriter from "typewriter-effect";
import Link from "next/link";
import Header from "@/components/static/Header";
import { useSession } from "next-auth/react";

export default function Home() {
  const { status } = useSession();
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <div className='flex-grow flex items-center  bg-call_to_action '>
      <Header />
      <section className='flex w-full  text-white  px-[2vw] justify-between items-center h-[45%] self-center'>
        <div
          className='w-[42em] h-full  flex flex-col justify-between '
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
          <Link
            href={
              status === "authenticated"
                ? "/chat"
                : status === "unauthenticated"
                ? "/auth"
                : "/"
            }
          >
            <button
              className='bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] w-[250px] from-[#F258FF] to-[#9715FF] p-4 rounded-md'
              type='button'
              data-aos='zoom-out-right'
              data-aos-anchor-placement='center-bottom'
            >
              Explore Now with SuiAI &rarr;
            </button>
          </Link>
        </div>

        <div
          data-aos='fade-up'
          data-aos-anchor-placement='top-bottom'
          data-aos-duration='100'
          className='flex flex-col   h-full w-[50%]  justify-start items-end'
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
        </div>
      </section>

      <section className='flex text-white text-sm absolute bottom-0 gap-7 px-12 justify-end items-center py-4 w-full'>
        <div>Terms & Condition</div>
        <div>Privacy Policy</div>
      </section>
    </div>
  );
}
