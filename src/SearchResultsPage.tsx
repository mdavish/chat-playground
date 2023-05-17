import { useState, useMemo } from "react"
import { ChatHeadlessProvider, type ChatConfig } from "@yext/chat-headless-react"
import ChatPanel from "./components/ChatPanel"
import SearchResults from "./SearchResults"
import {
  TbLayoutSidebarRightCollapse,
  TbLayoutSidebarRightExpand
} from "react-icons/tb"
import { cn } from "./lib/utils"

export default function SearchResultsPage() {

  const [isChatPanelOpen, setIsChatPanelOpen] = useState(true)

  const chatConfig: ChatConfig = useMemo(() => {
    return {
      apiKey: "ba41c60c65d874c5340985ad4fcda69a",
      botId: "ski-warehouse-chat",
    }
  }, [])

  return (
    <ChatHeadlessProvider
      config={chatConfig}
    >
      <div className="w-screen h-screen flex flex-row">
        {/* Note: These styles should be part of the ChatPanel component in the future */}
        <div className="w-full h-full flex flex-col relative">
          <ChatPanel />
          <div className="absolute top-0 right-0 flex flex-row gap-x-2 p-2">
            <button
              className="rounded-full bg-gray-50 p-2"
              onClick={() => setIsChatPanelOpen(!isChatPanelOpen)}
            >
              {
                isChatPanelOpen ? (
                  <TbLayoutSidebarRightCollapse />
                ) : (
                  <TbLayoutSidebarRightExpand />
                )
              }
            </button>
          </div>
        </div>
        <div className={cn(
          "shrink-0 overflow-auto border-l bg-gray-50 transition-width duration-300 ease-in-out whitespace-nowrap",
          isChatPanelOpen ? "w-96" : "w-0"
        )}>
          <SearchResults />
        </div>
      </div>
    </ChatHeadlessProvider>
  )
}