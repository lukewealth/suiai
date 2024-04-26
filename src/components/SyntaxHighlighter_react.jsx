import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeComponent({code}){
  const my_css = `   
  border-radius: 3px;`
  const codeString = '(num) => num + 1';

  console.log(code)
  const codeToHighlight = code.split('```')[1]
  return (
    <section className='w-[70%] md:w-1/2 m-auto'>
<p className='whitespace-pre-wrap'>{code.split('```')[0]}</p>
      <SyntaxHighlighter language="javascript" style={ {...dracula, my_css} }>
      {codeToHighlight}
    </SyntaxHighlighter>
    </section>
  );
};