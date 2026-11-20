"use client";

import { useEffect, useState } from "react";
import { CircleCheck, Minus, Plus, ShoppingCart, Ticket, Trash2, X } from "lucide-react";
import { productById, type Product } from "@/lib/data";
import { useScrollLock, useStore, type CartItem } from "@/lib/store";
import { SmartImage } from "./ui";

const VOUCHER = "KONTROK10";
const FREE_DELIVERY_OVER = 15;
const DELIVERY_FEE = 1.5;

export default function CartDrawer() {
  const { t, price, cart, cartCount, setQty, removeItem, cartOpen, setCartOpen, showToast } = useStore();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [invalid, setInvalid] = useState(false);
  useScrollLock(cartOpen);

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  const lines = cart
    .map((item) => ({ item, p: productById(item.productId) }))
    .filter((l): l is { item: CartItem; p: Product } => Boolean(l.p));
  const subtotal = lines.reduce((s, { item, p }) => s + p.price * item.qty, 0);
  const discount = applied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const afterDiscount = subtotal - discount;
  const delivery = subtotal === 0 || afterDiscount >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const total = afterDiscount + delivery;
  const toFree = Math.max(0, FREE_DELIVERY_OVER - afterDiscount);

  const applyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = code.trim().toUpperCase() === VOUCHER;
    setApplied(ok);
    setInvalid(!ok);
  };

  return (
    <div className={`fixed inset-0 z-50 ${cartOpen ? "" : "pointer-events-none"}`} aria-hidden={!cartOpen} inert={!cartOpen}>
      <button
        type="button"
        tabIndex={-1}
        aria-label={t("close")}
        onClick={() => setCartOpen(false)}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${cartOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t("myCart")}
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-4 py-3.5">
          <h2 className="text-[17px] font-semibold text-gray-900">
            {t("myCart")} <span className="font-normal text-gray-400">({cartCount})</span>
          </h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label={t("close")} className="grid h-9 w-9 place-items-center rounded-full text-gray-600 hover:bg-canvas">
            <X className="h-5 w-5" aria-hidden />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-full bg-canvas">
              <ShoppingCart className="h-9 w-9 text-gray-300" aria-hidden />
            </span>
            <p className="text-[15px] font-semibold text-gray-800">{t("emptyCart")}</p>
            <p className="text-[13px] text-gray-500">{t("emptyHint")}</p>
            <button type="button" onClick={() => setCartOpen(false)} className="mt-2 rounded-md bg-brand px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-brand-600">
              {t("continueShopping")}
            </button>
          </div>
        ) : (
          <>
            {toFree > 0 && (
              <div className="border-b border-line bg-jade-50/60 px-4 py-2.5">
                <p className="text-[12px] text-jade-800">{t("freeDeliveryHint", { amount: price(toFree) })}</p>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-jade-100">
                  <div className="h-full rounded-full bg-jade-500 transition-all" style={{ width: `${Math.min(100, (afterDiscount / FREE_DELIVERY_OVER) * 100)}%` }} />
                </div>
              </div>
            )}

            <ul className="flex-1 divide-y divide-line overflow-y-auto px-4">
              {lines.map(({ item, p }) => (
                <li key={item.key} className="flex gap-3 py-3.5">
                  <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-canvas">
                    <SmartImage src={p.image} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="line-clamp-2 text-[13px] leading-[18px] text-gray-800">{p.title}</p>
                    {(item.color || item.size) && (
                      <p className="text-[11px] text-gray-500">{[item.color, item.size].filter(Boolean).join(" · ")}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <span className="tabular text-[15px] font-semibold text-brand">{price(p.price * item.qty)}</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center rounded border border-line">
                          <button type="button" onClick={() => setQty(item.key, item.qty - 1)} disabled={item.qty <= 1} aria-label={t("decrease")} className="grid h-7 w-7 place-items-center text-gray-600 disabled:opacity-30">
                            <Minus className="h-3 w-3" aria-hidden />
                          </button>
                          <span className="tabular w-7 text-center text-[13px]">{item.qty}</span>
                          <button type="button" onClick={() => setQty(item.key, Math.min(item.qty + 1, p.stock))} disabled={item.qty >= p.stock} aria-label={t("increase")} className="grid h-7 w-7 place-items-center text-gray-600 disabled:opacity-30">
                            <Plus className="h-3 w-3" aria-hidden />
                          </button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.key)} aria-label={t("remove")} className="grid h-7 w-7 place-items-center rounded text-gray-400 hover:bg-canvas hover:text-danger">
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="space-y-3 border-t border-line bg-white px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3">
              <form onSubmit={applyVoucher} className="flex gap-2">
                <label className="relative flex-1">
                  <span className="sr-only">{t("voucherPlaceholder")}</span>
                  <Ticket className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden />
                  <input
                    value={code}
                    onChange={(e) => { setCode(e.target.value); setInvalid(false); }}
                    placeholder={t("voucherPlaceholder")}
                    aria-invalid={invalid}
                    className="h-10 w-full rounded-md border border-line pl-8 pr-2 text-[13px] uppercase outline-none placeholder:normal-case focus:border-brand"
                  />
                </label>
                <button type="submit" className="h-10 rounded-md border border-brand px-4 text-[13px] font-semibold text-brand hover:bg-brand-50">
                  {t("apply")}
                </button>
              </form>
              {applied && (
                <p className="flex items-center gap-1.5 text-[12px] text-jade-700">
                  <CircleCheck className="h-4 w-4" aria-hidden /> {t("voucherApplied")}
                </p>
              )}
              {invalid && <p className="text-[12px] text-danger" role="alert">{t("voucherInvalid")}</p>}
              {!applied && !invalid && <p className="text-[12px] text-gray-400">{t("voucherHint")}</p>}

              <dl className="space-y-1.5 text-[13px]">
                <div className="flex justify-between text-gray-600"><dt>{t("subtotal")}</dt><dd className="tabular">{price(subtotal)}</dd></div>
                {discount > 0 && (
                  <div className="flex justify-between text-jade-700"><dt>{t("discount")}</dt><dd className="tabular">−{price(discount)}</dd></div>
                )}
                <div className="flex justify-between text-gray-600">
                  <dt>{t("deliveryFee")}</dt>
                  <dd className="tabular">{delivery === 0 ? <span className="font-medium text-jade-700">{t("free")}</span> : price(delivery)}</dd>
                </div>
                <div className="flex items-baseline justify-between border-t border-line pt-2 text-gray-900">
                  <dt className="font-semibold">{t("total")}</dt>
                  <dd className="tabular text-[20px] font-bold text-brand">{price(total)}</dd>
                </div>
              </dl>

              <button type="button" onClick={() => showToast(t("checkoutDemo"))} className="w-full rounded-md bg-brand py-3 text-[15px] font-semibold text-white transition hover:bg-brand-600">
                {t("checkout")}
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
