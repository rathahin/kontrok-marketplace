"use client";

import { ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";

function Segmented<T extends string>({ value, options, onChange, label }: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full bg-gray-100 p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition ${
            value === o.value ? "bg-navy text-white" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** Full-width campaign banner above everything (Lazada's "Weekly Grab" strip). */
export function CampaignStrip() {
  const { t, browse } = useStore();
  return (
    <button
      type="button"
      onClick={() => browse({})}
      className="group relative block w-full overflow-hidden bg-gradient-to-r from-navy-900 via-navy to-brand text-white"
    >
      {/* Kontrok folk pattern from the app splash */}
      <div className="pointer-events-none absolute inset-0 bg-[url('/brand/pattern.jpg')] bg-[length:220px] bg-center opacity-20 mix-blend-screen" />
      <div className="relative mx-auto flex h-11 max-w-site items-center justify-center gap-3 px-3 sm:h-14 sm:justify-between sm:px-4">
        <span className="flex items-center gap-2">
          <span className="rounded bg-gold px-1.5 py-0.5 text-[10px] font-black tracking-wide text-gray-900 sm:text-[12px]">{t("camp.tag")}</span>
          <span className="hidden text-[11px] font-semibold text-white/80 sm:inline">{t("camp.dates")}</span>
        </span>
        <span className="text-[15px] font-black tracking-tight sm:text-[26px]">{t("camp.deal")}</span>
        <span className="hidden items-center gap-1 rounded-full bg-gold px-3.5 py-1.5 text-[12px] font-bold text-gray-900 transition group-hover:bg-white sm:flex">
          {t("camp.cta")} <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </button>
  );
}

export default function UtilityBar() {
  const { t, lang, setLang, currency, setCurrency, showToast } = useStore();
  const link = "hidden whitespace-nowrap uppercase tracking-wide hover:text-brand";
  return (
    <div className="border-b border-line bg-white text-[11px] text-gray-600">
      <div className="mx-auto flex h-8 max-w-site items-center justify-end gap-4 px-3 sm:px-4">
        <a href="#footer" className={`${link} font-semibold text-lotus-700 lg:inline`}>{t("feedback")}</a>
        <a href="#footer" className={`${link} md:inline`}>{t("saveMoreApp")}</a>
        <a href="#footer" className={`${link} lg:inline`}>{t("sellOn")}</a>
        <a href="#footer" className={`${link} lg:inline`}>{t("customerCare")}</a>
        <button type="button" onClick={() => showToast(t("accountDemo"))} className={`${link} sm:inline`}>{t("trackOrder")}</button>
        <button type="button" onClick={() => showToast(t("accountDemo"))} className={`${link} sm:inline`}>{t("login")}</button>
        <button type="button" onClick={() => showToast(t("accountDemo"))} className={`${link} sm:inline`}>{t("signup")}</button>
        <Segmented label="Language" value={lang} onChange={setLang} options={[{ value: "en", label: "EN" }, { value: "km", label: "ខ្មែរ" }]} />
        <Segmented label="Currency" value={currency} onChange={setCurrency} options={[{ value: "USD", label: "$ USD" }, { value: "KHR", label: "៛ KHR" }]} />
      </div>
    </div>
  );
}
