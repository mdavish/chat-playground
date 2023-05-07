import React, { useEffect, useState, useMemo, useRef } from "react";
import ChatCore, { type Message } from "./ChatCore";
import { IoIosSend } from "react-icons/io";
import { FaCircle, FaExclamationTriangle } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import { motion } from "framer-motion";
import cx from "classnames";

interface BotConfig {
  label: string;
  apiKey: string;
  botId: string;
  env: "DEV" | "PROD";
}

const configOptions: BotConfig[] = [
  {
    apiKey: "5a9eab1d26efd08005b6c1c309e1d981",
    botId: "davish-playground",
    env: "DEV",
    label: "Davish Playground",
  }
]

const formatUglyServerTimestamp = (timestamp: string) => {
  return new Date(parseInt(timestamp)).toLocaleString();
}

// For UI Testing, so you don't have to type out a bunch of messages
const defaultMessages: Message[] = [
  {
    text: "Hello, how can I help you?",
    source: "BOT",
    timestamp: "1627665600000",
  },
  {
    text: "I need help with my account",
    source: "USER",
    timestamp: "1627665600000",
  },
  {
    text: "Sure, what do you need help with?",
    source: "BOT",
    timestamp: "1627665600000",
  },
  {
    text: "I need to change my password",
    source: "USER",
    timestamp: "1627665600000",
  },
  {
    text: "Hello, how can I help you?",
    source: "BOT",
    timestamp: "1627665600000",
  },
  {
    text: "I need help with my account",
    source: "USER",
    timestamp: "1627665600000",
  },
  {
    text: "Sure, what do you need help with?",
    source: "BOT",
    timestamp: "1627665600000",
  },
  {
    text: "I need to change my password",
    source: "USER",
    timestamp: "1627665600000",
  },
  {
    text: "Hello, how can I help you?",
    source: "BOT",
    timestamp: "1627665600000",
  },
  {
    text: "I need help with my account",
    source: "USER",
    timestamp: "1627665600000",
  },
  {
    text: "Sure, what do you need help with?",
    source: "BOT",
    timestamp: "1627665600000",
  },
  {
    text: "I need to change my password",
    source: "USER",
    timestamp: "1627665600000",
  },
  {
    text: "Sure, what do you need help with?",
    source: "BOT",
    timestamp: "1627665600000",
  },
  {
    text: "I need to change my password",
    source: "USER",
    timestamp: "1627665600000",
  },
]

export default function App() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const [selectedConfigId, setSelectedConfigId] = useState<string>(configOptions[0].botId);

  const selectedConfig = configOptions.find(config => config.botId === selectedConfigId) ?? configOptions[0];

  const chat = useMemo(() => {
    return new ChatCore({
      apiKey: selectedConfig.apiKey,
      botId: selectedConfig.botId,
      env: selectedConfig?.env,
      v: "20230101",
    });
  }, [selectedConfig.apiKey, selectedConfig.botId, selectedConfig.env])

  const bottomDivRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when the messages change
  useEffect(() => {
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  useEffect(() => {
    if (messages.length === 0) {
      chat.getResponse([])
        .then(res => {
          setMessages([{
            text: res.response.message.text,
            source: "BOT",
            timestamp: res.response.message.timestamp,
          }])
        })
    }
  }, [chat, messages.length])

  const sendMessage = async () => {
    setInput("");
    setLoading(true);
    const newMessage: Message = {
      text: input,
      source: "USER",
      // Parse the date to an integer and then back to a string,
      // Because that's how the server wants it
      timestamp: new Date().getTime().toString(),
    }
    setMessages([...messages, newMessage]);
    let res;
    try {
      res = await chat.getResponse([...messages, newMessage]);
    } catch (e) {
      setError(true);
      setLoading(false);
      return;
    }
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
    <div className="h-screen w-screen flex flex-row">
      <div className="h-full mx-auto my-auto w-full flex flex-col relative">
        <div className="w-full p-4 absolutef top-0 bg-white/50 backdrop-blur-2xl flex flex-row">
          <div className="mx-auto">
            <Select
              defaultValue={configOptions[0].botId}>
              <SelectTrigger className="w-[180px] clas">
                <SelectValue placeholder="Bot Config" />
              </SelectTrigger>
              <SelectContent>
                {
                  configOptions.map((config, index) => (
                    <SelectItem
                      key={index}
                      value={config.botId}
                      onClick={() => setSelectedConfigId(config.botId)}
                    >
                      {config.label}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full h-full flex flex-col overflow-auto">
          <div className="mx-auto max-w-5xl mt-auto w-full flex flex-col gap-y-2 py-2 mb-28 px-4">
            {
              messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  key={index}
                  className={cx(
                    "flex flex-col gap-y-2 w-full",
                  )}
                >
                  <div className="flex flex-row gap-x-2">
                    <div className={cx(
                      "p-4 rounded-md w-fit max-w-2xl",
                      message.source === "BOT" ? "text-left bg-gray-200" : "ml-auto text-right bg-blue-700 text-white"
                    )}>
                      {message.text}
                    </div>
                  </div>
                  <div className={cx(
                    "text-gray-400 text-sm",
                    message.source === "BOT" ? "text-left" : "ml-auto text-right"
                  )}>
                    {formatUglyServerTimestamp(message.timestamp)}
                  </div>
                </motion.div>
              ))
            }
            {
              loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="w-fit flex gap-1 rounded-md bg-gray-100 p-2 text-[8px] text-gray-400">
                  <FaCircle className="animate-bounce" style={{ animationDelay: "0ms" }} />
                  <FaCircle className="animate-bounce" style={{ animationDelay: "300ms" }} />
                  <FaCircle className="animate-bounce" style={{ animationDelay: "600ms" }} />
                </motion.div>
              )
            }
            {
              error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-fit flex flex-row gap-1 rounded-md bg-red-100 p-4 text-red-600 text-base ">
                  <div className="my-auto">
                    <FaExclamationTriangle />
                  </div>
                  <div className="">
                    Oops, something went wrong.
                  </div>
                </motion.div>
              )
            }
            <div ref={bottomDivRef} />
          </div>
        </div>
        <div className="flex flex-row absolute w-full bottom-0 bg-white/50 backdrop-blur-2xl border-t border-white py-4">
          <div className="w-full max-w-5xl flex flex-row mx-auto gap-x-2 relative px-4">
            <input
              autoFocus
              disabled={loading}
              onKeyDown={handleKeyDown}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border-2 border-gray-300 p-4 rounded-md w-full disabled:bg-gray-100"
              placeholder="Type a message..."
            />
            <button
              disabled={loading}
              onClick={sendMessage}
              className="rounded-full mx-auto text-white bg-blue-600 p-1.5 hover:bg-blue-800 disabled:bg-gray-200 text-xl absolute right-7 top-3 my-auto">
              <IoIosSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}