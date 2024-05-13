"use client";
import SideBar from "@/components/chat/SideBar";
import { AppWrapper } from "@/context";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppWrapper>
      <div className='flex flex-row-reverse bg-call_to_action  h-full w-full'>
        <SideBar />
        <section className='w-[80%] h-full'>{children}</section>
      </div>
    </AppWrapper>
  );
}
