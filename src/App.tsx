import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"
import { Toggle } from "./components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { DevicePhoneMobileIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion"
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import ChatPanel from "./components/ChatPanel";
import { cn } from "./lib/utils";

interface BotConfig {
  label: string;
  apiKey: string;
  botId: string;
  env: "DEV" | "PROD";
}

const configOptions: BotConfig[] = [
  {
    apiKey: "1c06cff8f4e50d80fefd989fe50dedc5",
    botId: "davish-playground",
    env: "PROD",
    label: "Davish Playground",
  },
  {
    apiKey: "ba41c60c65d874c5340985ad4fcda69a",
    botId: "ski-warehouse-chat",
    env: "PROD",
    label: "Ski Warehouse",
  },
  {
    apiKey: "5a9eab1d26efd08005b6c1c309e1d981",
    botId: "davish-playground",
    env: "DEV",
    label: "Davish Devground",
  }
]

export default function App() {

  const [mobileMode, setMobileMode] = useState<boolean>(false);

  // Labels are unique, bot IDs aren't
  const [selectedConfigLabel, setSelectedConfigLabel] = useState<string>(configOptions[0].label);
  const selectedConfig = configOptions.find(config => config.label === selectedConfigLabel) ?? configOptions[0];

  return (
    <div className="h-screen w-screen flex flex-row bg-gray-200">
      <motion.div
        className={cn(
          "h-full w-full flex flex-col relative bg-white transition-all duration-500 mx-auto my-auto",
          mobileMode ? " rounded-3xl overflow-hidden shadow-2xl w-[45vh] h-[80vh]" : "rounded-none"
        )}
      >
        <div className="w-full p-4 absolute top-0 z-30 bg-white/25 backdrop-blur-lg flex flex-row gap-x-4">
          <div className="mx-auto flex flex-row gap-x-4">
            <Select
              value={selectedConfigLabel}
              onValueChange={(value) => {
                setSelectedConfigLabel(value)
              }}
            >
              <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="Bot Config" />
              </SelectTrigger>
              <SelectContent>
                {
                  configOptions.map((config, index) => (
                    <SelectItem
                      key={index}
                      value={config.label}
                      onClick={() => setSelectedConfigLabel(config.botId)}
                    >
                      {config.label}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Toggle
                    className="hover: cursor-pointer"
                    pressed={mobileMode}
                    defaultPressed={false}
                    onClick={
                      () => setMobileMode(!mobileMode)
                    }>
                    <DevicePhoneMobileIcon className="text-base text-gray-800 h-4 w-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile Preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      console.log("refresh")
                    }}
                    animate={{ rotate: 360 }}
                  >
                    <ArrowPathIcon className="text-base text-gray-800 h-4 w-4" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <ChatHeadlessProvider
          key={selectedConfig.label}
          config={{
            apiKey: selectedConfig.apiKey,
            botId: selectedConfig.botId,
          }}
        >
          <ChatPanel />
        </ChatHeadlessProvider>
      </motion.div>
    </div>
  )
}