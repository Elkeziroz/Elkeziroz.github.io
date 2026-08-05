"use client";

import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Server,
  MessageCircle,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "2,500+",
    label: "Jugadores registrados",
  },
  {
    icon: Server,
    value: "99.9%",
    label: "Uptime",
  },
  {
    icon: ShieldCheck,
    value: "Java & Bedrock",
    label: "Compatibilidad",
  },
  {
    icon: MessageCircle,
    value: "Discord",
    label: "Comunidad activa",
  },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#070709] py-32">
      {/* Brillo de fondo */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-500/10 blur-[180px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-400">
            MIYOBI EN NÚMEROS
          </span>

          <h2 className="mt-4 text-5xl font-bold text-white">
            Una comunidad en crecimiento
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-zinc-400">
            Miles de jugadores ya forman parte de Miyobi. Y esto apenas comienza.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-300 hover:border-pink-500/40"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400">
                  <Icon size={28} />
                </div>

                <h3 className="mt-8 text-4xl font-black text-white">
                  {stat.value}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}