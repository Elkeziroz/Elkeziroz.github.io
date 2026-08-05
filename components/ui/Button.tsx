import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-7 py-3 text-base",
    lg: "px-9 py-4 text-lg",
  };

  const variants = {
    primary: `
      bg-gradient-to-r
      from-pink-500
      via-fuchsia-500
      to-pink-500
      bg-[length:200%_100%]
      text-white
      shadow-[0_15px_40px_rgba(236,72,153,.35)]
      hover:bg-right
      hover:scale-105
      hover:shadow-[0_20px_55px_rgba(236,72,153,.5)]
    `,
    secondary: `
      border border-white/20
      bg-white/10
      text-white
      backdrop-blur-2xl
      hover:bg-white/20
      hover:border-white/40
      hover:scale-105
    `,
  };

  const classes = `
    group
    inline-flex
    items-center
    justify-center
    gap-2
    relative
    overflow-hidden
    rounded-2xl
    font-semibold
    tracking-wide
    transition-all
    duration-500
    active:scale-95
    ${sizes[size]}
    ${variants[variant]}
    ${className}
  `;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}

        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>

      {variant === "primary" && (
        <span
          className="
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/25
            to-transparent
            transition-transform
            duration-700
            group-hover:translate-x-full
          "
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}