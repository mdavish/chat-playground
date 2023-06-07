import { useEffect, useRef } from "react";
import { useChatState, useChatActions } from "@yext/chat-headless-react"
import MessageBubble, { type MessageBubbleProps } from "./MessageBubble"
import ChatInput from "./ChatInput";
import LoadingDots from "./LoadingDots";
import { cn } from "../../lib/utils";

interface ChatPanelCssClasses {
  inputContainer?: string,
}

export default function ChatPanel({
  className,
  HeaderComponent,
  MessageBubbleComponent = MessageBubble,
  autoScroll = true,
  autofocus = true,
  inputClassName,
  customCssClasses = {},
  suggestions = [],
  messageBubbleProps,
}: {
  className?: string,
  MessageBubbleComponent?: typeof MessageBubble,
  HeaderComponent?: JSX.Element,
  autoScroll?: boolean,
  autofocus?: boolean,
  inputClassName?: string,
  customCssClasses?: ChatPanelCssClasses,
  suggestions?: string[],
  messageBubbleProps?: Partial<MessageBubbleProps>,
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

  const userHasMessages = messages.some(message => message.source === "USER")

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
                {...messageBubbleProps}
              />
            ))
          }
          {
            // TODO: Get rid of that
            (loading && messages[messages.length - 1]?.source !== "BOT") && (
              <LoadingDots />
            )
          }
          {
            !userHasMessages && suggestions.length > 0 && (
              <div className="mx-auto max-w-5xl mt-auto w-full flex flex-col gap-y-2 @lg:gap-y-6 py-2 px-4 mb-3 ">
                {
                  suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="bg-white/25 hover:bg-white/50 backdrop-blur-lg rounded-lg py-2 px-4 text-white text-sm font-semibold transition-colors duration-200"
                      onClick={() => chat.getNextMessage(suggestion)}
                    >
                      {suggestion}
                    </button>
                  ))
                }
              </div>
            )
          }
          <div ref={bottomDivRef} />
        </div>
      </div>
      <div className={cn(
        "flex flex-row absolute w-full bottom-0 bg-white/25 backdrop-blur-lg border-t border-white py-4",
        customCssClasses.inputContainer,
      )}>
        <ChatInput autofocus={autofocus} className={inputClassName} />
      </div>
    </div>
  )
}