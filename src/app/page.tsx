"use client";

import Image from "next/image";
import { useState } from "react";
import CodeComponent from '../components/SyntexHighlighter_react'

export default function Home() {
  const [message, setMessage] = useState(
    "To delete a collection in the Sui framework, you can use the 'destroy_empty' function for 'Table' collections or the 'drop' function for 'Table' collections with values that have the 'drop' ability. Here's an example:\n```move\nmodule sui::example {\n    use sui::table::{Table, new, destroy_empty, drop};\n    use sui::tx_context::TxContext;\n\n    // Create a new table\n    let table = new(ctx);\n\n    // Delete the table if it's empty\n    destroy_empty(table);\n}\n```"
  );

  const handle = async () => {
    const response = await fetch("http://localhost:5000/ans", {
      method: "GET",
    });

    if (!response) {
      console.log("No Response");
      return;
    }
    if (response.body) {
      const reader = response?.body?.getReader();
      let output = "";

      while (true) {
        const { done, value } = await reader.read();
        output += new TextDecoder().decode(value);
        // body.innerHTML = marked.parse(output);
        console.log(output);

        setMessage(output);

        if (done) {
          return;
        }
      }
    }
  };

  return (
    <div className='h-screen flex  px-32 flex-col justify-center items-center'>
      <CodeComponent code={message}/>
      {/* <p className='whitespace-pre-wrap'>{message}</p> */}
      <button onClick={handle}>Click me</button>
    </div>
  );
}


