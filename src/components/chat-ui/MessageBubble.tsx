import { useState } from "react";
import type { Message } from "@yext/chat-core";
import { motion } from "framer-motion";
import cx from "classnames";
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/react/20/solid";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface MessageBubbleCssClasses {
  // TODO: Add more classes here
  messageBubble?: string,
}

type MessageBubbleCssConstructor = MessageBubbleCssClasses | (({ type }: { type: "BOT" | "USER" }) => MessageBubbleCssClasses);

export interface MessageBubbleProps {
  message: Message,
  index?: number,
  showThumbsUpDown?: boolean
  showTimestamp?: boolean,
  customCssClasses?: MessageBubbleCssConstructor,
}


const formatUglyServerTimestamp = (timestamp: string) => {

  // Strings will be of this format 
  // 2023-05-18T19:33:34.553Z
  // Convert to this format
  // May 18, 7:33 pm

  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}

export default function MessageBubble({
  message,
  index,
  showThumbsUpDown = true,
  showTimestamp = true,
  customCssClasses = {},
}: MessageBubbleProps) {

  const [isHovering, setIsHovering] = useState(false);
  const [thumbStatus, setThumbStatus] = useState<"UP" | "DOWN" | undefined>(undefined);

  const cssClasses = typeof customCssClasses === "function" ? customCssClasses({ type: message.source }) : customCssClasses;


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      key={index}
      className={cx(
        "flex flex-col gap-y-2 w-full @container",
      )}
    >
      <div className={cx(
        "flex gap-x-2 w-5/6 @lg:w-fit",
        message.source === "BOT" ? "flex-col @lg:flex-row" : "ml-auto flex-col @lg:flex-row-reverse"
      )}>
        <div
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={cx(
            "p-4 rounded-2xl w-fit max-w-lg relative",
            message.source === "BOT" ? "text-left bg-gradient-to-tr from-slate-50 to-slate-100 mr-auto" : "text-right bg-gradient-to-tr from-blue-600 to-blue-700 relative ml-auto",
            cssClasses.messageBubble
          )}>
          {showThumbsUpDown &&
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: (isHovering && message.source === "BOT" && index !== 0) ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-4 -right-4 bg-white border border-slate-200 p-1 rounded-full flex flex-row gap-x-1">
              <button
                onClick={() => setThumbStatus("UP")}
                className={cx(
                  "rounded-full",
                  thumbStatus === "UP" ? "bg-slate-700 text-white" : "bg-white hover:bg-slate-100 text-slate-700"
                )}>
                <HandThumbUpIcon className="w-4 h-4 p-1" />
              </button>
              <button
                onClick={() => setThumbStatus("DOWN")}
                className={cx(
                  "rounded-full",
                  thumbStatus === "DOWN" ? "bg-slate-700 text-white" : "hover:bg-slate-100 bg-white text-slate-700"
                )}>
                <HandThumbDownIcon className="w-4 h-4 p-1" />
              </button>
            </motion.div>}
          <ReactMarkdown
            className={cx("prose overflow-x-auto", message.source === "BOT" ? "text-slate-900" : "text-white")}
            remarkPlugins={[remarkGfm]}>
            {message.text}
          </ReactMarkdown>
        </div>
        {(showTimestamp && message.timestamp) &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className={cx(
              "text-slate-400 text-sm shrink-0 my-1 @lg:my-auto px-2 @lg:px-0",
              message.source === "BOT" ? "text-left" : "ml-auto text-right"
            )}>
            {formatUglyServerTimestamp(message.timestamp)}
          </motion.div>}
      </div>
    </motion.div>
  )
}