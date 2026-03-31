"use client";
import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  y?: number;
}

export default function SectionReveal({
  children,
  delay = 0,
  className,
  style,
  y = 30,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(4px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y, filter: "blur(4px)" }}
      transition={{
        opacity: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
        y: { type: "spring", stiffness: 70, damping: 16, delay },
        filter: { duration: 0.5, delay },
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
