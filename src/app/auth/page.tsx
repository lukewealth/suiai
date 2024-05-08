"use client";

import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import Header from "@/components/static/Header";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Auth() {
  const router = useRouter();
  const session = useSession();

  const [current_auth_component_login, switchAuthComponent] = useState(false);

  function toggleAuthComponent() {
    switchAuthComponent(!current_auth_component_login);
  }

  useEffect(() => {
    //console.log(session.status)
    if (session.status === "authenticated") {
      router.replace("/chatpage");
    }
  });
  return (
    <div className='min-h-screen flex '>
      <Header />
      <div className='bg-secondary flex justify-end pb-10 items-center flex-col w-full'>
        {current_auth_component_login ? (
          <Login changeAuth={toggleAuthComponent} />
        ) : (
          <Register changeAuth={toggleAuthComponent} />
        )}
      </div>

      <div className=' bg-gradient-to-b to-[#E750FF] from-[#9D1AFE] flex justify-center items-center flex-col w-[30%] text-white px-6'>
        <div className='flex flex-col gap-8'>
          <Image
            className=''
            src={"/images/ailogo.png"}
            alt=''
            width={150}
            height={100}
          />
          <h1 className='text-[48px] '>
            Learn, Discover & Automate in One Place.
          </h1>
          <p>
            SUI GPT using Move programming language to answer all your smart
            contract questions!
          </p>
        </div>
      </div>
    </div>
  );
}
