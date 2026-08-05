import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Acceso Denegado | Miyobi Staff",
  description: "Se requieren permisos de Staff para acceder a esta área.",
};

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between">
      <div className="relative overflow-hidden pt-28 pb-20 sm:pt-36 flex-1 flex items-center justify-center">
        <Image
          src="/images/hero-bg.png"
          alt="Acceso Denegado"
          fill
          priority
          className="object-cover scale-[1.03]"
        />

        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute left-1/2 top-[20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-red-600/20 blur-[220px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.7)_100%)]" />

        <div className="relative z-10 mx-auto max-w-lg px-6 w-full">
          <div className="overflow-hidden rounded-[2.5rem] border border-red-500/30 bg-red-950/20 p-8 sm:p-12 text-center shadow-[0_20px_60px_rgba(239,68,68,0.15)] backdrop-blur-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-red-500/20 text-red-400 border border-red-500/30">
              <ShieldAlert size={28} />
            </div>

            <span className="mt-6 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.25em] text-red-300">
              Miyobi Staff
            </span>

            <h1 className="mt-4 text-3xl font-black text-white sm:text-4xl">
              Acceso Denegado
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-300">
              Tu cuenta de Discord no posee los roles o permisos necesarios para ingresar al panel de administración de Miyobi.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/staff"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/40 hover:bg-white/20"
              >
                Reintentar inicio
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/20 px-6 py-3 text-sm font-semibold text-red-200 transition hover:bg-red-500 hover:text-white"
              >
                <ArrowLeft size={16} /> Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
