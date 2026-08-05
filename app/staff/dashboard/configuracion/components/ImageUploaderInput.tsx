"use client";

import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";

interface ImageUploaderInputProps {
  name: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
}

export default function ImageUploaderInput({
  name,
  defaultValue = "",
  label,
  placeholder = "https://... o selecciona un archivo",
}: ImageUploaderInputProps) {
  const [value, setValue] = useState<string>(defaultValue);
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCompressing, setIsCompressing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const maxWidth = 1280;
      const maxHeight = 720;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width / height > maxWidth / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        // Comprimir a WEBP/JPEG a 80% de calidad para optimizar carga a la DB y Vercel
        const compressedDataUrl = canvas.toDataURL("image/webp", 0.8);
        setValue(compressedDataUrl);
      } else {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) setValue(ev.target.result as string);
        };
        reader.readAsDataURL(file);
      }
      setIsCompressing(false);
    };

    img.onerror = () => {
      setIsCompressing(false);
      alert("No se pudo procesar la imagen seleccionada.");
    };

    img.src = objectUrl;
  };

  const handleClear = () => {
    setValue("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5">
            <ImageIcon size={14} className="text-pink-400" />
            {label}
          </label>

          <div className="flex items-center gap-1 text-[11px]">
            <button
              type="button"
              onClick={() => setMode("upload")}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                mode === "upload"
                  ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              📁 Subir Archivo
            </button>
            <button
              type="button"
              onClick={() => setMode("url")}
              className={`px-2 py-0.5 rounded-lg font-semibold transition ${
                mode === "url"
                  ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              🔗 URL
            </button>
          </div>
        </div>
      )}

      {/* Input oculto para envío de formulario HTML / Server Actions */}
      <input type="hidden" name={name} value={value} />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
        {mode === "upload" ? (
          <button
            type="button"
            disabled={isCompressing}
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed border-pink-500/40 bg-pink-500/5 px-4 py-3 text-xs font-bold text-pink-300 hover:bg-pink-500/10 hover:border-pink-500 transition cursor-pointer disabled:opacity-50"
          >
            <Upload size={16} className={isCompressing ? "animate-spin" : ""} />
            <span>{isCompressing ? "Optimizando Imagen..." : "Seleccionar / Subir Imagen desde tu Equipo"}</span>
          </button>
        ) : (
          <div className="flex-1 relative">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-2xl border border-white/15 bg-black/40 px-4 py-3 text-xs font-mono text-zinc-300 outline-none focus:border-pink-500 transition"
            />
          </div>
        )}

        {value && (
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-1.5 shrink-0">
            <img
              src={value}
              alt="Vista Previa"
              className="h-9 w-12 rounded-xl object-cover border border-white/10"
            />
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition"
              title="Borrar imagen"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
