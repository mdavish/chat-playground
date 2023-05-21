import { useEffect, useRef } from "react";
import { useChatState, useChatActions } from "@yext/chat-headless-react"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput";
import LoadingDots from "./LoadingDots";
import { cn } from "../lib/utils";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export interface HeaderProps {
  title: string,
  showRefreshButton?: boolean,
  className?: string,
}

export default function ChatPanel({
  className,
  header,
}: {
  className?: string,
  header?: HeaderProps,
}) {

  const chat = useChatActions();

  const messages = useChatState(state => state.conversation.messages)
  const loading = useChatState(state => state.conversation.isLoading)

  // Fetch the first message when the component is mounted
  useEffect(() => {
    chat.getNextMessage();
  }, [chat])

  const bottomDivRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when the messages change
  useEffect(() => {
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  return (
    <div className={cn("relative w-full h-full", className)}>
      {header &&
        <div className={cn(
          "absolute top-0 bg-gradient-to-tr from-blue-600 to-blue-800 w-full px-5 py-4 flex flex-row z-20 border-b border-white/30",
          header.className)}>
          <h1 className="text-white text-xl font-medium">
            {header.title}
          </h1>
          <motion.button
            className="ml-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              chat.restartConversation();
              chat.getNextMessage();
            }}
            animate={{ rotate: 360 }}
          >
            <ArrowPathIcon className="text-base text-white h-5 w-5" />
          </motion.button>
        </div>}
      <div className="w-full h-full flex flex-col overflow-auto pt-20 pb-20 @lg:pb-16 @container">
        <div className="mx-auto max-w-5xl mt-auto w-full flex flex-col gap-y-1 @lg:gap-y-6 py-2 px-4 ">
          {
            messages.map((message, index) => (
              <MessageBubble
                key={index}
                index={index}
                message={message}
              />
            ))
          }
          {
            loading && (
              <LoadingDots />
            )
          }
          <div ref={bottomDivRef} />
        </div>
      </div>
      <div className="flex flex-row absolute w-full bottom-0 bg-white/25 backdrop-blur-lg border-t border-white py-4">
        <ChatInput />
      </div>
    </div>
  )
}