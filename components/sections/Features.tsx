"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Zap,
  Trophy,
  CalendarDays,
} from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Java & Bedrock",
    description:
      "Conéctate desde ambas ediciones y juega con tus amigos sin importar la plataforma.",
  },
  {
    icon: Zap,
    title: "Alto rendimiento",
    description:
      "Infraestructura optimizada para ofrecer una experiencia fluida y estable.",
  },
  {
    icon: Trophy,
    title: "Economía equilibrada",
    description:
      "Progresa jugando. Sin ventajas injustas que arruinen la experiencia.",
  },
  {
    icon: CalendarDays,
    title: "Eventos semanales",
    description:
      "Cada semana encontrarás nuevos desafíos, recompensas y actividades.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#09090b] py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-400">
            ¿POR QUÉ MIYOBI?
          </span>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Una experiencia diferente
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
            Cada detalle del servidor está pensado para ofrecer una experiencia
            estable, divertida y con contenido constante.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-pink-500/40"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 transition group-hover:bg-pink-500 group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}