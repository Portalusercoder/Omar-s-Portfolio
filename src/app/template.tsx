"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="flex min-h-0 flex-1 flex-col overflow-hidden"
      initial={reduce ? false : { opacity: 0.94 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.32, 1] }}
    >
      {children}
    </motion.div>
  );
}
