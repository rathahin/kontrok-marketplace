"use client";

import { CircleCheck, House, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useStore } from "@/lib/store";

/** Fixed bottom navigation (phones/tablets only). */
export function MobileNav() {
  const { t, cartCount, setCartOpen, showToast } = useStore();
  const item = "relative flex flex-col items-center justify-center gap-0.5 text-[11px] text-gray-600 active:text-brand";
  return (
    <nav aria-label="Primary" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] lg:hidden">
      <div className="grid h-14 grid-cols-4">
        <button type="button" className={`${item} text-brand`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <House className="h-5 w-5" aria-hidden /> {t("home")}
        </button>
        <button type="button" className={item} onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}>
          <LayoutGrid className="h-5 w-5" aria-hidden /> {t("categories")}
        </button>
        <button type="button" className={item} onClick={() => setCartOpen(true)}>
          <span className="relative">
            <ShoppingCart className="h-5 w-5" aria-hidden />
            {cartCount > 0 && (
              <span className="tabular absolute -right-2.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-bold text-white ring-2 ring-white">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </span>
          {t("cart")}
        </button>
        <button type="button" className={item} onClick={() => showToast(t("accountDemo"))}>
          <User className="h-5 w-5" aria-hidden /> {t("account")}
        </button>
      </div>
    </nav>
  );
}

export function Toast() {
  const { toast } = useStore();
  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-20 left-1/2 z-[60] -translate-x-1/2 lg:bottom-8">
      {toast && (
        <div key={toast} className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gray-900/90 px-4 py-2.5 text-[13px] text-white shadow-lg animate-pop-in">
          <CircleCheck className="h-4 w-4 text-emerald-400" aria-hidden /> {toast}
        </div>
      )}
    </div>
  );
}
