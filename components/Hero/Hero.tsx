import Background from "./Background";
import HeroContent from "./HeroContent";
import FloatingPetals from "./FloatingPetals";

interface HeroProps {
  onPlay: () => void;
  settings?: Record<string, string>;
}

export default function Hero({ onPlay, settings }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <Background bgUrl={settings?.hero_bg_url} />
      <FloatingPetals />
      <HeroContent onPlay={onPlay} settings={settings} />
    </section>
  );
}