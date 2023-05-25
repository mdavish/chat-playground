import { useState } from "react";
import { useChatActions, useChatState } from "@yext/chat-headless-react";
import { motion } from "framer-motion"
import { FaArrowUp, FaMicrophoneAlt } from "react-icons/fa";
import { cn } from "../../lib/utils";
import TextArea from "react-expanding-textarea";


export default function ChatInput({
  className,
  placeholder = "Type a message...",
  voiceSearch = false,
}: {
  placeholder?: string;
  className?: string;
  // TODO: Implement voice search
  voiceSearch?: boolean;
}) {

  const chat = useChatActions();
  const loading = useChatState(state => state.conversation.isLoading)

  const [input, setInput] = useState("");
  const [canSendMessage, setCanSendMessage] = useState(false);

  const sendMessage = async () => {
    setInput("");
    setCanSendMessage(true);
    try {
      await chat.streamNextMessage(input);
    } catch (err) {
      setCanSendMessage(false);
    }
    setCanSendMessage(false);
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
        disabled={canSendMessage}
        onKeyDown={handleKeyDown}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border border-slate-300 p-4 w-full disabled:bg-slate-50 rounded-3xl resize-none pr-10"
        placeholder={placeholder}
      />
      {
        voiceSearch && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: input.length > 0 ? 0 : 1 }}
            animate={{ opacity: input.length > 0 ? 0 : 1 }}
            disabled={loading}
            className="rounded-full mx-auto text-slate-400 bg-white hover:bg-slate-100 p-1.5 disabled:bg-slate-100 text-xl absolute right-7 bottom-3 my-auto p">
            <FaMicrophoneAlt className="text-xl" />
          </motion.button>
        )
      }
      <motion.button
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: input.length > 0 ? 1 : 0 }}
        animate={{ opacity: input.length > 0 ? 1 : 0 }}
        disabled={loading}
        onClick={sendMessage}
        className="rounded-full mx-auto text-white bg-blue-600 p-1.5 hover:bg-blue-800 disabled:bg-slate-100 text-xl absolute right-7 bottom-4 my-auto">
        <FaArrowUp className="text-base" />
      </motion.button>
    </div>
  )
}