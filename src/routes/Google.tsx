import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChatHeadlessProvider, useChatState, useChatActions } from "@yext/chat-headless-react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { cn } from "../lib/utils"
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { FaMagic } from "react-icons/fa"
import { BsChatFill } from "react-icons/bs"

function SearchResults() {
  const queryResult = useChatState(s => s.conversation.notes?.queryResult);
  const isLoading = useChatState(s => s.conversation.isLoading);

  return (
    <div className="w-3/5 flex flex-col gap-y-6 overflow-x-hidden">
      {
        (!queryResult && isLoading) && Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            // Expand from 0 to 100% width, slightly slower for each subsequent bar
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            // transition={{ duration: 1, delay: index * 0.2 }}
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-md to animate-pulse p-4 w-full flex flex-col gap-y-4">
            <div className="h-4 w-1/3 bg-gray-200 animate-pulse" />
            <div className="h-8 w-2/3 bg-gray-200 animate-pulse" />
            <div className="h-8 w-1/2 bg-gray-200 animate-pulse" />
          </motion.div>
        ))
      }
      {
        (queryResult) && (
          <div>

            {JSON.stringify(queryResult)}
          </div>
        )
      }
    </div>
  )
}

function DirectAnswer() {
  const messages = useChatState(s => s.conversation.messages);

  const firstBotMessage = messages.find(m => m.source === "BOT");
  const isLoading = useChatState(s => s.conversation.isLoading);
  return (
    <div className="w-2/5 shrink-0 h-fit text-base font-light rounded-md border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 py-4 px-6 transition-all ">
      <p className="font-medium flex flex-row text-blue-900 mb-4">
        <FaMagic className="inline-block w-3 h-3 mr-2 my-auto" />
        {isLoading ? "Generating..." : "AI Answer"}
      </p>
      {
        isLoading &&
        <div className="flex flex-col gap-y-4 text-blue-900">
          {
            Array.from({ length: 5 }).map((_, index) => (
              <motion.div
                // Expand from 0 to 100% width, slightly slower for each subsequent bar
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: index * 0.2 }}
                key={index}
                className="rounded-sm bg-gradient-to-br from-blue-200 to-blue-300 to animate-pulse h-4 w-full">
              </motion.div>
            ))
          }
        </div>
      }
      {firstBotMessage &&
        <div className="flex flex-col gap-y-4">
          <ReactMarkdown className="text-left w-full prose-sm font-light text-blue-900">
            {firstBotMessage.text}
          </ReactMarkdown>
          <button className="mt-3 bg-gradient-to-br from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-medium px-4 py-2 rounded-full border border-blue-800 flex flex-row text-sm w-fit">
            <BsChatFill
              className="inline-block w-4 h-4 mr-2 my-auto mx-auto"
            />
            Ask a Follow Up
          </button>
        </div>
      }
    </div>
  )
}

function Inner() {

  const shadowClasses = [
    "shadow-purple-600/25",
    "shadow-blue-600/25",
    "shadow-green-600/25",
    "shadow-yellow-600/25",
    "shadow-red-600/25",
  ]

  const chat = useChatActions();

  // Every second, we'll update the chat state with a new shadow class

  const [shadowClass, setShadowClass] = useState(shadowClasses[0])
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShadowClass(shadowClasses[Math.floor(Math.random() * shadowClasses.length)])
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setHasSearched(true)
      e.preventDefault()
      e.stopPropagation()
      chat.restartConversation();
      chat.streamNextMessage(e.currentTarget.value);
    }
  }

  const isLoading = useChatState(s => s.conversation.isLoading)


  return (
    <AnimatePresence>
      <div className="bg-white h-screen w-full flex flex-col">
        <div
          className={cn(
            "mx-auto my-auto flex flex-col gap-y-6 w-full transition-all duration-300 ease-out shrink-0",
            hasSearched ? "h-1/6 border-b border-gray-200 max-w-6xl" : "h-2/3"
          )}>
          <div
            className={cn(
              "my-auto w-full flex flex-row font-light rounded-full border border-gray-200 h-fit shadow-xl transition-all duration-[1500] ease-linear max-w-2xl",
              !hasSearched && shadowClass,
              hasSearched ? "text-base max-w-xl p-3" : "mx-auto text-lg max-w-2xl p-4"
            )}>
            <motion.input
              autoFocus
              onKeyDown={handleKeyDown}
              className="px-3 my-auto w-full h-full focus:outline-none"
            />
            {
              isLoading ?
                <AiOutlineLoading3Quarters className="text-gray-700 ml-auto my-auto w-6 h-6 mr-2 animate-spin" /> :
                <MagnifyingGlassIcon className="text-gray-700 ml-auto my-auto w-6 h-6 mr-2" />
            }
          </div>
        </div>
        <div
          className={cn(
            "mx-auto w-full overflow-auto transition-all flex flex-row h-full px-10 pt-10"
          )}>
          {
            hasSearched &&
            <div className="mx-auto w-full flex flex-row gap-x-10 max-w-6xl">
              <DirectAnswer />
              <SearchResults />
            </div>
          }
        </div>
      </div>
    </AnimatePresence>
  )
}

export default function Google() {
  return (
    <ChatHeadlessProvider
      config={{
        apiKey: "ba41c60c65d874c5340985ad4fcda69a",
        botId: "ski-warehouse-chat",
        saveToSessionStorage: false,
      }}>
      <Inner />
    </ChatHeadlessProvider>
  )
}