import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ShieldCheck, Wifi } from "lucide-react";
import PunishmentForm from "../../components/PunishmentForm";


export default async function PlayerPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {


  const { username } = await params;




  const player = await prisma.player.findUnique({

    where: {
      username,
    },

    include: {
      punishments: true,
    },

  });





  if (!player) {

    notFound();

  }







  return (

    <main className="px-6 py-10 text-white">


      <div
        className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          p-10
          backdrop-blur-3xl
        "
      >





        {/* Perfil */}


        <div className="flex items-center gap-6">



          <Image
            src={`https://mc-heads.net/avatar/${player.username}/128`}
            alt={player.username}
            width={128}
            height={128}
            className="rounded-2xl"
          />




          <div>


            <p
              className="
                text-xs
                uppercase
                tracking-[0.4em]
                text-pink-400
              "
            >
              Perfil del jugador
            </p>



            <h1 className="mt-3 text-4xl font-bold">
              {player.username}
            </h1>



            <p className="mt-2 flex items-center gap-2 text-green-400">
              <Wifi className="h-4 w-4" /> Registrado en la network
            </p>



          </div>


        </div>









        {/* Información */}


        <div
          className="
            mt-10
            grid
            gap-5
            md:grid-cols-3
          "
        >



          <Info
            title="UUID"
            value={player.uuid}
          />



          <Info
            title="Primera conexión"
            value={
              player.firstJoin
                ? player.firstJoin.toLocaleDateString()
                : "Desconocida"
            }
          />



          <Info
            title="Último acceso"
            value={
              player.lastLogin
                ? player.lastLogin.toLocaleDateString()
                : "Desconocido"
            }
          />



        </div>









        {/* Historial de sanciones */}


        <div
          className="
            mt-10
            rounded-2xl
            border
            border-white/10
            bg-black/20
            p-6
          "
        >



          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-pink-400" />
            Historial de sanciones
          </h2>







          {player.punishments.length === 0 ? (



            <p className="mt-3 text-zinc-400">
              Este jugador no tiene sanciones.
            </p>



          ) : (




            <div className="mt-5 space-y-3">






              {player.punishments.map((punishment: {

                id: string;

                type: string;

                reason: string;

                duration: string | null;

                staff: string;

                createdAt: Date;

                playerId: string;

              }) => (



                <div
                  key={punishment.id}
                  className="
                    rounded-xl
                    border
                    border-white/10
                    p-4
                  "
                >



                  <p className="font-bold">
                    {punishment.type}
                  </p>




                  <p className="text-zinc-400">
                    {punishment.reason}
                  </p>




                  <p className="text-sm text-zinc-500">
                    Duración: {punishment.duration}
                  </p>




                  <p className="text-sm text-zinc-500">
                    Staff: {punishment.staff}
                  </p>




                </div>



              ))}





            </div>




          )}







          {/* Crear sanción */}



          <PunishmentForm
            username={player.username}
          />



        </div>





      </div>


    </main>

  );

}








function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {



  return (


    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-black/20
        p-5
      "
    >



      <p
        className="
          text-xs
          uppercase
          tracking-wider
          text-zinc-500
        "
      >
        {title}
      </p>




      <p className="mt-2 break-all text-sm">
        {value}
      </p>




    </div>


  );

}