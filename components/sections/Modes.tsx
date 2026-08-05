"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Swords } from "lucide-react";

const modes = [
  {
    title: "SURVIVAL",
    badge: "Custom 1.20+",
    href: "/survival",
    description:
      "Forja tu historia en un mundo vivo. Claims anti-grifeo, subastas, trabajos, clanes y misiones en una economía equilibrada.",
    image: "/images/survival.png",
    icon: Shield,
    badgeColor: "border-pink-500/40 bg-pink-500/10 text-pink-300",
  },
  {
    title: "BOXPVP",
    badge: "Extreme PvP",
    href: "/boxpvp",
    description:
      "Demuestra tu fuerza en combates continuos. Minas por rangos progresivos, crafteos únicos, crates y eventos KOTH.",
    image: "/images/boxpvp.png",
    icon: Swords,
    badgeColor: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  },
];

export default function Modes() {
  return (
    <section
      id="modalidades"
      className="bg-[#09090b] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-400">
            NUESTRAS MODALIDADES
          </span>

          <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            Elige tu universo en Miyobi
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400">
            Dos experiencias completamente distintas diseñadas con atención al detalle para ofrecer cientos de horas de diversión.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {modes.map((mode, index) => {
            const Icon = mode.icon;

            return (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12] shadow-2xl backdrop-blur-xl transition duration-300 hover:border-pink-500/40"
              >
                <div className="relative h-[440px] overflow-hidden">
                  <Image
                    src={mode.image}
                    alt={mode.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent" />

                  {/* Top Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-bold ${mode.badgeColor} backdrop-blur-md`}>
                      <Icon size={14} />
                      {mode.badge}
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-4xl font-black tracking-wide text-white">
                      {mode.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm sm:text-base text-zinc-300 leading-relaxed">
                      {mode.description}
                    </p>

                    <Link
                      href={mode.href}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-pink-500 hover:bg-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]"
                    >
                      Explorar {mode.title}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}