import { BellRing } from "lucide-react";
import NoticeCard from "./NoticeCard";

type Notice = {
  id: string;
  title: string;
  message: string;
  author: string;
  authorImage: string | null;
  authorRole: string | null;
  createdAt: Date;
  reactions: {
    id: string;
    type: string;
    userId: string;
    noticeId: string;
    createdAt: Date;
  }[];
  comments: {
    id: string;
    message: string;
    author: string;
    authorImage: string | null;
    authorRole: string | null;
    userId: string;
    createdAt: Date;
  }[];
};

export default function StaffNotices({
  notices,
  userId,
  canDelete,
}: {
  notices: Notice[];
  userId: string;
  canDelete: boolean;
}) {
  return (
    <div className="rounded-[2.5rem] border border-white/10 bg-[#0a0a10]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
      <div className="flex items-center gap-4 pb-4 border-b border-white/10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
          <BellRing className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Avisos Staff</h2>
          <p className="text-xs text-zinc-400">Comunicados importantes del equipo administrativo.</p>
        </div>
      </div>

      <div className="space-y-4">
        {notices.length === 0 ? (
          <div className="rounded-2xl border border-white/5 bg-black/30 p-6 text-center text-xs sm:text-sm text-zinc-400">
            No hay avisos nuevos publicados en este momento.
          </div>
        ) : (
          notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              userId={userId}
              canDelete={canDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}