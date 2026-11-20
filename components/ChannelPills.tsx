"use client";

import type { ComponentType } from "react";
import { BadgeCheck, Globe, Tag, Ticket, Truck, Zap } from "lucide-react";
import type { DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export default function ChannelPills() {
  const { t, browse, showToast } = useStore();
  const pills: { key: DictKey; sub?: DictKey; Ico: Icon; tone: string; onClick: () => void }[] = [
    { key: "ch.freeship", Ico: Truck, tone: "bg-emerald-50 text-emerald-600", onClick: () => browse({ channel: "freeship" }) },
    { key: "ch.mall", sub: "ch.mallSub", Ico: BadgeCheck, tone: "bg-indigo-50 text-navy", onClick: () => browse({ channel: "mall" }) },
    { key: "ch.vouchers", Ico: Ticket, tone: "bg-brand-50 text-brand", onClick: () => showToast(t("voucherToast")) },
    { key: "ch.topup", Ico: Zap, tone: "bg-amber-50 text-amber-600", onClick: () => showToast(t("topupDemo")) },
    { key: "ch.under5", Ico: Tag, tone: "bg-rose-50 text-rose-600", onClick: () => browse({ channel: "under5" }) },
    { key: "ch.global", Ico: Globe, tone: "bg-sky-50 text-sky-600", onClick: () => browse({ channel: "global" }) },
  ];

  return (
    <nav aria-label="Shortcuts" className="rounded-md bg-white p-2">
      <ul className="no-scrollbar flex gap-1 overflow-x-auto sm:grid sm:grid-cols-6">
        {pills.map(({ key, sub, Ico, tone, onClick }) => (
          <li key={key} className="min-w-[78px] flex-1">
            <button type="button" onClick={onClick} className="flex w-full flex-col items-center gap-1.5 rounded-md px-1 py-2 transition hover:bg-canvas">
              <span className={`grid h-11 w-11 place-items-center rounded-full ${tone}`}>
                <Ico className="h-5 w-5" aria-hidden />
              </span>
              <span className="line-clamp-2 text-center text-[12px] leading-tight text-gray-700">{t(key)}</span>
              {sub && <span className="-mt-1 text-[10px] font-medium text-navy">{t(sub)}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
