import { useState } from "react";
import { useChatActions, useChatState } from "@yext/chat-headless-react";
import { motion } from "framer-motion"
import { FaArrowUp } from "react-icons/fa";
import { cn } from "../lib/utils";
import TextArea from "react-expanding-textarea"

interface ChatInputProps {
  placeholder?: string;
  className?: string;
}

export default function ChatInput({
  className,
  placeholder = "Type a message..."
}: ChatInputProps) {

  const chat = useChatActions();
  const loading = useChatState(state => state.conversation.isLoading)


  const [input, setInput] = useState("");


  const sendMessage = async () => {
    setInput("");
    await chat.getNextMessage(input);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <div className={cn(
      "w-full max-w-5xl flex flex-row mx-auto gap-x-2 relative px-4 h-fit",
      className
    )}>
      <TextArea
        autoFocus
        disabled={loading}
        onKeyDown={handleKeyDown}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-gray-300 p-4 w-full disabled:bg-gray-50 rounded-3xl resize-none pr-10"
        placeholder={placeholder}
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: input.length > 0 ? 1 : 0 }}
        animate={{ opacity: input.length > 0 ? 1 : 0 }}
        disabled={loading}
        onClick={sendMessage}
        className="rounded-full mx-auto text-white bg-blue-600 p-1.5 hover:bg-blue-800 disabled:bg-gray-100 text-xl absolute right-7 bottom-4 my-auto p">
        <FaArrowUp className="text-base" />
      </motion.button>
    </div>
  )
}