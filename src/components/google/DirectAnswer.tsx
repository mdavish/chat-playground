import { useChatState } from "@yext/chat-headless-react";
import { motion } from "framer-motion";
import { ReactMarkdown } from "react-markdown/lib/react-markdown"
import { FaMagic } from "react-icons/fa"
import { BsChatFill } from "react-icons/bs"
import { useChatModeContext } from "../../hooks";
import Button from "./Button";
import { cn } from "../../lib/utils";

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
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div
                key={`bigdiv-${index}`}
                className={cn("relative h-4 w-full overflow-hidden max-w-xl")}
              >
                {/* The light beam div */}
                <motion.div
                  key={`lildiv-${index}`}
                  className="w-52 bg-gradient-to-r from-white to-blue-300 absolute top-0 bottom-0 left-0"
                  variants={{
                    start: { marginLeft: '-50%', opacity: 0 },
                    end: { marginLeft: '100%', opacity: 1 }
                  }}
                  initial="start"
                  animate="end"
                  transition={{
                    repeatDelay: 1,
                    delay: index * 0.25,  // Delay each animation by 0.25s
                    duration: 1,  // Animation duration
                    repeat: Infinity,  // To loop the animation
                    ease: "linear"  // To move at a constant speed
                  }}
                />
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