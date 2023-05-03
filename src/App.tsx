import React, { useEffect, useState } from "react";
import ChatCore, { type Message } from "./ChatCore";
import { IoIosSend } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import cx from "classnames";

const chat = new ChatCore({
  apiKey: "5a9eab1d26efd08005b6c1c309e1d981",
  botId: "red-dog-bot",
  env: "DEV",
  v: "20230101",
});

export default function App() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    chat.getResponse([])
      .then(res => {
        setMessages([{
          text: res.response.message.text,
          source: "BOT",
          timestamp: res.response.message.timestamp,
        }])
      })
  }, [])

  const sendMessage = async () => {
    setInput("");
    setLoading(true);
    const newMessage: Message = {
      text: input,
      source: "USER",
      timestamp: new Date().toISOString(),
    }
    setMessages([...messages, newMessage]);
    const res = await chat.getResponse(messages);
    const botMessage = res.response.message;
    setMessages([...messages,
      newMessage,
    {
      text: botMessage.text,
      source: "BOT",
      timestamp: botMessage.timestamp,
    }]);
    setLoading(false);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className="h-screen w-screen flex">
      <div className="mx-auto my-auto w-1/3 max-w-4xl flex flex-col gap-y-4">
        <div className="w-full flex flex-col gap-y-2">
          {
            messages.map((message, index) => (
              <div key={index}
                className={cx(
                  "flex flex-col gap-y-2 w-full",
                )}
              >
                <div className="flex flex-row gap-x-2">
                  <div className={cx(
                    "p-4 rounded-md w-3/4",
                    message.source === "BOT" ? "text-left bg-gray-200" : "ml-auto text-right bg-blue-700 text-white"
                  )}>
                    {message.text}
                  </div>
                </div>
                <div className={cx(
                  "text-gray-400 text-sm",
                  message.source === "BOT" ? "text-left" : "ml-auto text-right"
                )}>
                  {message.timestamp}
                </div>
              </div>
            ))
          }
        </div>
        {
          loading && (
            <div className="w-fit flex gap-1 rounded-md bg-gray-100 p-2 text-[8px] text-gray-400">
              <FaCircle className="animate-bounce" style={{ animationDelay: "0ms" }} />
              <FaCircle className="animate-bounce" style={{ animationDelay: "300ms" }} />
              <FaCircle className="animate-bounce" style={{ animationDelay: "600ms" }} />
            </div>
          )
        }
        <div className="flex flex-row gap-x-2">
          <input
            onKeyDown={handleKeyDown}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border-2 border-gray-300 p-4 rounded-md w-full"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="mx-auto text-white bg-blue-600 p-4 rounded-md hover:bg-blue-800 text-2xl">
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  )
}