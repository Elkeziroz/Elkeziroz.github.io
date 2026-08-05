import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isStaffMember } from "@/lib/discord";
import Button from "@/components/ui/Button";
import { signInWithDiscord } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Lock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Portal Staff | Miyobi",
  description: "Acceso exclusivo para el equipo de administración y soporte de Miyobi Network.",
};

export default async function StaffPage() {
  const session = await auth();

  if (session?.user?.discordId) {
    const isStaff = await isStaffMember(session.user.discordId);

    if (isStaff) {
      redirect("/staff/dashboard");
    }

    redirect("/staff/access-denied");
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between">
      {/* Background Hero Overlay */}
      <div className="relative overflow-hidden pt-28 pb-20 sm:pt-36 flex-1 flex items-center justify-center">
        <Image
          src="/images/hero-bg.png"
          alt="Miyobi Staff Portal"
          fill
          priority
          className="object-cover scale-[1.03]"
        />

        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute left-1/2 top-[20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[220px]" />
        <div className="absolute right-[15%] top-[15%] h-[350px] w-[350px] rounded-full bg-fuchsia-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)]" />

        {/* Content Box */}
        <div className="relative z-10 mx-auto max-w-xl px-6 w-full">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/5 p-8 sm:p-12 shadow-[0_20px_60px_rgba(236,72,153,0.15)] backdrop-blur-2xl transition duration-300 hover:border-pink-500/40">
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30">
                <ShieldCheck size={24} />
              </div>
              <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.25em] text-pink-300">
                Miyobi Staff
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-black text-white sm:text-4xl">
              Portal de Administración
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Inicia sesión de forma segura con tu cuenta de Discord para acceder al panel privado del equipo de Miyobi.
            </p>

            <div className="mt-8 space-y-3 border-y border-white/10 py-6">
              {[
                "Autenticación oficial vía Discord OAuth2",
                "Acceso a comunicados y anuncios internos",
                "Gestión de avisos y herramientas de Staff"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle2 size={16} className="text-pink-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <form action={signInWithDiscord} className="mt-8">
              <button
                type="submit"
                className="group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-6 py-4 text-base font-bold text-white shadow-[0_10px_30px_rgba(79,70,229,0.35)] transition-all duration-300 hover:bg-indigo-500 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(79,70,229,0.5)] active:scale-95"
              >
                <svg
                  className="h-5 w-5 fill-current text-white transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                Iniciar sesión con Discord
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
              >
                ← Volver a la página principal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
