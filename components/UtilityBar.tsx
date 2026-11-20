"use client";

import { Truck } from "lucide-react";
import { useStore } from "@/lib/store";

function Segmented<T extends string>({ value, options, onChange, label }: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full bg-white/10 p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold transition ${
            value === o.value ? "bg-white text-navy" : "text-white/80 hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function UtilityBar() {
  const { t, lang, setLang, currency, setCurrency, showToast } = useStore();
  return (
    <div className="bg-navy text-[12px] text-white/85">
      <div className="mx-auto flex h-9 max-w-site items-center gap-3 px-3 sm:px-4">
        <p className="hidden min-w-0 items-center gap-1.5 truncate md:flex">
          <Truck className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
          <span className="truncate">{t("promoBar")}</span>
        </p>
        <nav className="ml-auto flex items-center gap-3 sm:gap-4">
          <a href="#" className="hidden whitespace-nowrap hover:text-white lg:inline">{t("sellOn")}</a>
          <button type="button" onClick={() => showToast(t("accountDemo"))} className="hidden whitespace-nowrap hover:text-white sm:inline">
            {t("trackOrder")}
          </button>
          <a href="#footer" className="hidden whitespace-nowrap hover:text-white lg:inline">{t("customerCare")}</a>
          <a href="#footer" className="hidden whitespace-nowrap hover:text-white md:inline">{t("downloadApp")}</a>
          <Segmented
            label="Language"
            value={lang}
            onChange={setLang}
            options={[{ value: "en", label: "EN" }, { value: "km", label: "ខ្មែរ" }]}
          />
          <Segmented
            label="Currency"
            value={currency}
            onChange={setCurrency}
            options={[{ value: "USD", label: "$ USD" }, { value: "KHR", label: "៛ KHR" }]}
          />
        </nav>
      </div>
    </div>
  );
}
