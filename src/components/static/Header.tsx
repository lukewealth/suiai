"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const session = useSession();

  if (session.status === "authenticated") {
    return (
      <header className='flex px-8 justify-between bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#545454] to-[#fff] items-center py-4 fixed left-0 top-0 w-full text-white'>
        <Image
          width={100}
          height={50}
          src={"/images/ailogo.png"}
          alt=''
          className=' w-fit'
        />
        <nav className='flex gap-2'>
          <button className='px-4' onClick={() => signOut()}>
            Signout
          </button>
          <Link
            href={"/auth"}
            className='py-2 px-4 bg-[#ffffff] text-gray-800 rounded'
          >
            {session.data.user?.email} &rarr;
          </Link>
        </nav>
      </header>
    );
  } else {
    return (
      <header className='flex bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-[#545454] to-[#fff]  px-8 justify-between items-center py-4 fixed left-0 top-0 w-full'>
        <Image
          width={80}
          height={40}
          src={"/images/ailogob.png"}
          alt=''
          className=' w-fit'
        />
        <nav className='flex  gap-2'>
          <Link
            href={"/auth"}
            className='py-2 px-4 bg-appBlue text-white rounded'
          >
            Get started &rarr;
          </Link>
        </nav>
      </header>
    );
  }
}
