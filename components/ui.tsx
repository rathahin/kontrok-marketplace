"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import type { Badge } from "@/lib/data";
import { useStore } from "@/lib/store";

/** <img> with a guaranteed fallback, so a failed remote photo never shows a broken icon. */
export function SmartImage({ src, alt, className, label }: { src: string; alt: string; className?: string; label?: string }) {
  const [failed, setFailed] = useState(false);
  const fallback = `https://placehold.co/400x400/F5F5F5/9CA3AF/png?text=${encodeURIComponent(label ?? "Kontrok")}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={failed ? fallback : src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => !failed && setFailed(true)}
      className={className}
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#" className="flex shrink-0 items-center gap-1.5" aria-label="Kontrok.com home">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-[17px] font-black text-white shadow-sm sm:h-9 sm:w-9 sm:text-[19px]">
        K
      </span>
      <span className={`${compact ? "hidden sm:inline" : "inline"} text-[20px] font-extrabold tracking-tight text-navy sm:text-[22px]`}>
        Kontrok<span className="text-brand">.com</span>
      </span>
    </a>
  );
}

export function BadgePill({ badge }: { badge: Badge }) {
  const { t } = useStore();
  if (badge === "mall")
    return (
      <span className="mr-1 inline-flex -translate-y-px items-center rounded-sm bg-navy px-1 align-middle text-[10px] font-bold leading-[15px] text-white">
        {t("badge.mall")}
      </span>
    );
  return (
    <span className="mr-1 inline-flex -translate-y-px items-center rounded-sm border border-emerald-200 bg-emerald-50 px-1 align-middle text-[10px] font-semibold leading-[13px] text-emerald-700">
      {t("badge.freeship")}
    </span>
  );
}

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  const filled = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-px" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < filled ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mb-2 text-[19px] font-semibold text-gray-800 sm:text-[22px]">
      {children}
    </h2>
  );
}
