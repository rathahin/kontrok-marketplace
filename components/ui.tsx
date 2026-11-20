"use client";

import { useState } from "react";
import Link from "next/link";
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
    <Link href="/" className="flex shrink-0 items-center gap-1.5" aria-label="Kontrok.com home">
      {/* Kontrok K-bag mark (white bag, gold handle) on brand blue — same as the app icon */}
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-brand p-[5px] shadow-sm sm:h-10 sm:w-10 sm:rounded-[11px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/logo-mark.png" alt="" width={40} height={40} className="h-full w-full" />
      </span>
      <span className={`${compact ? "hidden sm:inline" : "inline"} text-[21px] font-extrabold tracking-tight text-brand sm:text-[23px]`}>
        Kontrok<span className="text-gold-600">.com</span>
      </span>
    </Link>
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
    <span className="mr-1 inline-flex -translate-y-px items-center rounded-sm border border-jade-200 bg-jade-50 px-1 align-middle text-[10px] font-semibold leading-[13px] text-jade-700">
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
          className={i < filled ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}
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
