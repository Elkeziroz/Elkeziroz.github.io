import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";



const adapter = new PrismaPg({

  connectionString: process.env.DATABASE_URL,

});



const prisma = new PrismaClient({

  adapter,

});





async function main() {


  const players = [

    {
      username: "BryanHG",
      uuid: "921822026077966436",
      firstJoin: new Date(),
      lastLogin: new Date(),
    },


    {
      username: "Steve",
      uuid: "921822026077966437",
      firstJoin: new Date(),
      lastLogin: new Date(),
    },


    {
      username: "Alex",
      uuid: "921822026077966438",
      firstJoin: new Date(),
      lastLogin: new Date(),
    },

  ];





  for (const player of players) {


    await prisma.player.upsert({

      where: {

        username: player.username,

      },


      update: {},


      create: player,


    });


  }





  console.log("✅ Jugadores creados correctamente");


}





main()

  .catch((error) => {

    console.error(error);

    process.exit(1);

  })


  .finally(async () => {

    await prisma.$disconnect();

  });