import { useEffect, useState, useRef } from "react";
import { IoIosSend } from "react-icons/io";
import { useChatState, useChatActions } from "@yext/chat-headless-react"
import MessageBuble from "./MessageBubble"
import { FaCircle, FaExclamationTriangle, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion"

export default function ChatPanel() {

  const chat = useChatActions();

  const messages = useChatState(state => state.conversation.messages)
  const loading = useChatState(state => state.conversation.isLoading)


  const [input, setInput] = useState("");
  const [error, setError] = useState<boolean>(false);

  // Fetch the first message when the component is mounted
  useEffect(() => {
    chat.getNextMessage();
  }, [chat])


  const sendMessage = async () => {
    setInput("");
    try {
      await chat.getNextMessage(input);
    } catch (e) {
      setError(true);
      return;
    }
    setError(false);
    return;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  const bottomDivRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when the messages change
  useEffect(() => {
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages])

  return (
    <>
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
          <motion.button
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: input.length > 0 ? 1 : 0 }}
            animate={{ opacity: input.length > 0 ? 1 : 0 }}
            disabled={loading}
            onClick={sendMessage}
            className="rounded-full mx-auto text-white bg-blue-600 p-1.5 hover:bg-blue-800 disabled:bg-gray-100 text-xl absolute right-7 top-3 my-auto">
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </>
  )
}