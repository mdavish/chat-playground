import { motion } from "framer-motion"
import { FaCircle } from "react-icons/fa"
import { cn } from "../../lib/utils"

export default function LoadingDots({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className={cn(
        "w-fit flex gap-1 rounded-md p-2 text-[8px] text-gray-500",
        className
      )}>
      <FaCircle className="animate-bounce" style={{ animationDelay: "0ms" }} />
      <FaCircle className="animate-bounce" style={{ animationDelay: "300ms" }} />
      <FaCircle className="animate-bounce" style={{ animationDelay: "600ms" }} />
    </motion.div>
  )
}