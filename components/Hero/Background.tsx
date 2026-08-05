import Image from "next/image";

export default function Background({
  bgUrl,
}: {
  bgUrl?: string;
}) {
  const imageSource = bgUrl || "/images/hero-bg.png";

  return (
    <>
      {/* Imagen */}
      <Image
        src={imageSource}
        alt="Miyobi Background"
        fill
        sizes="100vw"
        priority
        className="object-cover scale-[1.03]"
      />

      {/* Oscurecer */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Glow principal */}
      <div className="absolute left-1/2 top-[30%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[220px]" />

      {/* Glow secundario */}
      <div className="absolute right-[10%] top-[15%] h-[350px] w-[350px] rounded-full bg-fuchsia-400/10 blur-[140px]" />

      {/* Viñeta */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.55)_100%)]" />

      {/* Ruido */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
        }}
      />

      {/* Transición */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />
    </>
  );
}