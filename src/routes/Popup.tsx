import { useMemo } from "react";
import { ChatHeadlessProvider, type ChatConfig } from "@yext/chat-headless-react";
import ChatPopUp from "../components/chat-ui/ChatPopUp";

export default function PopupPage() {

  const chatConfig: ChatConfig = useMemo(() => {
    return {
      apiKey: "ba41c60c65d874c5340985ad4fcda69a",
      botId: "ski-warehouse-chat",
    }
  }, [])

  return (
    <div className="w-screen h-screen flex">
      <ChatHeadlessProvider config={chatConfig}>
        <ChatPopUp />
      </ChatHeadlessProvider>
    </div>
  )
}