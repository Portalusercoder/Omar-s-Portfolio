"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeApple, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <span className={cn("block overflow-hidden", className)}>
      <motion.span
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: duration.reveal, ease: easeApple, delay }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
