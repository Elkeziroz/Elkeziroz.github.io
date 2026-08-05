"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Copy, Check, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

interface ServerModalProps {
  open: boolean;
  onClose: () => void;
  ipJava?: string;
  ipBedrock?: string;
  portBedrock?: string;
}

export default function ServerModal({
  open,
  onClose,
  ipJava = "miyobi.minehut.gg",
  ipBedrock = "bedrock.miyobi.gg",
  portBedrock = "19132",
}: ServerModalProps) {
  const [javaCopied, setJavaCopied] = useState(false);
  const [bedrockCopied, setBedrockCopied] = useState(false);

  const fullBedrockIp = `${ipBedrock}:${portBedrock}`;

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  async function copyJava() {
    await navigator.clipboard.writeText(ipJava);
    setJavaCopied(true);
    setTimeout(() => setJavaCopied(false), 2000);
  }

  async function copyBedrock() {
    await navigator.clipboard.writeText(fullBedrockIp);
    setBedrockCopied(true);
    setTimeout(() => setBedrockCopied(false), 2000);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 25 }}
            transition={{ duration: 0.18 }}
            className="fixed left-1/2 top-1/2 z-[100] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-[0_40px_120px_rgba(0,0,0,.75)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,.15),transparent_65%)]" />

            <div className="relative p-6">
              <button
                onClick={onClose}
                className="absolute right-5 top-5 rounded-2xl border border-white/10 bg-white/5 p-2.5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="text-center">
                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  Conectar a Miyobi
                </h2>

                <p className="mt-3 text-sm text-zinc-400 sm:text-base">
                  Elige tu edición y copia la conexión con un clic.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-4 py-2 text-sm text-emerald-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 animate-pulse" />
                  Servidor en línea
                </div>

                <div className="mt-6 space-y-4">
                  {/* JAVA */}
                  <div className="rounded-[2rem] bg-slate-900/90 p-5 ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                          Java Edition
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white">
                          Dirección Java
                        </h3>
                      </div>
                      <span className="rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-pink-300">
                        Java
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 rounded-3xl bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-left">
                        <p className="text-xs text-zinc-400">IP Host</p>
                        <p className="text-base font-mono font-semibold text-white">{ipJava}</p>
                      </div>
                      <button
                        onClick={copyJava}
                        className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                      >
                        {javaCopied ? <Check size={16} /> : <Copy size={16} />}
                        {javaCopied ? "Copiado" : "Copiar IP"}
                      </button>
                    </div>
                  </div>

                  {/* BEDROCK */}
                  <div className="rounded-[2rem] bg-slate-900/90 p-5 ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                          Bedrock Edition
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white">
                          Dirección + Puerto
                        </h3>
                      </div>
                      <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                        Bedrock
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 rounded-3xl bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-left">
                          <p className="text-xs text-zinc-400">IP & Puerto</p>
                          <p className="text-base font-mono font-semibold text-white">{fullBedrockIp}</p>
                        </div>
                        <button
                          onClick={copyBedrock}
                          className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                        >
                          {bedrockCopied ? <Check size={16} /> : <Copy size={16} />}
                          {bedrockCopied ? "Copiado" : "Copiar IP"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="https://discord.gg/PNAHW9yHZu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-pink-500/50 hover:bg-pink-500/20"
                >
                  <ExternalLink size={18} />
                  Unirse al Discord
                </a>

                <p className="mt-5 text-center text-xs text-zinc-500">
                  Compatible con Minecraft Java y Bedrock 1.20+
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}