import Image from "next/image";

const ChatMessageComponent = ({
  title = "AI Chat Tools Ethics",
}: {
  title: string;
}) => {
  return (
    <div className='flex gap-3 w-[90%] hover:bg-call_to_action hover:bg-opacity-20 rounded-md hover:cursor-pointer px-[5%] py-[4%]  my-[1%]'>
      <Image src={"/icons/message.svg"} width={24} height={24} alt='message' />
      <p className='text-white'>{title}</p>
    </div>
  );
};

export default ChatMessageComponent;
