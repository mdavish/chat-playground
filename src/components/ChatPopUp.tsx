import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { IoCaretDownOutline, IoChatbubblesSharp } from 'react-icons/io5';
import ChatPanel from './chat-ui/ChatPanel';
import { cn } from '../lib/utils';

export interface ChatPopUpProps {
  headerTitle?: string;
}

export default function ChatPopUp({ headerTitle = "Chat" }: ChatPopUpProps) {

  const [showChat, setShowChat] = useState(false);

  return (
    <div className={cn(
      "fixed z-50 bottom-6 right-4 lg:bottom-14 lg:right-10", showChat && "h-auto"
    )}>
      <Transition className="fixed right-4 bottom-24 lg:bottom-40 lg:right-10 w-80 lg:w-96 h-3/4 lg:h-2/3 xl:1/2  bg-white rounded-xl shadow-xl overflow-hidden" as="div" enter="transition-opacity duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity duration-300" leaveFrom="opacity-100" leaveTo="opacity-0" show={showChat}>
        <ChatPanel header={{ title: headerTitle }} />
      </Transition>
      <button onClick={() => setShowChat(!showChat)} className="border border-white shadow-xl hover:shadow-2xl bottom-10 right-10 w-8 h-8 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 hover:-translate-y-2 transition-all duration-150">
        <div className="flex flex-col justify-center items-center h-full w-full text-white">
          {showChat ?
            <IoCaretDownOutline className="text-xl lg:text-xl text-white" /> :
            <IoChatbubblesSharp className="text-xl lg:text-xl text-white" />
          }
        </div>
      </button>
    </div>
  )
}