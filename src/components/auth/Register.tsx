"use client";
import { handleRegister } from "@/lib/auth/auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
//import { useRouter } from "next/router";
import { useState } from "react";


export default function Register({changeAuth}:any) {

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show_password, setShowPassword] = useState(false);
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  const validateEmail = () => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    // Set emailError based on validation result
    return isValidEmail
  };

  function handleEmail(e){
 
    setError( validateEmail()? '' : "Invalid email address");
    setEmail(e.target.value)

  }
 
  function handlePass(e){
    setPassword(e.target.value)
  }

  async function call_register(e){
    e.preventDefault()
    setPending(true)
    let res = await handleRegister({email, password})
    if(!res?.data?.success){
      setError(res?.data?.message)
    }
    if(res?.data?.success){
      changeAuth()
    }
    setPending(false)

  }


  return (
    <div className=' md:w-[50%] '>
     
    <div className="mb-8">
    <h2 className="font-bold text-[36px] text-center">Sign up with free trail</h2>
     <p className=" text-center">Empower your experience, sign up for a free account today </p>
    </div>

     <form className="flex gap-3 flex-col" onSubmit={call_register}>
      <div className="flex flex-col mb-4 gap-2">
        <label>Email Address*</label>
        <input placeholder="ex. email@domain.com" type="email" name="email" value={email} onInput={handleEmail}  required className="bg-white rounded-[12px] px-[16px] py-[14px] outline-none"/>

      </div>

      <div className="flex flex-col mb-8 gap-2">
        <label>Password*</label>
        <div className="relative">
          <input placeholder="Enter password" type={show_password?'text':'password'} name="password" value={password} onInput={handlePass}  required className="bg-white rounded-[12px] px-[16px] py-[14px] outline-none w-full"/>
         <button type="button" onClick={()=>setShowPassword(!show_password)} className=" absolute right-3 top-[30%]"> <Image className=" " width={20} height={20} src={'/images/eye.png'} alt="" /></button>
        </div>
      </div>

      {error != ''&& <span className=" bg-red-200 text-red-500 rounded-3xl w-full px-10 py-2 text-sm">{error}</span>}
      <p>By registering for an account, you are consenting to our Terms of Service and confirming that you have reviewed and accepted the Global Privacy Statement.</p>

      <button className={`w-full text-white ${pending?'bg-gray-500':'bg-call_to_action'} rounded-full py-3 my-3 `}   disabled={pending}>{pending?'Signing you up...':'Get started free'}</button>
     </form> 
     <p className=" text-center my-4">Already have an account? <button  onClick={changeAuth}>Login</button></p>
     <div className="relative border-t border-gray-500 w-[80%] m-auto my-10"><span className="bg-secondary text-gray-500 absolute top-[-12px] w-fit left-0 right-0 m-auto px-4">Or better yet</span></div>
     <button onClick={()=>signIn("google")}  className="flex w-full rounded-full justify-center items-center gap-4 border py-2 border-gray-400 my-4"><Image className=" "  width={30} height={30} src={'/images/google.png'} alt=""/><span>Continue with Google</span></button>
     <button onClick={()=>signIn("github")} className="flex w-full rounded-full justify-center items-center gap-4 border py-2 border-gray-400 my-4"><Image className=" " width={30} height={30} src={'/images/github.png'} alt=""/><span>Continue with Github</span></button>
    </div>
  );
}
