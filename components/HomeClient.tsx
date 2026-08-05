"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero/Hero";
import Modes from "@/components/sections/Modes";
import Events from "@/components/sections/Events";
import Features from "@/components/sections/Features";
import Stats from "@/components/sections/Stats";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";
import ServerModal from "@/components/ui/ServerModal";
import type { EventItem } from "@/types/events";
import { Megaphone } from "lucide-react";

type HomeClientProps = {
  events: EventItem[];
  settings?: Record<string, string>;
};

export default function HomeClient({ events, settings }: HomeClientProps) {
  const [open, setOpen] = useState(false);

  const announcementEnabled = settings?.announcement_enabled === "true";
  const announcementText = settings?.announcement_text || "";

  return (
    <>
      {/* ANNOUNCEMENT BANNER */}
      {announcementEnabled && announcementText && (
        <div className="relative z-50 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-pink-600 py-2.5 px-4 text-center text-xs sm:text-sm font-bold text-white shadow-lg border-b border-pink-400/30">
          <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
            <Megaphone className="h-4 w-4 animate-bounce shrink-0" />
            <span>{announcementText}</span>
          </div>
        </div>
      )}

      <Navbar logoUrl={settings?.logo_url} onPlay={() => setOpen(true)} />

      <main>
        <Hero onPlay={() => setOpen(true)} settings={settings} />

        <Modes />

        <Events events={events} />

        <Features />

        <Stats />

        <Gallery settings={settings} />

        <CTA onPlay={() => setOpen(true)} />
      </main>

      <Footer settings={settings} />

      <ServerModal
        open={open}
        onClose={() => setOpen(false)}
        ipJava={settings?.ip_java}
        ipBedrock={settings?.ip_bedrock}
        portBedrock={settings?.port_bedrock}
      />
    </>
  );
}