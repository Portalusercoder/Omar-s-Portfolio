"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { easeApple, duration } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function RevealImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: RevealImageProps) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("overflow-hidden bg-[#0a0a0a]", className)}>
      <motion.div
        className="relative h-full w-full"
        initial={reduce ? false : { opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: duration.reveal, ease: easeApple }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
          className="object-cover"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}
