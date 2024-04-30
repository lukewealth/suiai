
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeComponent({code}){
  const my_css = `   
  border-radius: 3px;`
  const codeString = '(num) => num + 1';

  console.log(code)
  const codeToHighlight = code.split('```')[1]
  const messageParts = code.split(/```/);
  return (
    <section className='w-[70%] md:w-1/2 m-auto'>
   {messageParts.map((part, i)=>(
     i % 2 === 0 ? (  
     <p key={i} className='whitespace-pre-wrap'>{part}</p>
   ) : (  
     <SyntaxHighlighter key={i} style={dracula}>
       {part}
     </SyntaxHighlighter>
   )
   ))}
    </section>
  );
};