"use client";

import { motion } from "framer-motion";

export default function HeroGlow() {
  return (
    <>
      {/* Glow principal */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/3
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-pink-500/30
          blur-[220px]
        "
      />

      {/* Glow secundario */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/3
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-fuchsia-400/40
          blur-[140px]
        "
      />
    </>
  );
}