"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";

export default function Gallery({
  settings,
}: {
  settings?: Record<string, string>;
}) {
  const images = [
    {
      id: 1,
      title: settings?.gallery_title_1 || "Mundo Survival 1.20+",
      subtitle: settings?.gallery_sub_1 || "Exploración y construcciones protegidas",
      image: settings?.gallery_img_1 || "/images/survival.png",
      className: "lg:col-span-2 lg:row-span-2",
    },
    {
      id: 2,
      title: settings?.gallery_title_2 || "BoxPvP Arena & Minas",
      subtitle: settings?.gallery_sub_2 || "Acción continua y rangos",
      image: settings?.gallery_img_2 || "/images/boxpvp.png",
      className: "",
    },
    {
      id: 3,
      title: settings?.gallery_title_3 || "Comunidad & Eventos",
      subtitle: settings?.gallery_sub_3 || "Torneos y actividades semanales",
      image: settings?.gallery_img_3 || "/images/hero-bg.png",
      className: "",
    },
  ];

  const [activeImage, setActiveImage] = useState<typeof images[0] | null>(null);

  return (
    <>
      <section className="bg-[#09090b] py-32 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-pink-400">
              GALERÍA
            </span>

            <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
              Explora Miyobi
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400">
              Descubre los escenarios, arenas de combate y entornos diseñados para la mejor experiencia.
            </p>
          </motion.div>

          <div className="grid auto-rows-[300px] gap-6 lg:grid-cols-3">
            {images.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveImage(item)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12] ${item.className} shadow-2xl transition duration-500 hover:border-pink-500/50 hover:shadow-[0_20px_50px_rgba(236,72,153,0.15)]`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Expand Icon Button */}
                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition duration-300">
                  <Maximize2 size={16} />
                </div>

                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-pink-300 transition">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-zinc-300">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full overflow-hidden rounded-3xl border border-white/20 bg-[#09090b] shadow-2xl"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white hover:bg-pink-500 transition"
              >
                <X size={20} />
              </button>

              <div className="relative h-[65vh] sm:h-[75vh] w-full">
                <Image
                  src={activeImage.image}
                  alt={activeImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-6 bg-black/80 border-t border-white/10">
                <h3 className="text-2xl font-bold text-white">{activeImage.title}</h3>
                <p className="mt-1 text-sm text-zinc-400">{activeImage.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}