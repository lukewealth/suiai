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
    <div className="h-screen">
      <section className="flex bg-[#100146] w-full text-white gap-12 px-12 lg:px-[4em] pt-[12em] mx-auto justify-center items-start h-full">
        <div
          className="w-[42em]"
          data-aos="zoom-out-right"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-center"
        >
          <h1 className="text-[48px] font-[600] leading-[60px]">
            Writing Smart Contracts for the{" "}
            <span className="special-text">Sui Ecosystem</span> Just Got Better
          </h1>
          <p className="pt-4">
            Your All-in-One Solution for writing Move programming language code,
            generating smart contracts, facilitating cryptocurrency transactions
          </p>
          <button
            className="bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#F258FF] to-[#9715FF] mt-8 p-4 rounded-md"
            type="button"
            data-aos="zoom-out-right"
            data-aos-anchor-placement="center-bottom"
          >
            Explore Now with SuiAI &rarr;
          </button>
        </div>

        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="100"
          className="flex flex-col w-[37em] lg:w-[42em] mr-auto justify-end items-end"
        >
          <h1 className="flex special-text-2 text-[32px] font-[600]">
            <Typewriter
              options={{
                strings: ["Create a smart contract for a marketplace."],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <div className="flex w-[82vh] h-42 mt-[-4rem] lg:mt-[-4rem] mr-[-8em] relative">
            <Image
              width={200}
              height={50}
              alt="landing-page"
              className="w-fit rounded-b-[70px]"
              src={"/images/hero_AI.png"}
            />
          </div>
        </div>
      </section>

      <section className="flex bg-[#100146] text-white gap-9 px-12 justify-end items-center py-4 w-full">
        <div>Terms & Condition</div>
        <div>Privacy Policy</div>
      </section>
    </div>
  );
}
