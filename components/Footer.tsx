"use client";

import { Apple, Banknote, Play } from "lucide-react";
import type { DictKey } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { Logo } from "./ui";

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-3 text-[14px] font-semibold text-gray-900">{title}</h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l}><a href="#" className="text-[13px] text-gray-600 hover:text-brand">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}

const chip = "inline-flex h-8 items-center gap-1.5 rounded border px-2.5 text-[12px] font-bold";

export default function Footer() {
  const { t } = useStore();
  const tr = (keys: DictKey[]) => keys.map((k) => t(k));

  return (
    <footer id="footer" className="mt-8 border-t border-line bg-white">
      <div className="mx-auto grid max-w-site grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 md:grid-cols-4 lg:grid-cols-5">
        <FooterCol title={t("customerCare")} links={tr(["helpCenter", "howToBuy", "shipping", "returns", "contactUs"])} />
        <FooterCol title={t("aboutKontrok")} links={tr(["aboutUs", "careers", "sellOn", "ch.mall", "privacy", "terms"])} />

        <div>
          <h3 className="mb-3 text-[14px] font-semibold text-gray-900">{t("paymentMethods")}</h3>
          <div className="flex flex-wrap gap-2">
            <span className={`${chip} border-transparent bg-[#0B4F6C] text-white`}>ABA PAY</span>
            <span className={`${chip} border-transparent bg-[#8DC63F] text-white`}>Wing</span>
            <span className={`${chip} border-transparent bg-[#E1232E] text-white`}>KHQR</span>
            <span className={`${chip} border-line bg-white italic tracking-tight text-[#1A1F71]`}>VISA</span>
            <span className={`${chip} border-line bg-white font-semibold text-gray-700`}>
              <span className="relative flex">
                <span className="h-3.5 w-3.5 rounded-full bg-[#EB001B]" />
                <span className="-ml-1.5 h-3.5 w-3.5 rounded-full bg-[#F79E1B] mix-blend-multiply" />
              </span>
              mastercard
            </span>
            <span className={`${chip} border-line bg-canvas font-semibold text-gray-700`}>
              <Banknote className="h-4 w-4" aria-hidden /> {t("cod")}
            </span>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-[14px] font-semibold text-gray-900">{t("deliveryPartners")}</h3>
          <div className="flex flex-wrap gap-2">
            {[
              ["Kontrok Express", "#F85606"],
              ["J&T Express", "#E60012"],
              ["VET Express", "#1D4ED8"],
              ["Grab Express", "#00B14F"],
            ].map(([name, color]) => (
              <span key={name} className={`${chip} border-line bg-white font-semibold text-gray-700`}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                {name}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <h3 className="mb-3 text-[14px] font-semibold text-gray-900">{t("shopOnTheGo")}</h3>
          <Logo />
          <div className="mt-3 flex flex-wrap gap-2">
            <a href="#" className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-1.5 text-white hover:bg-black">
              <Apple className="h-5 w-5" aria-hidden />
              <span className="leading-tight"><span className="block text-[9px] opacity-80">Download on the</span><span className="text-[13px] font-semibold">App Store</span></span>
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-1.5 text-white hover:bg-black">
              <Play className="h-5 w-5 fill-white" aria-hidden />
              <span className="leading-tight"><span className="block text-[9px] opacity-80">Get it on</span><span className="text-[13px] font-semibold">Google Play</span></span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-2 px-4 py-4 text-[12px] text-gray-500">
          <span>{t("rights")}</span>
          <span>1 USD = 4,050 KHR</span>
        </div>
      </div>
    </footer>
  );
}
