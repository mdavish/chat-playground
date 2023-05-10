import React, { useEffect, useState, useMemo, useRef } from "react";
import { ChatCore, MessageSource } from "@yext/chat-core"
import type { Message } from "@yext/chat-core"
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
import MessageBuble from "./components/MessageBubble";
import { Toggle } from "./components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { DevicePhoneMobileIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { cn } from "./lib/utils";

interface BotConfig {
  label: string;
  apiKey: string;
  botId: string;
  env: "DEV" | "PROD";
}

const configOptions: BotConfig[] = [
  {
    apiKey: "1c06cff8f4e50d80fefd989fe50dedc5",
    botId: "davish-playground",
    env: "PROD",
    label: "Davish Playground",
  },
  {
    apiKey: "5a9eab1d26efd08005b6c1c309e1d981",
    botId: "davish-playground",
    env: "DEV",
    label: "Davish Devground",
  }
]

// For UI Testing, so you don't have to type out a bunch of messages
// const defaultMessages: Message[] = [
//   {
//     text: "Hello, how can I help you?",
//     source: "BOT",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "I need help with my account",
//     source: "USER",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "Sure, what do you need help with?",
//     source: "BOT",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "I need to change my password",
//     source: "USER",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "Hello, how can I help you?",
//     source: "BOT",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "I need help with my account",
//     source: "USER",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "Sure, what do you need help with?",
//     source: "BOT",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "I need to change my password",
//     source: "USER",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "Hello, how can I help you?",
//     source: "BOT",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "I need help with my account",
//     source: "USER",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "Sure, what do you need help with?",
//     source: "BOT",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "I need to change my password",
//     source: "USER",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "Sure, what do you need help with?",
//     source: "BOT",
//     timestamp: "1627665600000",
//   },
//   {
//     text: "I need to change my password",
//     source: "USER",
//     timestamp: "1627665600000",
//   },
// ]

export default function App() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [mobileMode, setMobileMode] = useState<boolean>(false);
  // Labels are unique, bot IDs aren't
  const [selectedConfigLabel, setSelectedConfigLabel] = useState<string>(configOptions[0].label);
  const selectedConfig = configOptions.find(config => config.label === selectedConfigLabel) ?? configOptions[0];

  // Save mobile mode to local storage
  useEffect(() => {
    localStorage.setItem("mobileMode", mobileMode ? "true" : "false");
  }, [mobileMode])

  // Load mobile mode from local storage
  useEffect(() => {
    const mobileMode = localStorage.getItem("mobileMode");
    if (mobileMode) {
      setMobileMode(mobileMode === "true");
    }
  }, [])

  // Whenever the selected config changes, reset the chat
  useEffect(() => {
    setMessages([]);
  }, [selectedConfig])

  const chat = useMemo(() => {
    return new ChatCore({
      apiKey: selectedConfig.apiKey,
      botId: selectedConfig.botId,
    });
  }, [selectedConfig.apiKey, selectedConfig.botId])

  const bottomDivRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when the messages change
  useEffect(() => {
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  useEffect(() => {
    if (messages.length === 0) {
      chat.getNextMessage({ messages: [] })
        .then(res => {
          setMessages([{
            text: res.message.text,
            source: MessageSource.BOT,
            timestamp: res.message.timestamp,
          }])
        })
    }
  }, [chat, messages.length])

  const sendMessage = async () => {
    setInput("");
    setLoading(true);
    const newMessage: Message = {
      text: input,
      source: MessageSource.USER,
      // Parse the date to an integer and then back to a string,
      // Because that's how the server wants it
      timestamp: new Date().getTime(),
    }
    setMessages([...messages, newMessage]);
    let res;
    try {
      res = await chat.getNextMessage({ messages: [...messages, newMessage] });
    } catch (e) {
      setError(true);
      setLoading(false);
      return;
    }
    const botMessage = res.message;
    setMessages([...messages,
      newMessage,
    {
      text: botMessage.text,
      source: MessageSource.BOT,
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
    <div className="h-screen w-screen flex flex-row bg-gray-200">
      <motion.div
        // Animate the size of the chat window when the mobile mode changes
        className={cn(
          "h-full w-full flex flex-col relative bg-white transition-all duration-500 mx-auto my-auto",
          mobileMode ? " rounded-3xl overflow-hidden shadow-2xl w-[45vh] h-[80vh]" : "rounded-none"
        )}>
        <div className="w-full p-4 absolute top-0 z-30 bg-white/25 backdrop-blur-lg flex flex-row gap-x-4">
          <div className="mx-auto flex flex-row gap-x-4">
            <Select
              value={selectedConfigLabel}
              onValueChange={(value) => {
                setSelectedConfigLabel(value)
              }}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Bot Config" />
              </SelectTrigger>
              <SelectContent>
                {
                  configOptions.map((config, index) => (
                    <SelectItem
                      key={index}
                      value={config.label}
                      onClick={() => setSelectedConfigLabel(config.botId)}
                    >
                      {config.label}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Toggle
                    className="hover: cursor-pointer"
                    pressed={mobileMode}
                    defaultPressed={false}
                    onClick={
                      () => setMobileMode(!mobileMode)
                    }>
                    <DevicePhoneMobileIcon className="text-base text-gray-800 h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile Preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setMessages([]);
                      setError(false);
                    }}
                    animate={error ? { rotate: 360 } : {}}
                  >
                    <ArrowPathIcon className="text-base text-gray-800 h-4 w-4" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="w-full h-full flex flex-col overflow-auto">
          <div className="mx-auto max-w-5xl mt-auto w-full flex flex-col gap-y-6 py-2 mb-28 px-4">
            {
              messages.map((message, index) => (
                <MessageBuble
                  key={index}
                  index={index}
                  message={message}
                />
              ))
            }
            {
              loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="w-fit flex gap-1 rounded-md p-2 text-[8px] text-gray-500">
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
        <div className="flex flex-row absolute w-full bottom-0 bg-white/25 backdrop-blur-lg border-t border-white py-4">
          <div className="w-full max-w-5xl flex flex-row mx-auto gap-x-2 relative px-4">
            <input
              autoFocus
              disabled={loading}
              onKeyDown={handleKeyDown}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border border-gray-300 p-4 w-full disabled:bg-gray-50 rounded-3xl"
              placeholder="Type a message..."
            />
            <button
              disabled={loading}
              onClick={sendMessage}
              className="rounded-full mx-auto text-white bg-blue-600 p-1.5 hover:bg-blue-800 disabled:bg-gray-100 text-xl absolute right-7 top-3 my-auto">
              <IoIosSend />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}