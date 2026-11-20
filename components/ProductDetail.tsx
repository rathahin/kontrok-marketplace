"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Banknote, BadgeCheck, ChevronRight, Heart, MapPin, MessageCircle, RotateCcw, Share2, ShieldCheck, Store, ThumbsUp, Ticket, Truck,
} from "lucide-react";
import {
  galleryFor, products, questionsFor, ratingBreakdown, reviewsFor, sellerStats, type Product,
} from "@/lib/data";
import { compact, discountPct } from "@/lib/format";
import type { DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import ProductCard from "./ProductCard";
import { Stepper } from "./QuickViewModal";
import { BadgePill, SmartImage, Stars } from "./ui";

const box = "rounded-md bg-white";

function Gallery({ p }: { p: Product }) {
  const images = useMemo(() => galleryFor(p), [p]);
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-md bg-canvas">
        <SmartImage src={images[active]} alt={p.title} className="h-full w-full object-cover" />
      </div>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            aria-label={`Image ${i + 1}`}
            aria-pressed={active === i}
            className={`aspect-square overflow-hidden rounded border-2 bg-canvas ${active === i ? "border-brand" : "border-transparent hover:border-line"}`}
          >
            <SmartImage src={src.replace("w=800&h=800", "w=160&h=160")} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function Info({ p }: { p: Product }) {
  const { t, price, addToCart, setCartOpen, showToast, browse } = useStore();
  const [color, setColor] = useState(p.colors?.[0]?.name);
  const [size, setSize] = useState(p.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const off = discountPct(p.price, p.originalPrice);
  const add = (buyNow: boolean) => {
    addToCart(p, { color, size }, qty);
    if (buyNow) setCartOpen(true);
    else showToast(t("added"));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <h1 className="text-[20px] font-medium leading-snug text-gray-900">
          {p.badge && <BadgePill badge={p.badge} />}
          {p.title}
        </h1>
        <div className="flex shrink-0 gap-1 text-gray-400">
          <button type="button" aria-label="Share" onClick={() => showToast("Link copied")} className="grid h-8 w-8 place-items-center rounded-full hover:bg-canvas hover:text-gray-700"><Share2 className="h-[18px] w-[18px]" aria-hidden /></button>
          <button type="button" aria-label="Wishlist" onClick={() => showToast(t("accountDemo"))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-canvas hover:text-brand"><Heart className="h-[18px] w-[18px]" aria-hidden /></button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
        <a href="#reviews" className="flex items-center gap-1.5 text-brand hover:underline">
          <Stars rating={p.rating} /> {t("ratingsTpl", { n: compact(p.reviews) })}
        </a>
        <span className="text-gray-300">|</span>
        <a href="#qna" className="text-brand hover:underline">{t("answeredTpl", { n: 2 })}</a>
      </div>

      <p className="-mt-2 text-[13px] text-gray-500">
        {t("brandLabel")}:{" "}
        <button type="button" onClick={() => browse({ query: p.brand })} className="text-brand hover:underline">{p.brand}</button>
        <span className="mx-2 text-gray-300">|</span>
        <button type="button" onClick={() => browse({ query: p.brand })} className="text-brand hover:underline">{t("moreFromTpl", { brand: p.brand })}</button>
      </p>

      <div className="border-t border-line pt-4">
        <div className="tabular text-[30px] font-medium leading-tight text-brand">{price(p.price)}</div>
        <div className="mt-1 flex items-center gap-2 text-[14px]">
          <span className="tabular text-gray-400 line-through">{price(p.originalPrice)}</span>
          <span className="text-gray-800">-{off}%</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-[12px]">
        <span className="text-gray-500">{t("promotions")}</span>
        <span className="flex items-center gap-1 rounded-sm border border-brand/40 bg-brand-50 px-2 py-0.5 font-medium text-brand"><Ticket className="h-3.5 w-3.5" aria-hidden />{t("promoVoucher")}</span>
        <span className="flex items-center gap-1 rounded-sm border border-jade-300 bg-jade-50 px-2 py-0.5 font-medium text-jade-700"><Truck className="h-3.5 w-3.5" aria-hidden />{t("promoShip")}</span>
      </div>

      {p.colors && (
        <fieldset>
          <legend className="mb-2 text-[13px] text-gray-500">
            {t("colorFamily")}: <span className="font-medium text-gray-900">{color}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {p.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-pressed={color === c.name}
                onClick={() => setColor(c.name)}
                className={`flex items-center gap-1.5 rounded border px-2.5 py-1.5 text-[13px] transition ${color === c.name ? "border-brand text-brand" : "border-line text-gray-700 hover:border-gray-400"}`}
              >
                <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: c.hex }} />
                {c.name}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {p.sizes && (
        <fieldset>
          <legend className="mb-2 text-[13px] text-gray-500">
            {t(p.sizeLabel === "model" ? "model" : "size")}: <span className="font-medium text-gray-900">{size}</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {p.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => setSize(s)}
                className={`min-w-[44px] rounded border px-3 py-1.5 text-[13px] transition ${size === s ? "border-brand text-brand" : "border-line text-gray-700 hover:border-gray-400"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex items-center gap-4">
        <span className="text-[13px] text-gray-500">{t("quantity")}</span>
        <Stepper value={qty} max={p.stock} onChange={setQty} />
        <span className="text-[12px] text-gray-500">{t("availableTpl", { n: p.stock })}</span>
      </div>

      <div className="hidden grid-cols-2 gap-3 pt-1 sm:grid">
        <button type="button" onClick={() => add(true)} className="rounded-md border-[1.5px] border-brand bg-white py-3 text-[15px] font-bold text-navy transition hover:bg-brand-50">{t("buyNow")}</button>
        <button type="button" onClick={() => add(false)} className="rounded-md bg-brand py-3 text-[15px] font-bold text-white transition hover:bg-brand-600">{t("addToCart")}</button>
      </div>

      {/* phones: sticky CTA bar replaces the bottom nav on this page */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr_1fr] border-t border-line bg-white pb-[env(safe-area-inset-bottom)] sm:hidden">
        <Link href="/" className="grid w-16 place-items-center text-[11px] text-gray-600"><Store className="h-5 w-5" aria-hidden />{t("home")}</Link>
        <button type="button" onClick={() => add(true)} className="h-14 bg-brand-50 text-[14px] font-bold text-navy">{t("buyNow")}</button>
        <button type="button" onClick={() => add(false)} className="h-14 bg-brand text-[14px] font-bold text-white">{t("addToCart")}</button>
      </div>
    </div>
  );
}

function Aside({ p }: { p: Product }) {
  const { t, browse, showToast } = useStore();
  const [getBy, setGetBy] = useState<string | null>(null);
  const stats = sellerStats(p);
  const overseas = p.location === "overseas";

  // computed after mount so server and client markup match
  useEffect(() => {
    const fmt = (d: number) => {
      const x = new Date();
      x.setDate(x.getDate() + d);
      return x.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    };
    setGetBy(overseas ? `${fmt(7)} - ${fmt(12)}` : `${fmt(2)} - ${fmt(4)}`);
  }, [overseas]);

  const row = "flex items-start gap-3 py-2.5 text-[13px]";
  return (
    <aside className="space-y-3 text-gray-700">
      <div className="rounded-md bg-canvas p-3">
        <h2 className="mb-1 text-[12px] text-gray-500">{t("deliveryOptions")}</h2>
        <div className={row}>
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          <span className="flex-1">{overseas ? t("loc.overseas") : t("deliverTo")}</span>
          <button type="button" onClick={() => showToast(t("accountDemo"))} className="shrink-0 text-[12px] font-semibold uppercase text-brand">{t("change")}</button>
        </div>
        <div className={`${row} border-t border-line`}>
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          <span className="flex-1">
            <span className="block">{t("standardDelivery")}</span>
            <span className="text-[12px] text-gray-500">{getBy ? t("getByTpl", { date: getBy }) : " "}</span>
          </span>
          <span className="font-medium">{p.badge === "freeship" ? t("free") : "$1.50"}</span>
        </div>
        <div className={`${row} border-t border-line`}>
          <Banknote className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          <span>{t("codAvailable")}</span>
        </div>
      </div>

      <div className="rounded-md bg-canvas p-3">
        <h2 className="mb-1 text-[12px] text-gray-500">{t("returnWarranty")}</h2>
        <div className={row}>
          <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          <span><span className="block">{t("freeReturns")}</span><span className="text-[12px] text-gray-500">{t("changeOfMind")}</span></span>
        </div>
        <div className={`${row} border-t border-line`}>
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" aria-hidden />
          <span>{p.warranty === "local" ? t("warrantyLocal") : t("warrantyNA")}</span>
        </div>
      </div>

      <div className="rounded-md bg-canvas p-3">
        <h2 className="text-[12px] text-gray-500">{t("soldBy")}</h2>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="flex min-w-0 items-center gap-1 text-[14px] font-medium text-gray-900">
            <span className="truncate">{p.store}</span>
            {p.badge === "mall" && <BadgeCheck className="h-4 w-4 shrink-0 text-navy" aria-label={t("officialStore")} />}
          </span>
          <button type="button" onClick={() => showToast(t("accountDemo"))} className="flex shrink-0 items-center gap-1 text-[12px] font-medium text-brand">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Chat
          </button>
        </div>
        <dl className="mt-3 grid grid-cols-3 divide-x divide-line border-y border-line py-2 text-center">
          {[["posRatings", stats.positive], ["shipOnTime", stats.onTime], ["chatResponse", stats.chat]].map(([k, v]) => (
            <div key={k} className="px-1">
              <dt className="text-[10px] leading-tight text-gray-500">{t(k as DictKey)}</dt>
              <dd className="tabular mt-1 text-[18px] font-medium text-gray-900">{v}%</dd>
            </div>
          ))}
        </dl>
        <button type="button" onClick={() => browse({ query: p.store })} className="mt-2 w-full py-1 text-[13px] font-semibold uppercase text-brand">
          {t("goToStore")}
        </button>
      </div>
    </aside>
  );
}

function Details({ p }: { p: Product }) {
  const { t } = useStore();
  const specs: [DictKey, string][] = [
    ["spec.brand", p.brand],
    ["spec.sku", `KT-${p.id.toUpperCase()}-${(p.id.length * 7919).toString(36).toUpperCase()}`],
    ["spec.category", t(`cat.${p.category}` as DictKey)],
    ["spec.shipsFrom", t(`loc.${p.location}` as DictKey)],
    ["spec.warranty", p.warranty === "local" ? t("localWarrantyType") : t("noWarranty")],
    ["spec.stock", String(p.stock)],
  ];
  return (
    <section className={`${box} p-4 sm:p-5`} aria-labelledby="details-title">
      <h2 id="details-title" className="-mx-4 -mt-4 mb-4 bg-canvas/60 px-4 py-3 text-[16px] font-medium text-gray-900 sm:-mx-5 sm:-mt-5 sm:px-5">
        {t("detailsOf", { title: p.title })}
      </h2>
      <ul className="list-disc space-y-1.5 pl-5 text-[14px] text-gray-700">
        {p.highlights.map((h) => <li key={h}>{h}</li>)}
      </ul>
      <h3 className="mt-6 text-[15px] font-medium text-gray-900">{t("specifications")}</h3>
      <dl className="mt-3 grid gap-x-8 gap-y-3 text-[13px] sm:grid-cols-2">
        {specs.map(([k, v]) => (
          <div key={k}>
            <dt className="text-gray-500">{t(k)}</dt>
            <dd className="mt-0.5 text-gray-900">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Reviews({ p }: { p: Product }) {
  const { t } = useStore();
  const counts = ratingBreakdown(p);
  const max = Math.max(...counts);
  return (
    <section id="reviews" className={`${box} scroll-mt-24 p-4 sm:p-5`} aria-labelledby="reviews-title">
      <h2 id="reviews-title" className="text-[16px] font-medium text-gray-900">{t("ratingsOf", { title: p.title })}</h2>
      <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="shrink-0">
          <div className="text-[44px] font-medium leading-none text-gray-900">{p.rating.toFixed(1)}<span className="text-[22px] text-gray-400">/5</span></div>
          <div className="mt-2 scale-125 origin-left"><Stars rating={p.rating} /></div>
          <p className="mt-2 text-[13px] text-gray-500">{t("ratingsTpl", { n: compact(p.reviews) })}</p>
        </div>
        <ul className="w-full max-w-[360px] space-y-1.5">
          {counts.map((c, i) => (
            <li key={i} className="flex items-center gap-2 text-[12px] text-gray-500">
              <span className="w-8 text-right">{5 - i} ★</span>
              <span className="h-3 flex-1 overflow-hidden rounded-sm bg-gray-100">
                <span className="block h-full bg-gold" style={{ width: `${max ? (c / max) * 100 : 0}%` }} />
              </span>
              <span className="tabular w-12">{compact(c)}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="mt-6 border-y border-line py-3 text-[14px] font-medium text-gray-900">{t("productReviews")}</h3>
      <ul className="divide-y divide-line">
        {reviewsFor(p).map((r, i) => (
          <li key={i} className="py-4 text-[13px]">
            <div className="flex items-center justify-between">
              <Stars rating={r.stars} />
              <span className="text-[12px] text-gray-400">{r.date}</span>
            </div>
            <p className="mt-1.5 text-gray-500">
              {r.name} <span className="ml-1 inline-flex items-center gap-0.5 text-jade-600"><BadgeCheck className="h-3.5 w-3.5" aria-hidden />{t("verifiedPurchase")}</span>
            </p>
            <p className="mt-2 text-gray-800">{r.text}</p>
            {r.variant && <p className="mt-1.5 text-[12px] text-gray-400">{r.variant}</p>}
            <button type="button" className="mt-2 flex items-center gap-1 text-[12px] text-gray-400 hover:text-gray-700">
              <ThumbsUp className="h-3.5 w-3.5" aria-hidden /> {(i * 3 + 2) % 9}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Questions({ p }: { p: Product }) {
  const { t } = useStore();
  const qs = questionsFor(p);
  return (
    <section id="qna" className={`${box} scroll-mt-24 p-4 sm:p-5`} aria-labelledby="qna-title">
      <h2 id="qna-title" className="text-[16px] font-medium text-gray-900">{t("questionsTpl", { n: qs.length })}</h2>
      <ul className="mt-3 divide-y divide-line">
        {qs.map((q) => (
          <li key={q.q} className="space-y-2 py-3 text-[13px]">
            <p className="flex gap-2"><span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-brand text-[11px] font-bold text-white">Q</span><span className="text-gray-900">{q.q}</span></p>
            <p className="flex gap-2"><span className="grid h-5 w-5 shrink-0 place-items-center rounded bg-gray-400 text-[11px] font-bold text-white">A</span><span className="text-gray-600">{q.a}</span></p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProductDetail({ p }: { p: Product }) {
  const { t, browse } = useStore();
  const related = useMemo(
    () => [...products.filter((x) => x.id !== p.id && x.category === p.category), ...products.filter((x) => x.category !== p.category)].slice(0, 12),
    [p],
  );

  return (
    <main className="mx-auto max-w-site px-3 pb-24 pt-3 sm:px-4 lg:pb-6">
      <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1 overflow-hidden whitespace-nowrap text-[12px] text-gray-500">
        <Link href="/" className="text-brand hover:underline">{t("home")}</Link>
        <ChevronRight className="h-3 w-3 shrink-0" aria-hidden />
        <button type="button" onClick={() => browse({ category: p.category })} className="text-brand hover:underline">{t(`cat.${p.category}` as DictKey)}</button>
        <ChevronRight className="h-3 w-3 shrink-0" aria-hidden />
        <span className="truncate">{p.title}</span>
      </nav>

      <section className={`${box} grid gap-5 p-3 sm:p-5 lg:grid-cols-[380px_1fr_300px]`}>
        <Gallery p={p} />
        <Info p={p} />
        <Aside p={p} />
      </section>

      <div className="mt-4 space-y-4">
        <Details p={p} />
        <Reviews p={p} />
        <Questions p={p} />
        <section aria-labelledby="like-title">
          <h2 id="like-title" className="mb-2 text-[20px] font-medium text-gray-800">{t("youMayLike")}</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {related.map((x) => <ProductCard key={x.id} p={x} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
