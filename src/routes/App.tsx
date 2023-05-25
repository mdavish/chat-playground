import { useState, useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Toggle } from "../components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { DevicePhoneMobileIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion"
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import ChatPanel from "../components/chat-ui/ChatPanel";
import { cn } from "../lib/utils";
import { useSearchParams } from "react-router-dom";
import ChatHeader from "../components/chat-ui/ChatHeader";

interface BotConfig {
  label: string;
  apiKey: string;
  botId: string;
  env: "DEV" | "PROD";
}

const configOptions: BotConfig[] = [
  {
    apiKey: "ba41c60c65d874c5340985ad4fcda69a",
    botId: "ski-warehouse-chat",
    env: "PROD",
    label: "Ski Warehouse",
  },
  {
    apiKey: "5db47bd2b4c1f5776606691c7da348b2",
    botId: "yext-marketing-bot",
    env: "PROD",
    label: "Yext Marketing",
  },
  {
    apiKey: "1c06cff8f4e50d80fefd989fe50dedc5",
    botId: "davish-playground",
    env: "PROD",
    label: "Davish Playground",
  },
  {
    apiKey: "5db47bd2b4c1f5776606691c7da348b2",
    botId: "hitchhikers-chat",
    env: "PROD",
    label: "Hitchhikers",
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

  const selectedConfig = useMemo<BotConfig>(() => {
    return configOptions.find(config => config.label === selectedConfigLabel) ?? configOptions[0];
  }, [selectedConfigLabel]);


  const [searchParams, setSearchParams] = useSearchParams();

  // Update the URL with the selected bot config
  if (searchParams.get("bot") !== selectedConfig.botId) {
    setSearchParams({ bot: selectedConfig.botId });
  }

  // Read the URL to determine the selected bot config
  useEffect(() => {
    const botId = searchParams.get("bot");
    if (botId) {
      const config = configOptions.find(config => config.botId === botId);
      if (config) {
        setSelectedConfigLabel(config.label);
      }
    }
  }, [searchParams]);

  const HeaderComponent = useMemo<JSX.Element | undefined>(() => {
    if (!mobileMode) return undefined;
    return (
      <ChatHeader title={selectedConfig.label} showRefreshButton={true} />
    )
  }, [selectedConfig, mobileMode])

  return (
    <div className="h-screen w-screen flex flex-row bg-slate-200">
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
                  <DevicePhoneMobileIcon className="text-base text-slate-800 h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mobile Preview</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <motion.div
        className={cn(
          "h-full w-full flex flex-col relative bg-white transition-all duration-500 mx-auto my-auto",
          mobileMode ? " rounded-3xl overflow-hidden shadow-2xl w-[45vh] h-[80vh]" : "rounded-none"
        )}
      >
        <ChatHeadlessProvider
          key={selectedConfig.label}
          config={{
            apiKey: selectedConfig.apiKey,
            botId: selectedConfig.botId,
          }}
        >
          <ChatPanel HeaderComponent={HeaderComponent} />
        </ChatHeadlessProvider>
      </motion.div>
    </div>
  )
}