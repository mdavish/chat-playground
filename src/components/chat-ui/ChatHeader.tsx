import { cn } from "../../lib/utils";
import { motion } from "framer-motion";
import { useChatActions } from "@yext/chat-headless-react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export interface ChatHeaderProps {
  title: string,
  showRefreshButton?: boolean,
  className?: string,
}

export default function ChatHeader({
  title,
  showRefreshButton,
  className }: ChatHeaderProps) {
  const chat = useChatActions();
  return (
    <div className={cn(
      "absolute top-0 bg-gradient-to-tr from-blue-600 to-blue-800 w-full px-4 py-3 @lg:px-5 @lg:py-4 flex flex-row z-20 border-b border-white/30",
      className)}>
      <h1 className="text-white text-xl font-medium">
        {title}
      </h1>
      {showRefreshButton &&
        <motion.button
          className="ml-auto"
          whileHover={{ scale: 1.1 }}
          whileTap={{ rotate: 360, scale: 0.9 }}
          onClick={() => {
            chat.restartConversation();
            chat.getNextMessage();
          }}
        >
          <ArrowPathIcon className="text-base text-white h-5 w-5" />
        </motion.button>
      }
    </div>
  )
}