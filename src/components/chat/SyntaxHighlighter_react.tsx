
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Markdown from "markdown-to-jsx";

export default function CodeComponent({code}:{code:string}){
  
  const messageParts = code.split(/```/);
  return (
    <section className='w-[70%] md:w-1/2 m-auto text-white  overflow-y-scroll pb-[100px]'>
   {messageParts.map((part, i)=>(
     i % 2 === 0 ? (  
     <Markdown key={i} options={{ wrapper: 'aside', forceWrapper: true }} className='whitespace-pre-wrap prose lg:prose-xl text-white'>{part}</Markdown>
   ) : (  
     <SyntaxHighlighter key={i} style={dracula}>
       {part}
     </SyntaxHighlighter>
   )
   ))}
    </section>
  );
};