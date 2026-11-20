export type Currency = "USD" | "KHR";

/** Fixed demo rate: 1 USD = 4,050 KHR. */
export const KHR_PER_USD = 4050;

/** KHR is rounded to the nearest 100 riel, as Cambodian retail does. */
export function formatPrice(usd: number, currency: Currency): string {
  if (currency === "USD") return `$${usd.toFixed(2)}`;
  const riel = Math.round((usd * KHR_PER_USD) / 100) * 100;
  return `៛${riel.toLocaleString("en-US")}`;
}

export function discountPct(price: number, original: number): number {
  return Math.round((1 - price / original) * 100);
}

/** 5120 -> "5.1k", 12040 -> "12k", 412 -> "412" */
export function compact(n: number): string {
  if (n < 1000) return String(n);
  const v = n / 1000;
  return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}k`;
}
