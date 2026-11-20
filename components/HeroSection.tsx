"use client";

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import {
  ArrowRight, Car, ChevronLeft, ChevronRight, Dumbbell, Gem, QrCode, Shirt, ShoppingBasket, Smartphone, Sofa, Sparkles, Truck,
} from "lucide-react";
import { categories, heroImages, type CategoryId } from "@/lib/data";
import type { DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { SmartImage } from "./ui";

type Icon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const CAT_ICONS: Record<CategoryId, Icon> = {
  electronics: Smartphone,
  beauty: Sparkles,
  home: Sofa,
  men: Shirt,
  women: Gem,
  sports: Dumbbell,
  auto: Car,
  groceries: ShoppingBasket,
};

/** Desktop multi-level category menu with a hover flyout over the carousel. */
function CategoryMenu({ hovered, setHovered }: { hovered: CategoryId | null; setHovered: (c: CategoryId | null) => void }) {
  const { t, browse } = useStore();
  const cat = categories.find((c) => c.id === hovered);

  return (
    <>
      <nav aria-label={t("categories")} className="hidden h-[344px] rounded-md bg-white py-1.5 lg:block">
        <ul>
          {categories.map(({ id }) => {
            const Ico = CAT_ICONS[id];
            return (
              <li key={id}>
                <button
                  type="button"
                  onMouseEnter={() => setHovered(id)}
                  onFocus={() => setHovered(id)}
                  onClick={() => browse({ category: id })}
                  aria-expanded={hovered === id}
                  className={`flex h-[41px] w-full items-center gap-2.5 px-3.5 text-left text-[13px] transition ${
                    hovered === id ? "bg-brand-50 text-brand" : "text-gray-700 hover:text-brand"
                  }`}
                >
                  <Ico className="h-4 w-4 shrink-0" aria-hidden />
                  <span className="truncate">{t(`cat.${id}` as DictKey)}</span>
                  <ChevronRight className={`ml-auto h-3.5 w-3.5 shrink-0 ${hovered === id ? "opacity-100" : "opacity-30"}`} aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {cat && (
        <div className="absolute bottom-0 left-[232px] right-0 top-0 z-30 hidden rounded-md bg-white p-6 shadow-[0_12px_40px_rgba(15,19,109,.18)] animate-fade-in lg:block">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-gray-900">{t(`cat.${cat.id}` as DictKey)}</h3>
            <button type="button" onClick={() => browse({ category: cat.id })} className="flex items-center gap-1 text-[13px] font-medium text-brand hover:underline">
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
                      <button type="button" onClick={() => browse({ query: item })} className="text-[13px] text-gray-600 hover:text-brand">
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
    </>
  );
}

interface Slide {
  key: "h1" | "h2" | "h3" | "h4";
  bg: string;
  cta: () => void;
  visual: React.ReactNode;
}

function ProductStack({ images }: { images: string[] }) {
  // 3rd card only on wide screens, so the stack never runs into the headline.
  const rot = ["-rotate-6", "rotate-3 -ml-8 mt-10", "-rotate-2 -ml-8 hidden xl:block"];
  return (
    <div className="flex items-start">
      {images.map((src, i) => (
        <div key={src} className={`h-[112px] w-[112px] overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl lg:h-[140px] lg:w-[140px] ${rot[i]}`}>
          <SmartImage src={src} alt="" className="h-full w-full rounded-xl object-cover" />
        </div>
      ))}
    </div>
  );
}

function IconBadge({ Ico }: { Ico: Icon }) {
  return (
    <div className="grid h-[150px] w-[150px] place-items-center rounded-full bg-white/15 ring-8 ring-white/10 lg:h-[190px] lg:w-[190px]">
      <Ico className="h-16 w-16 text-white lg:h-20 lg:w-20" aria-hidden />
    </div>
  );
}

function Carousel() {
  const { t, browse, showToast } = useStore();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);

  const slides: Slide[] = [
    { key: "h1", bg: "bg-gradient-to-br from-[#FF8A1E] via-brand to-[#D9261C]", cta: () => browse({}), visual: <ProductStack images={heroImages.sale} /> },
    { key: "h2", bg: "bg-gradient-to-br from-navy via-[#1E2490] to-[#3B3FC4]", cta: () => browse({ channel: "freeship" }), visual: <IconBadge Ico={Truck} /> },
    { key: "h3", bg: "bg-gradient-to-br from-navy-900 via-[#2A1A5E] to-[#6B1E8C]", cta: () => browse({ channel: "mall" }), visual: <ProductStack images={heroImages.mall} /> },
    { key: "h4", bg: "bg-gradient-to-br from-[#E1232E] to-[#8A0E1D]", cta: () => showToast(t("voucherToast")), visual: <IconBadge Ico={QrCode} /> },
  ];
  const n = slides.length;
  const go = useCallback((i: number) => setIndex(((i % n) + n) % n), [n]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % n), 4500);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions"
      className="group relative h-[168px] overflow-hidden rounded-md sm:h-[240px] lg:h-[344px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div
            key={s.key}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${n}`}
            aria-hidden={i !== index}
            className={`relative flex h-full w-full shrink-0 items-center overflow-hidden px-5 sm:px-10 ${s.bg}`}
          >
            <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-28 right-40 h-60 w-60 rounded-full bg-white/[.07]" />
            <div className="relative z-10 max-w-[62%] text-white sm:max-w-[52%] xl:max-w-[48%]">
              <span className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider sm:text-[11px]">
                {t(`${s.key}.eyebrow` as DictKey)}
              </span>
              <h2 className="mt-1.5 text-[22px] font-extrabold leading-[1.1] sm:mt-3 sm:text-[34px] lg:text-[42px]">
                {t(`${s.key}.title` as DictKey)}
              </h2>
              <p className="mt-1 line-clamp-2 text-[12px] text-white/85 sm:mt-2 sm:text-[16px]">{t(`${s.key}.sub` as DictKey)}</p>
              <button
                type="button"
                tabIndex={i === index ? 0 : -1}
                onClick={s.cta}
                className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[12px] font-bold text-gray-900 shadow-md transition hover:scale-[1.03] sm:mt-5 sm:px-5 sm:py-2.5 sm:text-[14px]"
              >
                {t(`${s.key}.cta` as DictKey)} <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 sm:block lg:right-12">{s.visual}</div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label={t("prevSlide")}
        className="absolute left-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-gray-800 opacity-0 shadow transition hover:bg-white group-hover:opacity-100 focus-visible:opacity-100 sm:grid"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label={t("nextSlide")}
        className="absolute right-3 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-gray-800 opacity-0 shadow transition hover:bg-white group-hover:opacity-100 focus-visible:opacity-100 sm:grid"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>

      <div className="absolute bottom-2.5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => go(i)}
            aria-label={t("goToSlide", { n: i + 1 })}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </section>
  );
}

export default function HeroSection() {
  // Owned here so leaving the whole hero (incl. the gap to the flyout) closes it.
  const [hovered, setHovered] = useState<CategoryId | null>(null);
  return (
    <section
      className="relative grid gap-3 lg:grid-cols-[220px_1fr]"
      onMouseLeave={() => setHovered(null)}
      onKeyDown={(e) => e.key === "Escape" && setHovered(null)}
    >
      <CategoryMenu hovered={hovered} setHovered={setHovered} />
      <Carousel />
    </section>
  );
}
