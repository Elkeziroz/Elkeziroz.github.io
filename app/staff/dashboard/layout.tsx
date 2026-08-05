import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-pink-500/15 blur-[180px]" />
        <div className="absolute right-20 top-40 h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
      </div>

      <Sidebar />

      <section className="lg:ml-[19rem] px-6 pb-16 pt-24 lg:px-10 xl:px-20">
        <div className="mx-auto max-w-7xl">{children}</div>
      </section>
    </main>
  );
}
