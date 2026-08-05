import type { ReactNode } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { toggleNoticeReaction } from "@/actions/staff-notices";


type Props = {

  noticeId: string;

  reactions: {

    id: string;

    type: string;

    userId: string;

    noticeId: string;

    createdAt: Date;

  }[];

  userId: string;

};






const reactionOptions: {
  type: string;
  icon: ReactNode;
  name: string;
}[] = [
  {
    type: "LIKE",
    icon: <ThumbsUp className="h-4 w-4" />,
    name: "Me gusta",
  },
  {
    type: "DISLIKE",
    icon: <ThumbsDown className="h-4 w-4" />,
    name: "No me gusta",
  },
];








export default function NoticeReactions({

  noticeId,

  reactions,

  userId,

}: Props) {



  const userReaction =
    reactions.find(
      (reaction) =>
        reaction.userId === userId
    );







  const currentReaction =
    reactionOptions.find(
      (reaction) =>
        reaction.type === userReaction?.type
    );







  return (

    <div
      className="
        group
        relative
        mt-5
        inline-flex
        pb-2
      "
    >







      {/* Botón principal */}



      <button
        type="button"
        className={`
          inline-flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          px-4
          py-2
          text-sm
          font-medium
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-pink-500/30
          ${
            userReaction
              ? "bg-blue-500/20 text-blue-300"
              : "bg-white/10 text-zinc-300 hover:bg-white/20"
          }
        `}
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          {currentReaction?.icon ?? <ThumbsUp className="h-4 w-4" />}
        </span>

        <span>
          {currentReaction?.name ?? "Reaccionar"}
        </span>

        <span className="inline-flex rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-zinc-200">
          {reactions.length}
        </span>
      </button>









      {/* Burbuja de reacciones */}



      <div
        className="
          absolute
          bottom-full
          left-1/2
          -translate-x-1/2
          mb-1
          hidden
          items-center
          gap-1
          rounded-full
          border
          border-white/10
          bg-black/90
          px-3
          py-2
          shadow-2xl
          backdrop-blur-xl
          group-hover:flex
          group-focus-within:flex
          z-50
          animate-in
          fade-in
          zoom-in
          duration-200
        "
      >






        {reactionOptions.map((reaction) => (


          <form
            key={reaction.type}
            action={toggleNoticeReaction}
          >



            <input
              type="hidden"
              name="noticeId"
              value={noticeId}
            />



            <input
              type="hidden"
              name="type"
              value={reaction.type}
            />







            <button
              type="submit"
              title={reaction.name}
              className={`
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/5
                text-zinc-100
                transition
                hover:scale-110
                hover:bg-white/15
                ${
                  userReaction?.type === reaction.type
                    ? "bg-pink-500/20 text-pink-300 shadow-md"
                    : ""
                }
              `}
            >

              {reaction.icon}

            </button>



          </form>



        ))}





      </div>






    </div>

  );

}