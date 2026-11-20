"use client";

import { Truck } from "lucide-react";
import { serviceImages } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { SmartImage } from "./ui";

/** The four service tiles under the hero (Lazada: LazMall / Free & Fast / Brands / Blog). */
export default function ServiceTiles() {
  const { t, browse, showToast } = useStore();
  const tiles: { label: string; labelTone: string; title: DictKey; visual: React.ReactNode; onClick: () => void }[] = [
    {
      label: t("mallTitle"),
      labelTone: "bg-navy text-white",
      title: "svc.mall",
      visual: <SmartImage src={serviceImages.mall} alt="" className="h-full w-full object-cover" />,
      onClick: () => browse({ channel: "mall" }),
    },
    {
      label: t("ch.freeship"),
      labelTone: "bg-jade-600 text-white",
      title: "svc.delivery",
      visual: (
        <span className="grid h-full w-full place-items-center bg-gradient-to-br from-jade-400 to-jade-700">
          <Truck className="h-8 w-8 text-white" aria-hidden />
        </span>
      ),
      onClick: () => browse({ channel: "freeship" }),
    },
    {
      label: t("officialStore"),
      labelTone: "bg-brand text-white",
      title: "svc.brands",
      visual: <SmartImage src={serviceImages.brands} alt="" className="h-full w-full object-cover" />,
      onClick: () => document.getElementById("mall")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    },
    {
      label: t("svc.blogLabel"),
      labelTone: "bg-lotus-700 text-white",
      title: "svc.blog",
      visual: <SmartImage src={serviceImages.blog} alt="" className="h-full w-full object-cover" />,
      onClick: () => showToast(t("blogDemo")),
    },
  ];

  return (
    <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {tiles.map((tile) => (
        <li key={tile.title}>
          <button
            type="button"
            onClick={tile.onClick}
            className="flex h-[88px] w-full items-center justify-between gap-2 rounded-md bg-white p-3 text-left transition hover:shadow-[0_6px_18px_rgba(0,0,0,.08)]"
          >
            <span className="min-w-0">
              <span className={`inline-block rounded-sm px-1.5 py-px text-[10px] font-bold ${tile.labelTone}`}>{tile.label}</span>
              <span className="mt-1 line-clamp-2 block text-[13px] font-semibold leading-tight text-gray-800 sm:text-[14px]">{t(tile.title)}</span>
            </span>
            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-md bg-canvas sm:h-16 sm:w-16">{tile.visual}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
