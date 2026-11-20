"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Minus, Plus, ShieldCheck, Truck, X } from "lucide-react";
import type { Product } from "@/lib/data";
import { compact, discountPct } from "@/lib/format";
import type { DictKey } from "@/lib/i18n";
import { useScrollLock, useStore } from "@/lib/store";
import { BadgePill, SmartImage, Stars } from "./ui";

export function Stepper({ value, max, onChange }: { value: number; max: number; onChange: (n: number) => void }) {
  const { t } = useStore();
  const btn = "grid h-8 w-8 place-items-center border border-line text-gray-700 transition hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="flex items-center">
      <button type="button" className={`${btn} rounded-l`} onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={t("decrease")}>
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <span className="tabular grid h-8 w-11 place-items-center border-y border-line text-[14px]" aria-live="polite">{value}</span>
      <button type="button" className={`${btn} rounded-r`} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={t("increase")}>
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}

function QuickView({ p, onClose }: { p: Product; onClose: () => void }) {
  const { t, price, addToCart, setCartOpen, showToast } = useStore();
  const [color, setColor] = useState(p.colors?.[0]?.name);
  const [size, setSize] = useState(p.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const closeRef = useRef<HTMLButtonElement>(null);
  const off = discountPct(p.price, p.originalPrice);
  const loc = t(`loc.${p.location}` as DictKey);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const add = (buyNow: boolean) => {
    addToCart(p, { color, size }, qty);
    onClose();
    if (buyNow) setCartOpen(true);
    else showToast(t("added"));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button type="button" tabIndex={-1} aria-label={t("close")} onClick={onClose} className="absolute inset-0 bg-black/50 animate-fade-in" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="qv-title"
        className="relative grid max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl animate-pop-in sm:max-w-[880px] sm:grid-cols-[1fr_1.1fr] sm:rounded-xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>

        <div className="aspect-square bg-canvas sm:aspect-auto">
          <SmartImage src={p.image.replace("w=400&h=400", "w=800&h=800")} alt={p.title} className="h-full w-full object-cover" />
        </div>

        <div className="flex flex-col gap-3.5 p-5 sm:p-6">
          <h2 id="qv-title" className="pr-8 text-[17px] font-semibold leading-snug text-gray-900">
            {p.badge && <BadgePill badge={p.badge} />}
            {p.title}
          </h2>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-gray-500">
            <Stars rating={p.rating} />
            <span className="font-medium text-gray-700">{p.rating}</span>
            <span>• {t("reviewsTpl", { n: compact(p.reviews) })}</span>
            <span>• {t("soldTpl", { n: compact(p.sold) })}</span>
          </div>

          <div className="rounded-md bg-canvas px-4 py-3">
            <div className="tabular text-[28px] font-semibold leading-tight text-brand">{price(p.price)}</div>
            <div className="mt-0.5 flex items-center gap-2 text-[13px]">
              <span className="tabular text-gray-400 line-through">{price(p.originalPrice)}</span>
              <span className="rounded-sm bg-brand-50 px-1.5 font-semibold text-brand">-{off}%</span>
            </div>
          </div>

          {p.colors && (
            <fieldset>
              <legend className="mb-2 text-[13px] text-gray-500">
                {t("color")}: <span className="font-medium text-gray-900">{color}</span>
              </legend>
              <div className="flex flex-wrap gap-2.5">
                {p.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    onClick={() => setColor(c.name)}
                    className={`h-8 w-8 rounded-full border border-black/10 transition ${color === c.name ? "ring-2 ring-brand ring-offset-2" : "hover:scale-110"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {p.sizes && (
            <fieldset>
              <legend className="mb-2 text-[13px] text-gray-500">{t("size")}</legend>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={size === s}
                    onClick={() => setSize(s)}
                    className={`min-w-[44px] rounded border px-3 py-1.5 text-[13px] transition ${
                      size === s ? "border-brand bg-brand-50 font-medium text-brand" : "border-line text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div>
            <p className="mb-2 text-[13px] text-gray-500">{t("quantity")}</p>
            <div className="flex items-center gap-3">
              <Stepper value={qty} max={p.stock} onChange={setQty} />
              <span className="text-[12px] text-gray-500">{t("availableTpl", { n: p.stock })}</span>
            </div>
          </div>

          <ul className="space-y-1.5 border-t border-line pt-3 text-[12px] text-gray-600">
            <li className="flex items-center gap-2">
              {p.location === "overseas" ? <MapPin className="h-4 w-4 text-gray-400" aria-hidden /> : <Truck className="h-4 w-4 text-emerald-600" aria-hidden />}
              {t("shipsFrom", { loc, days: t(p.location === "overseas" ? "daysOverseas" : "daysLocal") })}
            </li>
            {p.badge === "mall" && (
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-navy" aria-hidden /> {t("authentic")}
              </li>
            )}
          </ul>

          <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
            <button type="button" onClick={() => add(true)} className="rounded-md bg-navy py-3 text-[14px] font-semibold text-white transition hover:bg-navy-700">
              {t("buyNow")}
            </button>
            <button type="button" onClick={() => add(false)} className="rounded-md bg-brand py-3 text-[14px] font-semibold text-white transition hover:bg-brand-600">
              {t("addToCart")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuickViewModal() {
  const { quickView, closeQuickView } = useStore();
  useScrollLock(!!quickView);
  // Keyed by product so variant/qty state resets when a different product opens.
  return quickView ? <QuickView key={quickView.id} p={quickView} onClose={closeQuickView} /> : null;
}
