"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";
import { products } from "@/lib/data";
import { compact, discountPct } from "@/lib/format";
import { useStore } from "@/lib/store";
import { SectionTitle, SmartImage } from "./ui";

/** ms until local midnight, ticking each second. null until mounted (avoids SSR mismatch). */
function useCountdown(): number | null {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      setLeft(Math.max(0, end.getTime() - now.getTime()));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

function Countdown() {
  const left = useCountdown();
  const parts = left === null
    ? ["--", "--", "--"]
    : [Math.floor(left / 3_600_000), Math.floor(left / 60_000) % 60, Math.floor(left / 1000) % 60].map((v) => String(v).padStart(2, "0"));
  return (
    <span className="flex items-center gap-1" role="timer" aria-live="off">
      {parts.map((v, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="tabular min-w-[28px] rounded bg-brand px-1 py-0.5 text-center text-[14px] font-bold text-white">{v}</span>
          {i < 2 && <span className="font-bold text-brand">:</span>}
        </span>
      ))}
    </span>
  );
}

export default function FlashSale() {
  const { t, price, openQuickView, browse } = useStore();
  const deals = useMemo(
    () => [...products].sort((a, b) => discountPct(b.price, b.originalPrice) - discountPct(a.price, a.originalPrice)).slice(0, 6),
    [],
  );

  return (
    <section aria-labelledby="flash-title">
      <SectionTitle id="flash-title">{t("flashSale")}</SectionTitle>
      <div className="rounded-md bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="flex items-center gap-1.5 text-[14px] font-semibold text-brand">
              <Flame className="h-4 w-4 fill-brand" aria-hidden /> {t("onSaleNow")}
            </span>
            <span className="flex items-center gap-2 text-[13px] text-gray-600">
              {t("endsIn")} <Countdown />
            </span>
          </div>
          <button
            type="button"
            onClick={() => browse({})}
            className="rounded border border-brand px-3 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-brand transition hover:bg-brand-50"
          >
            {t("shopAll")}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 lg:grid-cols-6">
          {deals.map((p) => {
            const soldPct = Math.min(96, Math.round((p.sold / (p.sold + p.stock)) * 100));
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => openQuickView(p)}
                className="group flex flex-col rounded-md p-1.5 text-left transition hover:shadow-[0_6px_18px_rgba(0,0,0,.08)]"
              >
                <div className="aspect-square overflow-hidden rounded bg-canvas">
                  <SmartImage src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-2 line-clamp-2 min-h-[36px] text-[13px] leading-[18px] text-gray-800">{p.title}</p>
                <div className="tabular mt-1 text-[17px] font-semibold text-brand">{price(p.price)}</div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="tabular text-gray-400 line-through">{price(p.originalPrice)}</span>
                  <span className="rounded-sm bg-brand-50 px-1 font-semibold text-brand">-{discountPct(p.price, p.originalPrice)}%</span>
                </div>
                <div className="relative mt-2 h-4 overflow-hidden rounded-full bg-brand-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#FF8A1E] to-brand" style={{ width: `${soldPct}%` }} />
                  <span className="absolute inset-0 grid place-items-center text-[10px] font-semibold text-white [text-shadow:0_1px_1px_rgba(0,0,0,.25)]">
                    {t("soldTpl", { n: compact(p.sold) })}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
