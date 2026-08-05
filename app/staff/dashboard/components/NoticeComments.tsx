"use client";


import { useState } from "react";
import { MessageCircle, ChevronDown, ChevronUp, User as UserIcon, Trash2 } from "lucide-react";

import {
  createNoticeComment,
  deleteNoticeComment,
} from "@/actions/staff-comments";



type Props = {

  noticeId: string;

  userId: string;

  canDelete: boolean;


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









export default function NoticeComments({

  noticeId,

  userId,

  canDelete,

  comments,

}: Props) {



  const [open, setOpen] = useState(false);






  return (


    <div className="mt-6">






      {/* Botón para abrir comentarios */}



      <button
        onClick={() => setOpen(!open)}
        className="
          mb-4
          inline-flex
          items-center
          gap-2
          text-sm
          font-bold
          text-zinc-300
          transition
          hover:text-pink-400
        "
      >
        <MessageCircle className="h-4 w-4" />
        {comments.length} comentarios
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}


      </button>









      {open && (



        <div
          className="
            space-y-3
          "
        >





          {comments.length === 0 ? (



            <div
              className="
                rounded-xl
                bg-white/5
                p-4
                text-sm
                text-zinc-400
              "
            >

              No hay comentarios todavía.

            </div>



          ) : (



            comments.map((comment) => (



              <div

                key={comment.id}

                className="
                  flex
                  gap-3
                  rounded-xl
                  bg-white/5
                  p-3
                "

              >






                {comment.authorImage ? (



                  <img

                    src={comment.authorImage}

                    alt={comment.author}

                    className="
                      h-9
                      w-9
                      rounded-full
                    "

                  />



                ) : (



                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                    "
                  >
                    <UserIcon className="h-5 w-5 text-zinc-300" />
                  </div>



                )}








                <div className="flex-1">





                  <div className="flex justify-between items-center">





                    <p className="text-sm font-bold text-white">

                      {comment.author}

                    </p>








                    {(

                      comment.userId === userId ||

                      canDelete

                    ) && (



                      <form action={deleteNoticeComment}>


                        <input

                          type="hidden"

                          name="commentId"

                          value={comment.id}

                        />




                        <button
                          type="submit"
                          className="
                            inline-flex
                            items-center
                            justify-center
                            text-xs
                            text-red-400
                            hover:text-red-300
                          "
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>



                      </form>



                    )}





                  </div>







                  <p className="text-sm text-zinc-400">

                    {comment.message}

                  </p>






                </div>






              </div>



            ))



          )}









          {/* Caja de comentario */}





          <form

            action={createNoticeComment}

            className="
              mt-4
              flex
              gap-2
            "

          >





            <input

              type="hidden"

              name="noticeId"

              value={noticeId}

            />







            <input

              name="message"

              placeholder="Escribe un comentario..."

              className="
                flex-1
                rounded-xl
                border
                border-white/10
                bg-black/20
                px-4
                py-2
                text-sm
                text-white
                outline-none
              "

            />








            <button

              type="submit"

              className="
                rounded-xl
                bg-pink-500/20
                px-4
                text-pink-300
              "

            >

              Enviar

            </button>






          </form>





        </div>



      )}






    </div>


  );


}