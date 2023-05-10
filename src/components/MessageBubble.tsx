import { useState } from "react";
import type { Message } from "@yext/chat-core";
import { motion } from "framer-motion";
import cx from "classnames";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";

const formatUglyServerTimestamp = (timestamp: number) => {
  // Desired Format
  // May 7, 8:27 pm
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}

const SPLIT_CHAR = "ℹ"

export default function MessageBuble({ message, index }: { message: Message, index: number }) {

  const [showTimestamp, setShowTimestamp] = useState(false);
  const [thumbStatus, setThumbStatus] = useState<"UP" | "DOWN" | undefined>(undefined);

  let messageText = message.text;
  let explanation: string | undefined = undefined;
  if (message.text.includes(SPLIT_CHAR)) {
    [messageText, explanation] = message.text.split(SPLIT_CHAR);
  }

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
        "flex gap-x-2 ",
        message.source === "BOT" ? "flex-row" : "flex-row-reverse"
      )}>
        <div
          onMouseEnter={() => setShowTimestamp(true)}
          onMouseLeave={() => setShowTimestamp(false)}
          className={cx(
            "p-4 rounded-2xl w-fit max-w-lg relative",
            message.source === "BOT" ? "text-left bg-gray-100 text-gray-900" : "text-right bg-blue-700 text-white relative"
          )}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: (showTimestamp && message.source === "BOT" && index !== 0) ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-4 -right-4 bg-white border border-gray-200 p-1 rounded-full flex flex-row gap-x-1">
            <button
              onClick={() => setThumbStatus("UP")}
              className={cx(
                "rounded-full",
                thumbStatus === "UP" ? "bg-gray-700 text-white" : "bg-white hover:bg-gray-100 text-gray-700"
              )}>
              <HandThumbUpIcon className="w-4 h-4 p-1" />
            </button>
            <button
              onClick={() => setThumbStatus("DOWN")}
              className={cx(
                "rounded-full",
                thumbStatus === "DOWN" ? "bg-gray-700 text-white" : "hover:bg-gray-100 bg-white text-gray-700"
              )}>
              <HandThumbDownIcon className="w-4 h-4 p-1" />
            </button>
          </motion.div>
          {messageText}
          {explanation && (
            <div className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-300">
              {explanation}
            </div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showTimestamp ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cx(
            "text-gray-400 text-sm my-auto shrink-0",
            message.source === "BOT" ? "text-left" : "ml-auto text-right"
          )}>
          {formatUglyServerTimestamp(message.timestamp)}
        </motion.div>
      </div>
    </motion.div>
  )
}