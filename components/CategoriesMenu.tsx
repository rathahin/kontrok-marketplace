"use client";

import { useState, type ComponentType } from "react";
import {
  ArrowRight, Baby, Car, ChevronDown, ChevronRight, Dumbbell, Gem, Headphones, Menu, Shirt, ShoppingBasket, Smartphone, Sofa, Sparkles, Tv, Watch,
} from "lucide-react";
import { categories, type CategoryId } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

export const CAT_ICONS: Record<CategoryId, Icon> = {
  devices: Smartphone,
  accessories: Headphones,
  appliances: Tv,
  beauty: Sparkles,
  babies: Baby,
  groceries: ShoppingBasket,
  home: Sofa,
  women: Gem,
  men: Shirt,
  watches: Watch,
  sports: Dumbbell,
  auto: Car,
};

/** Header "Categories" dropdown: 12 top-level categories with a hover flyout of sub-categories. */
export default function CategoriesMenu() {
  const { t, browse } = useStore();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<CategoryId | null>(null);
  const cat = categories.find((c) => c.id === hovered);
  const close = () => { setOpen(false); setHovered(null); };
  const go = (f: Parameters<typeof browse>[0]) => { close(); browse(f); };

  return (
    <div
      className="relative hidden lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onKeyDown={(e) => e.key === "Escape" && close()}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-10 items-center gap-1.5 rounded-md px-2 text-[14px] font-medium transition ${open ? "text-brand" : "text-gray-700 hover:text-brand"}`}
      >
        <Menu className="h-5 w-5" aria-hidden />
        {t("categories")}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>

      {open && (
        // pt-2 is a hover bridge so the menu doesn't close crossing the gap
        <div className="absolute left-0 top-full z-50 flex pt-2 animate-fade-in">
          <ul className="w-[260px] rounded-l-md border border-line bg-white py-1.5 shadow-[0_12px_40px_rgba(15,19,109,.16)]">
            {categories.map(({ id }) => {
              const Ico = CAT_ICONS[id];
              return (
                <li key={id}>
                  <button
                    type="button"
                    onMouseEnter={() => setHovered(id)}
                    onFocus={() => setHovered(id)}
                    onClick={() => go({ category: id })}
                    className={`flex h-[38px] w-full items-center gap-2.5 px-3.5 text-left text-[13px] ${hovered === id ? "bg-brand-50 text-brand" : "text-gray-700"}`}
                  >
                    <Ico className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="truncate">{t(`cat.${id}` as DictKey)}</span>
                    <ChevronRight className={`ml-auto h-3.5 w-3.5 shrink-0 ${hovered === id ? "opacity-100" : "opacity-30"}`} aria-hidden />
                  </button>
                </li>
              );
            })}
          </ul>
          {cat && (
            <div className="w-[min(600px,calc(100vw-480px))] rounded-r-md border border-l-0 border-line bg-white p-5 shadow-[0_12px_40px_rgba(15,19,109,.16)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[15px] font-semibold text-gray-900">{t(`cat.${cat.id}` as DictKey)}</h3>
                <button type="button" onClick={() => go({ category: cat.id })} className="flex items-center gap-1 text-[13px] font-medium text-brand hover:underline">
                  {t("shopAll")} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {cat.sub.map((g) => (
                  <div key={g.title}>
                    <h4 className="mb-2 text-[13px] font-semibold text-gray-900">{g.title}</h4>
                    <ul className="space-y-1.5">
                      {g.items.map((item) => (
                        <li key={item}>
                          <button type="button" onClick={() => go({ query: item })} className="text-[13px] text-gray-600 hover:text-brand">
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
