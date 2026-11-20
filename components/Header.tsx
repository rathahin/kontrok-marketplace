"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Search, ShoppingCart, TrendingUp, User } from "lucide-react";
import { matchesQuery, products, trendingSearches } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Logo } from "./ui";
import CategoriesMenu from "./CategoriesMenu";

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Bold the parts of `label` that match a query word. */
function Highlight({ label, query }: { label: string; query: string }) {
  const words = query.trim().split(/\s+/).filter(Boolean).map(escapeRe);
  if (!words.length) return <>{label}</>;
  const parts = label.split(new RegExp(`(${words.join("|")})`, "ig"));
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-900">{part}</strong> : <span key={i}>{part}</span>,
      )}
    </>
  );
}

function SearchBox() {
  const { t, query, browse } = useStore();
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  // Keep the box in sync when a tag/tile/category sets the query elsewhere.
  useEffect(() => setText(query), [query]);

  const typed = text.trim();
  const suggestions = useMemo(() => {
    if (!typed) return trendingSearches.map((s) => ({ label: s, trending: true }));
    return products.filter((p) => matchesQuery(p, typed)).slice(0, 6).map((p) => ({ label: p.title, trending: false }));
  }, [typed]);

  const submit = (value: string) => {
    browse({ query: value.trim() });
    setOpen(false);
    setActive(-1);
    inputRef.current?.blur();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, -1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  return (
    <div className="relative">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit(active >= 0 ? suggestions[active].label : text);
        }}
        className="flex h-10 overflow-hidden rounded-lg border-2 border-brand bg-white sm:h-11"
      >
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => { setText(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          placeholder={t("searchPlaceholder")}
          aria-label={t("search")}
          role="combobox"
          aria-expanded={open && suggestions.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          className="min-w-0 flex-1 bg-transparent px-3 text-[14px] outline-none placeholder:text-gray-400"
        />
        <button type="submit" aria-label={t("search")} className="grid w-12 place-items-center bg-brand text-white transition hover:bg-brand-600 sm:w-14">
          <Search className="h-5 w-5" aria-hidden />
        </button>
      </form>

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-line bg-white py-1 shadow-xl animate-fade-in"
        >
          {!typed && (
            <li className="px-3 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-gray-400" role="presentation">
              {t("trending")}
            </li>
          )}
          {suggestions.map((s, i) => (
            <li key={s.label} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
              <button
                type="button"
                // mousedown would blur the input before click lands
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => submit(s.label)}
                className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] text-gray-600 ${
                  i === active ? "bg-brand-50" : "hover:bg-canvas"
                }`}
              >
                {s.trending ? (
                  <TrendingUp className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden />
                ) : (
                  <Search className="h-3.5 w-3.5 shrink-0 text-gray-400" aria-hidden />
                )}
                <span className="truncate"><Highlight label={s.label} query={typed} /></span>
              </button>
            </li>
          ))}
          {typed && (
            <li role="presentation" className="border-t border-line">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => submit(typed)}
                className="w-full px-3 py-2 text-left text-[13px] font-medium text-brand hover:bg-brand-50"
              >
                {t("searchFor", { q: typed })}
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const { t, cartCount, setCartOpen, browse, showToast } = useStore();
  const ref = useRef<HTMLElement>(null);

  // Publish the header height so the feed's sticky tabs sit right under it.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <header ref={ref} className="sticky top-0 z-40 bg-white shadow-[0_1px_0_#E5E7EB]">
      <div className="mx-auto flex max-w-site items-center gap-3 px-3 py-2.5 sm:gap-6 sm:px-4 sm:py-3">
        <Logo compact />
        <CategoriesMenu />
        <div className="min-w-0 flex-1">
          <SearchBox />
          <div className="mt-1.5 hidden items-center gap-3 overflow-hidden whitespace-nowrap text-[12px] text-gray-500 md:flex">
            {trendingSearches.map((tag) => (
              <button key={tag} type="button" onClick={() => browse({ query: tag })} className="hover:text-brand">
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-4">
          <button
            type="button"
            onClick={() => showToast(t("accountDemo"))}
            className="hidden items-center gap-1.5 text-[13px] text-gray-700 hover:text-brand sm:flex lg:hidden"
          >
            <User className="h-5 w-5" aria-hidden />
            <span className="whitespace-nowrap">{t("login")} <span className="text-gray-300">|</span> {t("signup")}</span>
          </button>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`${t("cart")} (${cartCount})`}
            className="relative grid h-10 w-10 place-items-center rounded-full text-gray-700 hover:bg-canvas hover:text-brand"
          >
            <ShoppingCart className="h-6 w-6" aria-hidden />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white tabular">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
