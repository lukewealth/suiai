import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Markdown from "markdown-to-jsx";

export default function CodeComponent({ code }: { code: string }) {

  console.log(code.toString())
  const messageParts = code.split(/```/);
  return (
    <section className='w-[90%] text-white pb-[100x] this_class prose'>
      {messageParts.map((part, i) =>
        i % 2 === 0 ? 
         <div key={i}>
           {
            part.toString().split("\n").map((line) => (
               <Markdown
                  key={i}
                  options={{ wrapper: "aside", forceWrapper: true }}
                  className='flex-1 mono prose lg:prose-xl  border-b leading-loose border-appGray overflow-x-scroll pb-5 scrollbar-hide  text-white'

                >
                  {line}
                </Markdown>
              ))
          }
         </div>
         
         : (
          <SyntaxHighlighter key={i} style={dracula}>
            {part}
          </SyntaxHighlighter>
        )
      )}
    </section>
  );
}
