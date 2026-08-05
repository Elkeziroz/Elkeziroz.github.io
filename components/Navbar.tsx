"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Button from "@/components/ui/Button";

const links = [
  {
    name: "Inicio",
    href: "/",
  },
  {
    name: "Survival",
    href: "/survival",
  },
  {
    name: "BoxPvP",
    href: "/boxpvp",
  },
  {
    name: "Wiki",
    href: "/wiki",
  },
  {
    name: "Top Jugadores",
    href: "/top",
  },
  {
    name: "Tienda",
    href: "/tienda",
  },
];

interface NavbarProps {
  onPlay: () => void;
  logoUrl?: string;
}

export default function Navbar({ onPlay, logoUrl }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  const logoSrc = logoUrl || "/images/logo.png";

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 24);

      if (currentY <= 24) {
        setShowHeader(true);
      } else if (currentY > lastScrollY.current && currentY > 100) {
        setShowHeader(false);
      } else if (currentY < lastScrollY.current) {
        setShowHeader(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const shouldShowHeader = open || showHeader;

  return (
    <motion.header
      initial={false}
      animate={{ y: shouldShowHeader ? 0 : -120, opacity: shouldShowHeader ? 1 : 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-2 z-50"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-3 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-white/15 bg-black/55 shadow-2xl backdrop-blur-3xl"
            : "border-white/10 bg-black/30 backdrop-blur-2xl"
        }`}
      >
        <Link
          href="/"
          title="Volver al inicio"
          aria-label="Volver al inicio"
          className="flex items-center cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <Image
            src={logoSrc}
            alt="Miyobi"
            width={42}
            height={42}
            priority
            className="h-9 w-9 rounded-full object-cover transition-transform duration-300 hover:scale-105 sm:h-10 sm:w-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={
                link.href === "/"
                  ? () => window.scrollTo({ top: 0, behavior: "smooth" })
                  : undefined
              }
              className="relative text-sm font-medium text-zinc-300 transition duration-300 hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10 md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/staff" className="hidden md:inline-block">
            <Button size="sm" variant="secondary" className="px-3 py-2 sm:px-4">
              Staff
            </Button>
          </Link>

          <Button size="sm" onClick={onPlay} className="px-3 py-2 sm:px-4">
            Jugar
          </Button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-x-4 top-24 z-40 rounded-3xl border border-white/10 bg-black/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-3xl md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-pink-500/30 hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/staff"
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-pink-500/30 hover:bg-white/10"
            >
              Staff
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}