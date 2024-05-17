import Image from "next/image";

const ChatMessageComponent = ({
  title = "I am SuiAI, how can i help you today?",
}: {
  title: string;
}) => {
  return (
    <div className='flex gap-3 w-[90%] hover:bg-call_to_action hover:bg-opacity-20 mx-auto rounded-md hover:cursor-pointer px-[5%] py-[4%]  my-[1%]'>
      <Image src={"/icons/message.svg"} width={24} height={24} alt='message' />
      <p className='text-white'>{title?.slice(0, 19).concat("...")}</p>
    </div>
  );
};

export default ChatMessageComponent;
