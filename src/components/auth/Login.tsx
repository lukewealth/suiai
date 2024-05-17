"use client";
import { OpenIdProvider } from "@/app/auth/page";
import { handleRegister } from "@/lib/auth/auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Login({ changeAuth }: { changeAuth: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show_password, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setError(validateEmail() ? "" : "Invalid email address");
    setEmail(e.target.value);
  }

  function handlePass(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function call_register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    console.log(res);
    setPending(false);
  }

  return (
    <div className=' md:w-[47%] flex relative  flex-col items-center '>
      <div className='mb-10'>
        <h2 className='font-bold text-[36px] text-call_to_action text-center'>
          Welcome Back
        </h2>
        <p className=' text-center text-call_to_action'>
          Great to have you back, let’s continue from where you left off!
        </p>
      </div>

      <form className='flex w-full gap-3 flex-col' onSubmit={call_register}>
        <div className='flex flex-col mb-2 gap-2'>
          <label className='font-medium'>Email Address*</label>
          <input
            placeholder='ex. email@domain.com'
            type='email'
            name='email'
            value={email}
            onInput={handleEmail}
            required
            className='bg-white rounded-lg px-[16px] h-[8vh] outline-none'
          />
        </div>

        <div className='flex flex-col mb-4 gap-2'>
          <label className='font-medium'>Password*</label>
          <div className='relative'>
            <input
              placeholder='Enter password'
              type={show_password ? "text" : "password"}
              name='password'
              value={password}
              onInput={handlePass}
              required
              className='bg-white rounded-lg px-[16px] h-[8vh] outline-none w-full'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!show_password)}
              className=' absolute right-3 top-[30%]'
            >
              {" "}
              <Image
                className=' '
                width={20}
                height={20}
                src={"/images/eye.png"}
                alt=''
              />
            </button>
          </div>
        </div>

        {error !== "" && (
          <span className=' bg-red-200 text-red-500 rounded-3xl w-full px-10 py-2 text-sm'>
            {error}
          </span>
        )}

        <button
          className={`w-full text-white ${
            pending ? "bg-gray-500" : "bg-call_to_action"
          } rounded-full h-[8vh] hover:bg-slate-700 my-3 `}
          disabled={pending}
        >
          {pending ? "Signing you up..." : "Get started free"}
        </button>
      </form>
      <p className=' text-center mt-2'>
        Don’t have an account?{" "}
        <button
          className='underline text-call_to_action hover:no-underline'
          onClick={changeAuth}
        >
          Sign Up
        </button>
      </p>
      <div className='relative border-t border-gray-400 flex justify-center w-[80%] mx-auto my-4'>
        <span className='bg-secondary  text-gray-400 absolute top-[-12px] w-fit   px-4'>
          Or better yet...
        </span>
      </div>
      <button
        onClick={() => signIn("google")}
        className='flex w-full rounded-full hover:bg-stone-300  shadow-primary hover:shadow my-3 justify-center items-center gap-4 border h-[8vh] border-gray-400'
      >
        <Image
          className=' '
          width={30}
          height={30}
          src={"/images/google.png"}
          alt=''
        />
        <span>Continue with Google</span>
      </button>
      <button
        onClick={() => signIn("github")}
        className='flex w-full rounded-full hover:bg-stone-300  shadow-primary hover:shadow duration-75 my-3 justify-center items-center gap-4 border h-[8vh] border-gray-400'
      >
        <Image
          className=' '
          width={30}
          height={30}
          src={"/images/github.png"}
          alt=''
        />
        <span>Continue with Github</span>
      </button>
    </div>
  );
}
