import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { motion } from 'framer-motion'
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { ChatHeadlessProvider } from '@yext/chat-headless-react'
import ChatHeader from '../components/chat-ui/ChatHeader'
import ChatPanel from '../components/chat-ui/ChatPanel'
import TextBlock from '../components/landing-page/TextBlock'
import SplitStage from '../components/landing-page/SplitStage'
import Button from '../components/landing-page/Button'
import UseCases from '../components/landing-page/UseCases'

export default function LandingPage() {

  return (
    <>
      <ChatHeadlessProvider
        config={{
          apiKey: "3f787a8ed5b5092b61932982f6837316",
          botId: "yext-marketing-bot",
          saveToSessionStorage: false,
        }}>
        <Parallax
          className='h-screen w-screen font-poppins'
          pages={5}
        >
          <ParallaxLayer
            className='h-auto w-auto flex'
            offset={0}
            speed={1.5}>
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
                <Button type='SECONDARY'>
                  Get a Demo
                </Button>
                <Button
                  type='PRIMARY'
                  Icon={ArrowLongRightIcon}
                >
                  Try it Out
                </Button>
              </motion.div>
            </div>
          </ParallaxLayer>
          <SplitStage
            className='h-auto w-auto flex lg:flex-row flex-col'
            offset={1} speed={1.5}>
            <SplitStage.Left>
              <TextBlock
                title='Unlock the power of LLMs.'
                subtitle="Yext Chat is unlike any bot you have ever used. It uses the power of large language models to answer questions. But don't take our word for it. Try it out. Ask it about itself."
                cta={{
                  text: 'Learn More About How It Works',
                }}
              />
            </SplitStage.Left>
            <SplitStage.Right>
              <div className='mx-auto my-auto bg-white/20 w-[50vh] h-[80vh] shadow-2xl shadow-white/20 rounded-3xl overflow-hidden' >
                <ChatPanel
                  HeaderComponent={
                    <ChatHeader
                      className='from-cyan-600 to-cyan-800'
                      title='Try Me Out'
                      showRefreshButton={true}
                    />
                  }
                  autofocus={false}
                  autoScroll={false}
                />
              </div>
            </SplitStage.Right>
          </SplitStage>
          <SplitStage
            className='h-auto w-auto flex lg:flex-row flex-col-reverse'
            offset={2}
            speed={1.5}>
            <SplitStage.Left>
              <img src="/instructions.svg" className='max-w-2xl mx-auto my-auto' />
            </SplitStage.Left>
            <SplitStage.Right>
              <TextBlock
                title='Use your words.'
                subtitle='Yext Chat allows you to build complex workflows using natural language. No more writing code, just write what you want to happen. If you can explain it to a person, you can explain it to Yext Chat.'
                cta={{
                  text: "Try Writing Your First Bot"
                }}
              />
            </SplitStage.Right>
          </SplitStage>
          <SplitStage
            className=''
            offset={3}
            speed={1.5}
          >
            <SplitStage.Left>
              <TextBlock
                title='Built for developers.'
                subtitle='Yext Chat is built for developers. It is easy to integrate into your existing website and can be customized to fit your needs.'
                cta={{
                  text: "Read the documentation."
                }}
              />
            </SplitStage.Left>
            <SplitStage.Right>
              <div className='flex flex-col'>
                <img className="max-w-2xl" src="/codeblock.svg" />
                <img className="max-w-2xl" src="/codeblock2.svg" />
              </div>
            </SplitStage.Right>
          </SplitStage>
          <SplitStage
            offset={4}
          >
            <SplitStage.Left>
              <UseCases />
            </SplitStage.Left>
            <SplitStage.Right>
              <TextBlock
                title='For any use case.'
                subtitle='Yext Chat can be used for any use case - whether supporting your customers, helping your employees find information they need, or helping your users find the right product.'
                cta={{
                  text: "View Customer Stories"
                }}
              />
            </SplitStage.Right>
          </SplitStage>
        </Parallax>
      </ChatHeadlessProvider >
    </>
  )
}