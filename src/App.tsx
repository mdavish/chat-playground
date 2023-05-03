import { useState } from "react";
import ChatCore, { type Message } from "./ChatCore";
import SyntaxHighlighter from 'react-syntax-highlighter';

const chat = new ChatCore({
  apiKey: "5a9eab1d26efd08005b6c1c309e1d981",
  botId: "red-dog-bot",
  env: "DEV",
  v: "20230101",
});

const testMessages: Message[] = [
  {
    type: "USER",
    timestamp: "1682965896",
    messageText: "Hello world",
  },
];

export default function App() {

  const [res, setRes] = useState();

  const handleClick = async () => {

    const res = await chat.getResponse(testMessages);
    setRes(res);
  };


  return (
    <div className="h-screen w-screen flex">
      <div className="mx-auto my-auto max-w-3xl flex flex-col gap-y-4">
        <button
          onClick={handleClick}
          className="mx-auto text-white bg-blue-600 p-4 rounded-md hover:bg-blue-800">
          Test Out Chat
        </button>
        {res &&
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-bold">Raw Messages</h1>
            <SyntaxHighlighter
              language="json" >
              {JSON.stringify(testMessages, null, 2)}
            </SyntaxHighlighter>
            <h1 className="text-2xl font-bold">Response</h1>
            <SyntaxHighlighter
              language="json" >
              {JSON.stringify(res, null, 2)}
            </SyntaxHighlighter>
          </div>
        }
      </div>
    </div>
  )
}