import { cn } from "../../lib/utils"

export default function Button({
  children,
  type = "SECONDARY",
  Icon,
  className,
}: {
  children: string,
  type?: "PRIMARY" | "SECONDARY",
  Icon?: any,
  className?: string,
}) {
  return (
    <button
      className={cn(
        'group bg-gradient-to-tr border  backdrop-blur-sm text-white px-6 py-2 text-base rounded-xl shadow-2xl shadow-cyan-200/20 hover:shadow-cyan-100/40 transition-all duration-200 flex border-white/25 hover:border-white/50',
        {
          "from-cyan-600/50 to-cyan-800/50 ": type === "PRIMARY",
          "from-gray-600/50 to-gray-900/50": type === "SECONDARY",
        },
        className
      )}>
      {children}
      {
        Icon && (
          <Icon className='w-5 h-5 ml-2 my-auto group-hover:translate-x-2 transition-all' />
        )
      }
    </button>
  )
}