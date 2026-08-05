interface StatusBadgeProps {
  online?: boolean;
}

export default function StatusBadge({
  online = true,
}: StatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
        online
          ? "bg-green-500/15 text-green-400"
          : "bg-red-500/15 text-red-400"
      }`}
    >
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          online ? "bg-green-400" : "bg-red-400"
        }`}
      />

      {online ? "Servidor en línea" : "Servidor desconectado"}
    </div>
  );
}