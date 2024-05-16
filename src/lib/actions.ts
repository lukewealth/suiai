import axios from "axios";
import { baseUrl, serverUrl } from "./utils/config";

/** Create a new conversation */
export const fresh = async (user: string) => {
  try {
    // const res = await axios.post("http://localhost:5000/api/v1/conversations", {
    //   user: user,
    // });
    const res = await axios.post(`${serverUrl}/api/v1/conversations`, {
      user: user,
    });

    return res.data._id;
  } catch (error: any) {
    console.error("Error creating new chat:", error.message);
  }
};

/** Retrieve existing conversations */
export const getConversation = async (id: string) => {
  try {
    // const res = await axios.get(
    //   `http://localhost:5000/api/v1/conversations/${id}`
    // );
    const res = await axios.get(`${serverUrl}/api/v1/conversations/${id}`);

    return res.data;
  } catch (error: any) {
    console.error("Error getting conversation:", error);
  }
};

export const allConvos = async (user: string) => {
  try {
    const res = await axios.post(`${baseUrl}/api/convos`, {
      user: user,
    });

    return res.data;
  } catch (error: any) {
    console.error("Error getting convos:", error.message);
  }
};
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

      if (done) {
        return;
      }
    }
  }
};

/**Send message to chatbot */
export const sendMessage = async (
  message: string,
  stream: React.Dispatch<React.SetStateAction<string>>,
  id: string
) => {
  try {
    // const res = await fetch(
    //   `http://localhost:5000/api/v1/conversations/${id}/messages?stream=true`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ message: message }),
    //   }
    // );
    const res = await fetch(
      `${serverUrl}/api/v1/conversations/${id}/messages?stream=true`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      }
    );
    if (!res) {
      console.log("No Response");
      return;
    }
    if (res.body) {
      const reader = res?.body?.getReader();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          // If stream is done, break the loop
          break;
        }

        // Append the received chunk to the buffer
        buffer += new TextDecoder().decode(value);

        // Check if the buffer contains a complete JSON object
        let startIndex = buffer.indexOf("data:");
        let endIndex = buffer.indexOf("\n", startIndex);
        while (startIndex !== -1 && endIndex !== -1) {
          const jsonStr = buffer.substring(startIndex, endIndex);
          try {
            const data = JSON.parse(jsonStr.replace("data:", ""));
            const val = data.data;
            if (data.type === "delta") {
              console.log(val);
              stream(val);
            }
          } catch (error: any) {
            console.error("Error parsing JSON:", error.message);
          }

          // Remove the parsed JSON object from the buffer
          buffer = buffer.substring(endIndex + 1);

          // Check for next JSON object in the buffer
          startIndex = buffer.indexOf("data:");
          endIndex = buffer.indexOf("\n", startIndex);
        }
      }
    }
  } catch (error: any) {
    console.error("Error getting convos:", error.message);
  }
};
