"use client";

import { BadgeCheck, ChevronRight } from "lucide-react";
import { mallImage, mallStores } from "@/lib/data";
import { useStore } from "@/lib/store";
import { SectionTitle, SmartImage } from "./ui";

const LOGO_TONES = ["bg-amber-600", "bg-emerald-600", "bg-gray-900", "bg-rose-600", "bg-teal-600", "bg-orange-700"];

/** Official brand stores — mirrors Lazada's LazMall strip. */
export default function MallSection() {
  const { t, browse } = useStore();
  return (
    <section id="mall" aria-labelledby="mall-title" style={{ scrollMarginTop: "calc(var(--header-h, 64px) + 8px)" }}>
      <div className="flex items-end justify-between">
        <SectionTitle id="mall-title">{t("mallTitle")}</SectionTitle>
        <button type="button" onClick={() => browse({ channel: "mall" })} className="mb-2 flex items-center gap-0.5 text-[13px] font-semibold uppercase text-brand hover:underline">
          {t("shopMore")} <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
      <ul className="grid grid-cols-3 gap-2 rounded-md bg-white p-2 sm:grid-cols-6 sm:gap-3 sm:p-3">
        {mallStores.map((s, i) => (
          <li key={s.name}>
            <button type="button" onClick={() => browse({ query: s.name })} className="group w-full rounded-md p-1 text-center transition hover:bg-canvas">
              <span className="relative block aspect-square overflow-hidden rounded-md bg-canvas">
                <SmartImage src={mallImage(s.img)} alt="" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]" />
              </span>
              <span className={`relative mx-auto -mt-5 grid h-10 w-10 place-items-center rounded-full border-2 border-white text-[13px] font-black text-white shadow ${LOGO_TONES[i % LOGO_TONES.length]}`}>
                {s.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <span className="mt-1 flex items-center justify-center gap-1 text-[13px] font-semibold text-gray-900">
                <span className="truncate">{s.name}</span>
                <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-navy" aria-label={t("officialStore")} />
              </span>
              <span className="block truncate text-[11px] text-gray-500">{s.tagline}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
