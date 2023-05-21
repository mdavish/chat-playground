import { useMemo } from "react"
import { ChatHeadlessProvider, type ChatConfig } from "@yext/chat-headless-react"
import ChatInput from "./components/ChatInput"
import MessageBubble from "./components/MessageBubble"
import ChatPanel from "./components/ChatPanel"

export default function ComponentPlayground() {

  const chatConfig: ChatConfig = useMemo(() => {
    return {
      apiKey: "ba41c60c65d874c5340985ad4fcda69a",
      botId: "ski-warehouse-chat",
    }
  }, [])

  return (
    <ChatHeadlessProvider config={chatConfig}>
      <div className="h-screen w-screen divide-dashed divide-gray-400 gap-x-4 divide-y flex ">
        <div className="grid grid-cols-8 h-4/6 my-auto mx-16 gap-x-4">
          <div className="mb-auto h-full bg-blue-100 col-span-2 flex flex-col-reverse gap-y-4">
            <MessageBubble index={0} message={{ source: "USER", text: "Hello I'm a bot message!", timestamp: "2023-05-18T19:33:34.553Z" }} />
            <MessageBubble index={0} message={{ source: "BOT", text: "Hello I'm a user message!", timestamp: "2023-05-18T19:33:34.553Z" }} />
          </div>
          <ChatInput className="mt-auto col-span-3" />
          <ChatPanel className="col-span-3 overflow-y-auto" />
        </div>
      </div>
    </ChatHeadlessProvider>
  )
}