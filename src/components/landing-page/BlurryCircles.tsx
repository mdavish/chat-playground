import { cn } from "../../lib/utils"
import { motion } from 'framer-motion'
import { ParallaxLayer } from "@react-spring/parallax"

export default function BlurryCircles() {

  const sharedSize = "w-[70vh] h-[70vh]"

  const sharedCircleStyle = "filter blur-2xl mix-blend-multiply absolute rounded-full opacity-40"

  return (
    <ParallaxLayer
      offset={0} speed={0.5}
      className='w-screen h-screen fixed  flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5, duration: 1.5 } }}
        whileInView={{}}
        className={cn('relative', sharedSize)}>
        <div className={cn('bg-cyan-900 translate-x-28', sharedSize, sharedCircleStyle)} />
        <div className={cn('bg-blue-900 -translate-x-36 -translate-y-4', sharedSize, sharedCircleStyle)} />
        <div className={cn('bg-slate-700 translate-y-24', sharedSize, sharedCircleStyle)} />
      </motion.div>
    </ParallaxLayer>
  )
}