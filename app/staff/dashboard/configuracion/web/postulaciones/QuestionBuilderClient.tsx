"use client";

import { useState } from "react";
import { Plus, Trash2, HelpCircle, AlignLeft, List, CheckSquare } from "lucide-react";

export type Question = {
  id: string;
  label: string;
  type: "text" | "choice";
  options: string;
  required: boolean;
};

export default function QuestionBuilderClient({
  initialJson,
}: {
  initialJson?: string;
}) {
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      if (initialJson) {
        const parsed = JSON.parse(initialJson);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error parsing initial questions json", e);
    }
    return [
      {
        id: "q_1",
        label: "Experiencia Previa en Staff (Opcional)",
        type: "text",
        options: "",
        required: false,
      },
      {
        id: "q_2",
        label: "¿Por qué te gustaría formar parte del equipo de Miyobi?",
        type: "text",
        options: "",
        required: true,
      },
      {
        id: "q_3",
        label: "Situación: ¿Cómo actuarías si ves a un jugador usando hacks o tóxico?",
        type: "text",
        options: "",
        required: true,
      },
    ];
  });

  const addQuestion = () => {
    const newId = `q_${Date.now()}`;
    setQuestions((prev) => [
      ...prev,
      {
        id: newId,
        label: `Nueva Pregunta ${prev.length + 1}`,
        type: "text",
        options: "",
        required: true,
      },
    ]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, key: keyof Question, val: any) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [key]: val } : q))
    );
  };

  return (
    <div className="space-y-6">
      {/* Hidden Input for Form Submission */}
      <input
        type="hidden"
        name="application_questions_json"
        value={JSON.stringify(questions)}
      />

      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle size={18} className="text-emerald-400" /> Constructor Dinámico de Preguntas
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Añade, edita o elimina preguntas. Elige entre respuestas Abiertas (texto) o Cerradas (opción múltiple).
          </p>
        </div>

        <button
          type="button"
          onClick={addQuestion}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-300 hover:bg-emerald-500 hover:text-white transition duration-200 shadow-lg shadow-emerald-500/10 active:scale-95"
        >
          <Plus size={16} /> Agregar Pregunta
        </button>
      </div>

      {/* QUESTIONS CARDS LIST */}
      <div className="space-y-4">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="group relative rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-xl transition duration-200 hover:border-emerald-500/30 space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[10px]">
                  {index + 1}
                </span>
                Pregunta #{index + 1}
              </span>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={q.required}
                    onChange={(e) => updateQuestion(q.id, "required", e.target.checked)}
                    className="rounded border-white/20 bg-black/50 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Obligatoria</span>
                </label>

                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition"
                    title="Eliminar pregunta"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Enunciado de la Pregunta */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Enunciado de la Pregunta
              </label>
              <input
                type="text"
                value={q.label}
                onChange={(e) => updateQuestion(q.id, "label", e.target.value)}
                placeholder="Ej: ¿Qué conocimientos de comandos tienes?"
                className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 outline-none focus:border-emerald-500 transition"
              />
            </div>

            {/* Tipo de Pregunta: Abierta vs Cerrada */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                  Tipo de Respuesta
                </label>
                <select
                  value={q.type}
                  onChange={(e) => updateQuestion(q.id, "type", e.target.value as "text" | "choice")}
                  className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2.5 text-xs text-white outline-none focus:border-emerald-500 transition"
                >
                  <option value="text" className="bg-[#09090b]">Abierta (Texto libre de varias líneas)</option>
                  <option value="choice" className="bg-[#09090b]">Cerrada (Opción Múltiple / Desplegable)</option>
                </select>
              </div>

              {/* Si es cerrada, mostrar campo de opciones */}
              {q.type === "choice" && (
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                    Opciones (Separadas por Comas)
                  </label>
                  <input
                    type="text"
                    value={q.options}
                    onChange={(e) => updateQuestion(q.id, "options", e.target.value)}
                    placeholder="Ej: Sí tengo mic, No tengo mic, Puedo conseguir"
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2.5 text-xs text-emerald-300 font-mono placeholder-zinc-600 outline-none focus:border-emerald-500 transition"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={addQuestion}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/5 py-3.5 text-xs font-bold text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-300 transition duration-200"
        >
          <Plus size={16} /> Añadir Otra Pregunta al Formulario
        </button>
      </div>
    </div>
  );
}
