"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { translate, type DictKey, type Lang } from "./i18n";
import { formatPrice, type Currency } from "./format";
import type { CategoryId, Channel, Product } from "./data";

export interface CartItem {
  key: string;
  productId: string;
  color?: string;
  size?: string;
  qty: number;
}

interface Store {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  price: (usd: number) => string;

  cart: CartItem[];
  cartCount: number;
  addToCart: (p: Product, opts: { color?: string; size?: string }, qty: number) => void;
  setQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;

  quickView: Product | null;
  openQuickView: (p: Product) => void;
  closeQuickView: () => void;

  // feed filters
  query: string;
  setQuery: (q: string) => void;
  category: CategoryId | null;
  setCategory: (c: CategoryId | null) => void;
  channel: Channel | null;
  setChannel: (c: Channel | null) => void;
  clearFilters: () => void;
  /** set a filter and bring the feed into view */
  browse: (f: { query?: string; category?: CategoryId; channel?: Channel }) => void;

  toast: string | null;
  showToast: (msg: string) => void;
}

const Ctx = createContext<Store | null>(null);

const LS = "kontrok.demo.";
function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(LS + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(key: string, value: unknown) {
  try {
    window.localStorage.setItem(LS + key, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — state just won't persist */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore per-viewer preferences after mount (never during SSR → no hydration mismatch).
  useEffect(() => {
    setLang(read<Lang>("lang", "en"));
    setCurrency(read<Currency>("currency", "USD"));
    setCart(read<CartItem[]>("cart", []));
    setHydrated(true);
  }, []);
  useEffect(() => { if (hydrated) write("lang", lang); document.documentElement.lang = lang; }, [lang, hydrated]);
  useEffect(() => { if (hydrated) write("currency", currency); }, [currency, hydrated]);
  useEffect(() => { if (hydrated) write("cart", cart); }, [cart, hydrated]);

  const t = useCallback((key: DictKey, vars?: Record<string, string | number>) => translate(lang, key, vars), [lang]);
  const price = useCallback((usd: number) => formatPrice(usd, currency), [currency]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const addToCart = useCallback((p: Product, opts: { color?: string; size?: string }, qty: number) => {
    const key = [p.id, opts.color ?? "", opts.size ?? ""].join("|");
    setCart((prev) => {
      const hit = prev.find((i) => i.key === key);
      if (hit) return prev.map((i) => (i.key === key ? { ...i, qty: Math.min(i.qty + qty, p.stock) } : i));
      return [...prev, { key, productId: p.id, color: opts.color, size: opts.size, qty }];
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)));
  }, []);
  const removeItem = useCallback((key: string) => setCart((prev) => prev.filter((i) => i.key !== key)), []);

  const clearFilters = useCallback(() => { setQuery(""); setCategory(null); setChannel(null); }, []);

  const browse = useCallback((f: { query?: string; category?: CategoryId; channel?: Channel }) => {
    setQuery(f.query ?? "");
    setCategory(f.category ?? null);
    setChannel(f.channel ?? null);
    requestAnimationFrame(() => document.getElementById("just-for-you")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, []);

  const value = useMemo<Store>(() => ({
    lang, setLang, t, currency, setCurrency, price,
    cart, cartCount: cart.reduce((n, i) => n + i.qty, 0), addToCart, setQty, removeItem, cartOpen, setCartOpen,
    quickView, openQuickView: setQuickView, closeQuickView: () => setQuickView(null),
    query, setQuery, category, setCategory, channel, setChannel, clearFilters, browse,
    toast, showToast,
  }), [lang, t, currency, price, cart, addToCart, setQty, removeItem, cartOpen, quickView, query, category, channel, clearFilters, browse, toast, showToast]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("useStore must be used inside <StoreProvider>");
  return s;
}

/** Lock page scroll while an overlay is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [locked]);
}
