import { Bell, Trash2, User as UserIcon } from "lucide-react";
import NoticeReactions from "./NoticeReactions";
import NoticeComments from "./NoticeComments";
import { deleteStaffNotice } from "@/actions/staff-notices";



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









export default function NoticeCard({

  notice,

  userId,

  canDelete,

}: {

  notice: Notice;

  userId: string;

  canDelete: boolean;

}) {



  return (


    <article

      className="
        rounded-2xl
        border
        border-white/10
        bg-black/20
        p-4
        sm:p-5
      "

    >







      {/* Autor */}



      <div className="flex items-center gap-3">





        {notice.authorImage ? (



          <img

            src={notice.authorImage}

            alt={notice.author}

            className="
              h-12
              w-12
              rounded-full
            "

          />



        ) : (
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white/10
              "
            >
              <UserIcon className="h-6 w-6 text-zinc-300" />
            </div>


        )}







        <div>



          <p className="font-bold text-white">

            {notice.author}

          </p>






          <p className="text-xs text-zinc-400">


            {notice.authorRole ?? "Staff"}

            {" • "}

            {notice.createdAt.toLocaleDateString()}


          </p>






        </div>






      </div>









      {/* Contenido */}





      <h3
        className="
          mt-5
          flex
          items-center
          gap-3
          text-lg
          font-bold
          text-white
        "
      >
        <Bell className="h-5 w-5 text-pink-400" />
        {notice.title}
      </h3>








      <p

        className="
          mt-3
          text-sm
          leading-relaxed
          text-zinc-400
        "

      >

        {notice.message}


      </p>









      {/* Acciones */}





      <div

        className="
          mt-5
          flex
          items-center
          gap-4
        "

      >





        <NoticeReactions


          noticeId={notice.id}


          reactions={notice.reactions}


          userId={userId}


        />






        <NoticeComments


          noticeId={notice.id}


          comments={notice.comments}


          userId={userId}


          canDelete={canDelete}


        />





      </div>









      {/* Eliminar aviso */}





      {canDelete && (



        <form

          action={deleteStaffNotice}

          className="mt-5"

        >




          <input

            type="hidden"

            name="id"

            value={notice.id}

          />







          <button
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-500/20
              px-4
              py-2
              text-sm
              text-red-300
              transition
              hover:bg-red-500/30
            "
          >
            <Trash2 className="h-4 w-4" />
            Eliminar aviso
          </button>





        </form>



      )}






    </article>


  );


}