"use client";

import Link from "next/link";
import { Eye, MapPin, Star } from "lucide-react";
import type { Product } from "@/lib/data";
import { compact, discountPct } from "@/lib/format";
import type { DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { BadgePill, SmartImage } from "./ui";

export default function ProductCard({ p }: { p: Product }) {
  const { t, price, openQuickView } = useStore();
  const off = discountPct(p.price, p.originalPrice);

  return (
    <div className="group relative">
    <Link
      href={`/product/${p.id}`}
      className="flex h-full flex-col overflow-hidden rounded-md border border-transparent bg-white text-left transition hover:border-line hover:shadow-[0_6px_18px_rgba(0,0,0,.08)]"
    >
      <div className="relative aspect-square overflow-hidden bg-canvas">
        <SmartImage
          src={p.image}
          alt={p.title}
          label={p.title.split(" ").slice(0, 2).join(" ")}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2">
        <h3 className="line-clamp-2 min-h-[36px] text-[13px] leading-[18px] text-gray-800">
          {p.badge && <BadgePill badge={p.badge} />}
          {p.title}
        </h3>
        <div className="tabular text-[17px] font-semibold leading-tight text-brand">{price(p.price)}</div>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className="tabular text-gray-400 line-through">{price(p.originalPrice)}</span>
          <span className="font-medium text-gray-700">-{off}%</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-1 pt-1 text-[11px] text-gray-500">
          <span className="flex min-w-0 items-center gap-0.5" aria-label={`${p.rating} out of 5, ${p.reviews} reviews`}>
            <Star className="h-3 w-3 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
            <span className="tabular truncate">({p.rating} • {compact(p.reviews)})</span>
          </span>
          <span className="flex shrink-0 items-center gap-0.5">
            <MapPin className="hidden h-3 w-3 sm:block" aria-hidden />
            {t(`loc.${p.location}` as DictKey)}
          </span>
        </div>
      </div>
    </Link>
    <button
      type="button"
      onClick={() => openQuickView(p)}
      className="absolute left-1/2 top-[calc(50%-60px)] hidden -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-semibold text-gray-800 opacity-0 shadow-md transition hover:text-brand focus-visible:opacity-100 group-hover:opacity-100 lg:flex"
    >
      <Eye className="h-3.5 w-3.5" aria-hidden /> {t("quickView")}
    </button>
    </div>
  );
}
