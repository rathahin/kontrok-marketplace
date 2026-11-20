"use client";

import { categoryTiles, tileImage } from "@/lib/data";
import { useStore } from "@/lib/store";
import { SectionTitle, SmartImage } from "./ui";

export default function CategoryGrid() {
  const { t, browse } = useStore();
  return (
    <section id="categories" aria-labelledby="cat-title" style={{ scrollMarginTop: "calc(var(--header-h, 64px) + 8px)" }}>
      <SectionTitle id="cat-title">{t("categoriesTitle")}</SectionTitle>
      <ul className="grid grid-cols-4 overflow-hidden rounded-md border-l border-t border-line bg-white sm:grid-cols-8">
        {categoryTiles.map((tile) => (
          <li key={tile.key} className="border-b border-r border-line">
            <button
              type="button"
              onClick={() => browse({ query: tile.query, category: tile.category })}
              className="flex h-full w-full flex-col items-center gap-1.5 px-1 py-3 transition hover:shadow-[inset_0_0_0_1px_#F85606]"
            >
              <span className="h-14 w-14 overflow-hidden rounded-lg bg-canvas sm:h-16 sm:w-16">
                <SmartImage src={tileImage(tile.img)} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="line-clamp-2 min-h-[30px] text-center text-[12px] leading-[15px] text-gray-700">{t(tile.key)}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
