import { motion } from "framer-motion"
import { cn } from "../../lib/utils";
import Button from "./Button";
import { ArrowLongRightIcon } from '@heroicons/react/20/solid'

export default function TextBlock({
  title,
  subtitle,
  className,
  cta,
}: {
  title: string,
  subtitle: string,
  className?: string,
  cta?: {
    text: string,
    href?: string,
  },
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ scale: 1.1, opacity: 1, transition: { duration: 0.5 } }}
      className={cn(
        'text-center lg:text-left mx-auto lg:mr-auto my-auto flex flex-col gap-y-4 max-w-xl',
        className
      )}>
      <h2 className='bg-gradient-to-br from-white to-gray-500 via-white bg-clip-text font-semibold text-3xl text-transparent'>
        {title}
      </h2>
      <p className='text-gray-200 prose-sm md:prose-lg'>
        {subtitle}
      </p>
      {
        cta && (
          <Button
            type="SECONDARY"
            className="w-fit mt-4 mx-auto lg:mx-0"
            Icon={ArrowLongRightIcon}
          >
            {cta.text}
          </Button>
        )}
    </motion.div>
  )
}