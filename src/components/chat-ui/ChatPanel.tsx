import { useEffect, useRef } from "react";
import { useChatState, useChatActions } from "@yext/chat-headless-react"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput";
import LoadingDots from "./LoadingDots";
import { cn } from "../../lib/utils";


export default function ChatPanel({
  className,
  HeaderComponent,
  MessageBubbleComponent = MessageBubble,
  autoScroll = true,
  autofocus = true,
}: {
  className?: string,
  MessageBubbleComponent?: typeof MessageBubble,
  HeaderComponent?: JSX.Element,
  autoScroll?: boolean,
  autofocus?: boolean,
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
    if (bottomDivRef.current && autoScroll) {
      bottomDivRef.current.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }, [messages, autoScroll])

  return (
    <div className={cn("relative w-full h-full @container", className)}>
      {HeaderComponent && (
        HeaderComponent
      )}
      <div className="w-full h-full flex flex-col overflow-auto pt-20 pb-20 @lg:pb-16 @container">
        <div className="mx-auto max-w-5xl mt-auto w-full flex flex-col gap-y-1 @lg:gap-y-6 py-2 px-4 ">
          {
            messages.map((message, index) => (
              <MessageBubbleComponent
                key={index}
                index={index}
                message={message}
              />
            ))
          }
          {
            // TODO: Get rid of that
            (loading && messages[messages.length - 1]?.source !== "BOT") && (
              <LoadingDots />
            )
          }
          <div ref={bottomDivRef} />
        </div>
      </div>
      <div className="flex flex-row absolute w-full bottom-0 bg-white/25 backdrop-blur-lg border-t border-white py-4">
        <ChatInput autofocus={autofocus} />
      </div>
    </div>
  )
}