import { useMemo } from "react";
import { ChatHeadlessProvider, type ChatConfig } from "@yext/chat-headless-react";
import ChatPopUp from "../components/ChatPopUp";

export default function PopupPage() {

  const chatConfig: ChatConfig = useMemo(() => {
    return {
      apiKey: "ba41c60c65d874c5340985ad4fcda69a",
      botId: "ski-warehouse-chat",
    }
  }, [])

  return (
    <div>
      <ChatHeadlessProvider config={chatConfig}>
        <ChatPopUp />
      </ChatHeadlessProvider>
    </div>
  )
}