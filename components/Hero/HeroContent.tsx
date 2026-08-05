"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";

interface HeroContentProps {
  onPlay: () => void;
  settings?: Record<string, string>;
}

export default function HeroContent({ onPlay, settings }: HeroContentProps) {
  const badge = settings?.hero_badge || "Java + Bedrock 1.20+";
  const title = settings?.hero_title || "MIYOBI";
  const slogan = settings?.hero_slogan || "Donde nacen nuevas aventuras.";
  const description =
    settings?.hero_description ||
    "Una experiencia premium para Minecraft Java y Bedrock. Explora un universo diseñado para jugadores que buscan calidad, estabilidad y una comunidad inolvidable.";
  const discordUrl = settings?.discord_url || "https://discord.gg/PNAHW9yHZu";

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 sm:pt-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-pink-300 backdrop-blur-md"
        >
          {badge}
        </motion.div>

        {/* Título */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            select-none
            text-5xl
            font-black
            tracking-[0.18em]
            text-white
            drop-shadow-[0_10px_40px_rgba(0,0,0,.65)]
            sm:text-6xl
            md:text-7xl
            lg:text-8xl
            xl:text-[9rem]
          "
        >
          {title}
        </motion.h1>

        {/* Eslogan */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.8,
          }}
          className="
            mt-8
            max-w-3xl
            text-xl
            font-light
            leading-relaxed
            text-white/95
            sm:text-2xl
            md:text-3xl
          "
        >
          {slogan}
        </motion.p>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
          }}
          className="
            mt-6
            max-w-2xl
            text-base
            leading-8
            text-white/70
            md:text-lg
          "
        >
          {description}
        </motion.p>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.45,
            duration: 0.8,
          }}
          className="
            mt-12
            flex
            w-full
            max-w-md
            flex-col
            gap-4
            sm:max-w-none
            sm:flex-row
            sm:justify-center
          "
        >
          <Button
            size="lg"
            className="w-full sm:w-auto"
            onClick={onPlay}
          >
            JUGAR AHORA
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() =>
              window.open(discordUrl, "_blank", "noopener,noreferrer")
            }
          >
            DISCORD
          </Button>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.65,
            duration: 0.8,
          }}
          className="
            mt-14
            grid
            w-full
            max-w-xl
            grid-cols-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
          "
        >
          <div className="py-5">
            <p className="text-2xl font-bold text-white">24/7</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">
              Online
            </p>
          </div>

          <div className="border-x border-white/10 py-5">
            <p className="text-2xl font-bold text-white">Java</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">
              + Bedrock
            </p>
          </div>

          <div className="py-5">
            <p className="text-2xl font-bold text-white">1.20+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">
              Compatible
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}