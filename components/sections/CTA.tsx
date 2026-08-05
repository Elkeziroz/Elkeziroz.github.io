"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";

export default function CTA({ onPlay }: { onPlay: () => void }) {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Fondo */}
      <Image
        src="/images/hero-bg.png"
        alt="Miyobi"
        fill
        className="object-cover"
      />

      {/* Capas */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-black/40 to-[#09090b]" />

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/20 blur-[180px]" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto flex max-w-4xl flex-col items-center px-6 text-center"
      >
        <span className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-400">
          COMIENZA TU AVENTURA
        </span>

        <h2 className="mt-6 text-5xl font-black text-white md:text-6xl">
          El universo de Miyobi
          <br />
          te está esperando.
        </h2>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
          Explora un mundo lleno de aventuras, enfréntate a nuevos desafíos y
          forma parte de una comunidad que apenas está comenzando.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onPlay}
            className="flex items-center justify-center gap-2 rounded-full bg-pink-500 px-8 py-4 text-lg font-semibold text-white transition hover:bg-pink-400"
          >
            <Gamepad2 size={22} />
            Jugar ahora
          </button>

          <a
            href="https://discord.gg/PNAHW9yHZu"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-xl transition hover:border-pink-500 hover:bg-white/15"
          >
            Discord
            <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}