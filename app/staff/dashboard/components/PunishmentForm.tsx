"use client";

import { useState } from "react";
import { createPunishment } from "./actions";


export default function PunishmentForm({
  username,
}: {
  username: string;
}) {


  const [type, setType] = useState("Ban");
  const [duration, setDuration] = useState("7 días");
  const [reason, setReason] = useState("");



  async function handleSubmit() {

    await createPunishment({
      username,
      type,
      reason,
      duration,
    });


    alert("Sanción guardada correctamente");


    window.location.reload();

  }



  return (

    <div
      className="
        mt-8
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-6
      "
    >

      <h3 className="text-xl font-bold">
        ⚠ Crear sanción
      </h3>


      <div className="mt-5 space-y-4">


        <select
          value={type}
          onChange={(e)=>setType(e.target.value)}
          className="
            w-full
            rounded-xl
            bg-black/30
            border
            border-white/10
            p-3
          "
        >

          <option>Advertencia</option>
          <option>Mute</option>
          <option>Ban</option>

        </select>



        <input
          value={duration}
          onChange={(e)=>setDuration(e.target.value)}
          className="
            w-full
            rounded-xl
            bg-black/30
            border
            border-white/10
            p-3
          "
          placeholder="Duración"
        />



        <textarea
          value={reason}
          onChange={(e)=>setReason(e.target.value)}
          className="
            w-full
            min-h-32
            rounded-xl
            bg-black/30
            border
            border-white/10
            p-3
          "
          placeholder="Motivo"
        />



        <button
          onClick={handleSubmit}
          className="
            w-full
            rounded-xl
            bg-pink-500/20
            py-3
            hover:bg-pink-500/30
          "
        >
          Aplicar sanción
        </button>


      </div>


    </div>

  );

}