import { cn } from "../../lib/utils";

export default function Button({
  onClick,
  children,
  className,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "mt-3 bg-gradient-to-br from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-medium px-4 py-2 rounded-full border border-blue-800 flex flex-row text-sm w-fit",
        className
      )}>
      {children}
    </button>
  )
}