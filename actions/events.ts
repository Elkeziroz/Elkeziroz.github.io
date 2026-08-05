"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";





export async function createEvent(formData: FormData) {


  const title = formData.get("title") as string;

  const description = formData.get("description") as string;

  const date = formData.get("date") as string;

  const image = formData.get("image") as File | null;



  let imageUrl = null;






  if (image && image.size > 0) {


    const bytes = await image.arrayBuffer();

    const buffer = Buffer.from(bytes);



    const fileName =
      `${Date.now()}-${image.name.replaceAll(" ", "-")}`;



    const filePath =
      path.join(
        process.cwd(),
        "public/uploads/events",
        fileName
      );



    await writeFile(
      filePath,
      buffer
    );



    imageUrl =
      `/uploads/events/${fileName}`;

  }









  await prisma.event.create({

    data: {


      title,


      description,


      date: new Date(date),


      image: imageUrl,



      active: true,



      featured:
        formData.get("featured") === "on",




      discordUrl:
        formData.get("discordUrl")
          ? formData.get("discordUrl") as string
          : null,





      rewards:
        formData.get("rewards")
          ? formData.get("rewards") as string
          : null,






      publishAt:
        formData.get("publishAt")
          ? new Date(
              formData.get("publishAt") as string
            )
          : null,






      endAt:
        formData.get("endAt")
          ? new Date(
              formData.get("endAt") as string
            )
          : null,



    },

  });







  revalidatePath("/");

  revalidatePath(
    "/staff/dashboard/configuracion/eventos"
  );





  redirect(
    "/staff/dashboard/configuracion/eventos"
  );

}













export async function updateEvent(formData: FormData) {


  const id = formData.get("id") as string;


  const title = formData.get("title") as string;


  const description = formData.get("description") as string;


  const date = formData.get("date") as string;




  if (!id || !title || !description || !date) {

    return;

  }







  await prisma.event.update({

    where: {

      id,

    },



    data: {


      title,


      description,


      date: new Date(date),



    },

  });







  revalidatePath("/");

  revalidatePath(
    "/staff/dashboard/configuracion/eventos"
  );





  redirect(
    "/staff/dashboard/configuracion/eventos"
  );

}












export async function deleteEvent(formData: FormData) {


  const id = formData.get("id") as string;



  if (!id) {

    return;

  }






  const event = await prisma.event.findUnique({

    where: {

      id,

    },

  });






  if (!event) {

    return;

  }









  if (event.image) {



    const imagePath = path.join(

      process.cwd(),

      "public",

      event.image

    );



    try {

      await unlink(imagePath);

    } catch {

      console.log(
        "La imagen no existe o ya fue eliminada"
      );

    }


  }









  await prisma.event.delete({

    where: {

      id,

    },

  });








  revalidatePath("/");

  revalidatePath(
    "/staff/dashboard/configuracion/eventos"
  );






  redirect(
    "/staff/dashboard/configuracion/eventos"
  );

}













export async function toggleEventStatus(formData: FormData) {


  const id = formData.get("id") as string;




  if (!id) {

    return;

  }







  const event = await prisma.event.findUnique({

    where: {

      id,

    },

  });







  if (!event) {

    return;

  }









  await prisma.event.update({

    where: {

      id,

    },

    data: {

      active: !event.active,

    },

  });









  revalidatePath("/");

  revalidatePath(
    "/staff/dashboard/configuracion/eventos"
  );







  redirect(
    "/staff/dashboard/configuracion/eventos"
  );

}