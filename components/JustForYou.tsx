"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SearchX, X } from "lucide-react";
import { matchesQuery, products, type Channel, type Product } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import { SectionTitle } from "./ui";

type Tab = "all" | "best" | "top" | "local";
const TABS: { id: Tab; key: DictKey }[] = [
  { id: "all", key: "tabAll" },
  { id: "best", key: "tabBest" },
  { id: "top", key: "tabTop" },
  { id: "local", key: "tabLocal" },
];
const MAX_PAGES = 4;

const CHANNEL_KEY: Record<Channel, DictKey> = {
  freeship: "ch.freeship",
  mall: "ch.mall",
  under5: "ch.under5",
  global: "ch.global",
};

function inChannel(p: Product, c: Channel | null) {
  switch (c) {
    case "freeship": return p.badge === "freeship";
    case "mall": return p.badge === "mall";
    case "under5": return p.price < 5;
    case "global": return p.location === "overseas";
    default: return true;
  }
}

/** Rotate a list so each "page" of the infinite feed reads differently. */
const rotate = <T,>(arr: T[], by: number) => arr.slice(by % arr.length).concat(arr.slice(0, by % arr.length));

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand-50 py-0.5 pl-2.5 pr-1 text-[12px] text-brand">
      {label}
      <button type="button" onClick={onClear} aria-label={`Remove ${label}`} className="grid h-5 w-5 place-items-center rounded-full hover:bg-brand-100">
        <X className="h-3 w-3" aria-hidden />
      </button>
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-md bg-white" aria-hidden>
      <div className="aspect-square animate-pulse bg-gray-100" />
      <div className="space-y-2 p-2">
        <div className="h-3 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-100" />
      </div>
    </div>
  );
}

export default function JustForYou() {
  const { t, query, setQuery, category, setCategory, channel, setChannel, clearFilters } = useStore();
  const [tab, setTab] = useState<Tab>("all");
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    const base = products.filter((p) => matchesQuery(p, query) && (!category || p.category === category) && inChannel(p, channel));
    switch (tab) {
      case "best": return [...base].sort((a, b) => b.sold - a.sold);
      case "top": return base.filter((p) => p.rating >= 4.7).sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
      case "local": return base.filter((p) => p.location !== "overseas");
      default: return base;
    }
  }, [query, category, channel, tab]);

  const filtered = Boolean(query || category || channel);
  // Only the unfiltered "All" feed scrolls forever; filtered views show their exact matches.
  const infinite = tab === "all" && !filtered;

  useEffect(() => { setPages(1); }, [query, category, channel, tab]);

  const items = infinite
    ? Array.from({ length: pages }, (_, pi) => rotate(list, pi * 7).map((p) => ({ p, key: `${p.id}-${pi}` }))).flat()
    : list.map((p) => ({ p, key: p.id }));
  const canLoadMore = infinite && pages < MAX_PAGES;

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !canLoadMore) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || loading) return;
      setLoading(true);
      // Simulated network latency for the next page.
      setTimeout(() => { setPages((p) => p + 1); setLoading(false); }, 600);
    }, { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, [canLoadMore, loading]);

  return (
    <section id="just-for-you" aria-labelledby="jfy-title" style={{ scrollMarginTop: "calc(var(--header-h, 64px) + 8px)" }}>
      <SectionTitle id="jfy-title">{t("justForYou")}</SectionTitle>

      <div className="sticky z-30 -mx-3 bg-canvas/95 px-3 pb-2 pt-1 backdrop-blur sm:mx-0 sm:px-0" style={{ top: "var(--header-h, 64px)" }}>
        <div role="tablist" aria-label={t("justForYou")} className="no-scrollbar flex gap-1 overflow-x-auto rounded-md bg-white px-2 shadow-[0_1px_0_#ECEAE3]">
          {TABS.map(({ id, key }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`shrink-0 border-b-2 px-3 py-2.5 text-[14px] font-medium transition sm:px-5 ${
                tab === id ? "border-brand text-brand" : "border-transparent text-gray-600 hover:text-brand"
              }`}
            >
              {t(key)}
            </button>
          ))}
        </div>
        {filtered && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {query && <Chip label={`"${query}"`} onClear={() => setQuery("")} />}
            {category && <Chip label={t(`cat.${category}` as DictKey)} onClear={() => setCategory(null)} />}
            {channel && <Chip label={t(CHANNEL_KEY[channel])} onClear={() => setChannel(null)} />}
            <span className="text-[12px] text-gray-500">{t("itemsTpl", { n: list.length })}</span>
            <button type="button" onClick={clearFilters} className="text-[12px] font-medium text-brand hover:underline">
              {t("clearAll")}
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-md bg-white px-4 py-14 text-center">
          <SearchX className="h-10 w-10 text-gray-300" aria-hidden />
          <p className="text-[14px] text-gray-600">{t("noProducts")}</p>
          <button type="button" onClick={() => { clearFilters(); setTab("all"); }} className="rounded-md bg-brand px-4 py-2 text-[13px] font-semibold text-white hover:bg-brand-600">
            {t("clearAll")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map(({ p, key }) => <ProductCard key={key} p={p} />)}
          {loading && Array.from({ length: 6 }, (_, i) => <SkeletonCard key={`sk-${i}`} />)}
        </div>
      )}

      <div ref={sentinel} className="h-px" />
      {items.length > 0 && !canLoadMore && (
        <p className="py-6 text-center text-[13px] text-gray-400">{t("end")}</p>
      )}
      {loading && <p className="sr-only" role="status">{t("loading")}</p>}
    </section>
  );
}
