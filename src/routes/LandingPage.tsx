import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { motion } from 'framer-motion'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { ChatHeadlessProvider } from '@yext/chat-headless-react'
import ChatHeader from '../components/chat-ui/ChatHeader'
import ChatPanel from '../components/chat-ui/ChatPanel'


export default function LandingPage() {

  return (
    <>
      <ChatHeadlessProvider
        config={{
          apiKey: "5db47bd2b4c1f5776606691c7da348b2",
          botId: "yext-marketing-bot",
          saveToSessionStorage: false,
        }}>
        <Parallax
          className='h-screen w-screen font-poppins'
          pages={3}
          style={{
            backgroundImage: "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)"
          }}
        >
          <ParallaxLayer
            className='h-auto w-auto flex'
            offset={0} speed={1.5}>
            <div
              className='my-auto mx-auto flex flex-col gap-y-8'>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className='text-6xl lg:text-8xl font-normal mx-auto text-center bg-gradient-to-br from-white to-gray-500 via-white bg-clip-text text-transparent'>
                <span className='text-4xl lg:text-6xl'>Introducing</span> <br />Yext Chat
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1.5 }}
                className='text-slate-300 text-lg p-4 lg:p-0 lg:text-xl max-w-lg text-center mx-auto'>
                Yext Chat is a new way to build conversational agents using the power of large language models.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25, duration: 1.5 }}
                className='flex flex-row w-fit mx-auto gap-x-4'>
                <button
                  className='group bg-gradient-to-tr from-gray-600/50 to-gray-900/50 border border-white/25 hover:border-white/50 backdrop-blur-sm text-white mx-auto px-6 py-2 text-base rounded-xl shadow-2xl shadow-cyan-200/20 hover:shadow-cyan-100/40 transition-all duration-200 flex'>
                  Get a Demo
                </button>
                <button
                  className='group bg-gradient-to-tr from-cyan-600/50 to-cyan-900/50 border border-white/25 hover:border-white/50 backdrop-blur-sm text-white mx-auto px-6 py-2 text-base rounded-xl shadow-2xl shadow-cyan-200/20 hover:shadow-cyan-100/40 transition-all duration-200 flex'>
                  Try it Out
                  <ArrowLongRightIcon className='w-5 h-5 ml-2 my-auto group-hover:translate-x-2 transition-all' />
                </button>
              </motion.div>
            </div>
          </ParallaxLayer>
          <ParallaxLayer
            className='h-auto w-auto flex lg:flex-row flex-col'
            offset={1} speed={1.5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ scale: 1.1, opacity: 1, transition: { duration: 0.5 } }}
              className='mr-auto w-1/2 my-auto flex flex-col gap-y-4 p-36'>
              <h2 className='bg-gradient-to-br from-white to-gray-500 via-white bg-clip-text font-semibold text-3xl text-transparent'>
                Try it for yourself.
              </h2>
              <p className='text-gray-200'>
                Yext Chat uses large language models to answer questions about your business.
                Try it out for yourself - ask us any question about Yext Chat and we'll do our best to answer it.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ scale: 1.0, opacity: 1, transition: { duration: 0.5 } }}
              className='mx-auto w-1/2 my-auto'>
              <div className='mx-auto my-auto bg-white/20 w-[50vh] h-[80vh] shadow-2xl shadow-white/20 rounded-3xl overflow-hidden' >
                <ChatPanel
                  HeaderComponent={<ChatHeader title='Try Me Out' showRefreshButton={true} />}
                  autofocus={false}
                  autoScroll={true}
                />
              </div>
            </motion.div>
          </ParallaxLayer>
          <ParallaxLayer
            className='h-auto w-auto flex lg:flex-row flex-col-reverse'
            offset={2}
            speed={1.5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ scale: 1.0, opacity: 1, transition: { duration: 0.5 } }}
              className='p-4 md:p-20 lg:p-0 mx-auto lg:w-1/2 my-auto lg:ml-32'>
              <img src="/instructions.svg" className='w-[80vh]' />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ scale: 1.1, opacity: 1, transition: { duration: 0.5 } }}
              className='text-center lg:text-left  mx-auto lg:mr-auto w-1/2 my-auto flex flex-col gap-y-4 lg:p-20'>
              <h2 className='bg-gradient-to-br from-white to-gray-500 via-white bg-clip-text font-semibold text-3xl text-transparent'>
                Program in natural language.
              </h2>
              <p className='text-gray-200'>
                Yext Chat allows you to build complex workflows using natural language.
                No more writing code, just write what you want to happen.
              </p>
            </motion.div>
          </ParallaxLayer>
        </Parallax >
      </ChatHeadlessProvider >

    </>
  )
}