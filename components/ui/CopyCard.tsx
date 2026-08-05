"use client";

import { useState } from "react";
import Button from "./Button";

interface CopyCardProps {
  title: string;
  value: string;
  buttonText?: string;
}

export default function CopyCard({
  title,
  value,
  buttonText = "Copiar",
}: CopyCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      console.error("No se pudo copiar.");
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-pink-500/40 hover:bg-white/10">
      <h3 className="mb-4 text-lg font-semibold text-white">
        {title}
      </h3>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <code className="rounded-lg bg-black/40 px-3 py-2 text-pink-400">
          {value}
        </code>

        <Button size="sm" onClick={handleCopy}>
          {buttonText}
        </Button>
      </div>

      <div className="mt-3 h-5">
        {copied && (
          <p className="text-sm text-green-400">
            ✓ Copiado al portapapeles
          </p>
        )}
      </div>
    </div>
  );
}