import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Markdown from "markdown-to-jsx";

export default function CodeComponent({ code }: { code: string }) {
  const messageParts = code.split(/```/);
  return (
    <section className='w-full border-b  text-white pb-[100x]'>
      {messageParts.map((part, i) =>
        i % 2 === 0 ? (
          <Markdown
            key={i}
            options={{ wrapper: "aside", forceWrapper: true }}
            className='flex-1 mono prose max-w-full leading-loose overflow-x-scroll pb-5 scrollbar-hide  text-white'
            // className='whitespace-pre-wrap prose lg:prose-xl text-white'
          >
            {part}
          </Markdown>
        ) : (
          <SyntaxHighlighter key={i} style={dracula}>
            {part}
          </SyntaxHighlighter>
        )
      )}
    </section>
  );
}
