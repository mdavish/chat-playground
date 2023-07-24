import { useChatState } from "@yext/chat-headless-react";
import { motion } from "framer-motion";
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { FaMagic } from "react-icons/fa"
import { BsChatFill } from "react-icons/bs"
import { useChatModeContext } from "../../hooks";
import Button from "./Button";

export default function DirectAnswer() {

  const messages = useChatState(s => s.conversation.messages);
  const firstBotMessage = messages.find(m => m.source === "BOT");
  const isLoading = useChatState(s => s.conversation.isLoading);
  const { setChatMode } = useChatModeContext();

  return (
    <div className="w-full shrink-0 h-fit text-base rounded-md py-4 px-6 transition-all">
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-y-4">
          <ReactMarkdown className="text-left w-full prose-sm text-blue-900">
            {firstBotMessage.text}
          </ReactMarkdown>
          <Button
            onClick={() => {
              console.log("Clicked into chat mode")
              setChatMode(true);
            }}
          >
            <BsChatFill
              className="inline-block w-4 h-4 mr-2 my-auto mx-auto"
            />
            Ask a Follow Up
          </Button>
        </motion.div>
      }
    </div>
  )
}