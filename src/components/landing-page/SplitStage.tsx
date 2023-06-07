import React from "react";
import { cn } from "../../lib/utils";
import { ParallaxLayer, type ParallaxLayerProps } from "@react-spring/parallax";
import { motion, type MotionProps } from "framer-motion";

export type SplitStageSubcomponentProps = {
  className?: string,
  children: React.ReactNode,
}

const sharedMotionProps: MotionProps = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { scale: 1.0, opacity: 1, transition: { duration: 0.5 } }
}

const sharedSubComponentClass = "lg:text-left mx-auto lg:mr-auto h-full w-full lg:w-1/2 my-auto flex flex-col gap-y-4 max-w-3xl md:p-4"

export function SplitStageSub({
  className,
  children
}: SplitStageSubcomponentProps) {
  return (
    <motion.div
      {...sharedMotionProps}
      className={cn(
        sharedSubComponentClass,
        className
      )}>
      {children}
    </motion.div>
  )
}

export type SplitStageProps = {
  className?: string,
  children: [React.ReactNode, React.ReactNode]
} & ParallaxLayerProps;

function SplitStage({
  className,
  children,
  ...props
}: SplitStageProps) {
  return (
    <ParallaxLayer
      {...props}
      className={cn(
        'h-auto w-auto flex flex-col lg:flex-row lg:gap-x-4 mx-2 lg:mx-6',
        className
      )}>
      {children}
    </ParallaxLayer>
  )
}

SplitStage.Left = SplitStageSub;
SplitStage.Right = SplitStageSub;

export default SplitStage;