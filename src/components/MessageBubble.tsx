import { useState } from "react";
import { Message } from "@/ChatCore";
import { motion } from "framer-motion";
import cx from "classnames";

const formatUglyServerTimestamp = (timestamp: string) => {
  // Desired Format
  // 5/7/23 8:27 pm
  return new Date(parseInt(timestamp)).toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })
}

export default function MessageBuble({ message, index }: { message: Message, index: number }) {
  const [showTimestamp, setShowTimestamp] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      key={index}
      className={cx(
        "flex flex-col gap-y-2 w-full",
      )}
    >
      <div className={cx(
        "flex gap-x-2",
        message.source === "BOT" ? "flex-row" : "flex-row-reverse"
      )}>
        <div
          onMouseEnter={() => setShowTimestamp(true)}
          onMouseLeave={() => setShowTimestamp(false)}
          className={cx(
            "p-4 rounded-md w-fit max-w-2xl",
            message.source === "BOT" ? "text-left bg-gray-200" : "text-right bg-blue-700 text-white"
          )}>
          {message.text}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showTimestamp ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cx(
            "text-gray-400 text-sm my-auto",
            message.source === "BOT" ? "text-left" : "ml-auto text-right"
          )}>
          {formatUglyServerTimestamp(message.timestamp)}
        </motion.div>
      </div>
    </motion.div>
  )
}