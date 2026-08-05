"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer({
  settings,
}: {
  settings?: Record<string, string>;
}) {
  const discordUrl = settings?.discord_url || "https://discord.gg/PNAHW9yHZu";
  const instagramUrl = settings?.instagram_url || "https://instagram.com";
  const tiktokUrl = settings?.tiktok_url || "https://tiktok.com";
  const siteName = settings?.hero_title || "MIYOBI";
  const slogan = settings?.hero_slogan || "Donde nacen nuevas aventuras.";

  return (
    <footer className="border-t border-white/10 bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-black tracking-widest text-white">
            {siteName}
          </h2>

          <p className="mt-3 font-light text-zinc-400">
            {slogan}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-zinc-400">
            <a href="/#modalidades" className="transition hover:text-pink-400">
              Modalidades
            </a>

            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="transition hover:text-pink-400"
            >
              Discord
            </a>

            <a href="/tienda" className="transition hover:text-pink-400">
              Tienda
            </a>

            <a href="/staff" className="transition hover:text-pink-400">
              Soporte
            </a>

            <Link href="/postulaciones" className="transition text-pink-400 font-semibold hover:text-pink-300">
              Postulaciones
            </Link>
          </div>

          {/* MINIMALIST ICON-ONLY SOCIAL BUTTONS */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {/* Discord */}
            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Discord"
              title="Discord"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <svg
                className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              title="Instagram"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <svg
                className="h-5 w-5 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="TikTok"
              title="TikTok"
              className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-white/30 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              <svg
                className="h-5 w-5 fill-current transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-1.42V9.07a6.34 6.34 0 0 0-5.07 2.45A6.33 6.33 0 0 0 3 15.67a6.33 6.33 0 0 0 10.8 4.47 6.3 6.3 0 0 0 1.95-4.47V9.4a8.16 8.16 0 0 0 4.84 1.57V7.52a4.85 4.85 0 0 1-1-.83z" />
              </svg>
            </a>
          </div>

          {/* CALLOUT PARA POSTULAR AL STAFF */}
          <div className="mt-8 rounded-2xl border border-pink-500/25 bg-pink-500/10 px-6 py-3.5 text-xs sm:text-sm text-zinc-300 backdrop-blur-md shadow-lg shadow-pink-500/5">
            ¿Te gustaría formar parte del staff? Contesta el formulario{" "}
            <Link
              href="/postulaciones"
              className="font-bold text-pink-400 underline underline-offset-4 hover:text-pink-300 transition"
            >
              aquí
            </Link>
            .
          </div>

          <div className="mt-8 h-px w-full max-w-xl bg-white/10" />

          <p className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
            Hecho con <Heart size={14} className="fill-pink-500 text-pink-500" /> para la
            comunidad de Miyobi.
          </p>

          <p className="mt-2 text-xs text-zinc-600">
            © 2026 Miyobi. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}