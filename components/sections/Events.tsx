import { CalendarDays, ImageIcon, Sparkles } from "lucide-react";

type EventProps = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  date: Date;
  featured: boolean;
};

export default function Events({
  events,
}: {
  events: EventProps[];
}) {
  if (!events.length) {
    return null;
  }

  return (
    <section className="bg-[#09090b] px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-pink-400">
            Miyobi Network
          </span>

          <h2 className="mt-4 flex items-center justify-center gap-3 text-3xl font-black text-white sm:text-5xl">
            <Sparkles className="h-8 w-8 text-pink-400" />
            Eventos Especiales
          </h2>

          <p className="mt-4 text-base text-zinc-400">
            Participa en actividades exclusivas de la comunidad y consigue recompensas únicas.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-pink-500/40 hover:bg-white/10"
            >
              {event.featured && (
                <div className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-pink-500/90 border border-pink-400/40 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-pink-500/20 backdrop-blur-md">
                  <Sparkles className="h-3.5 w-3.5" />
                  Destacado
                </div>
              )}

              {/* Imagen del evento */}
              <div className="h-48 overflow-hidden relative bg-black/40">
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-white/5 text-pink-400">
                    <ImageIcon className="h-12 w-12 opacity-60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold uppercase text-white group-hover:text-pink-300 transition">
                  {event.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                  {event.description}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold text-pink-300">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {event.date.toLocaleDateString()}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}