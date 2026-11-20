import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import UtilityBar, { CampaignStrip } from "@/components/UtilityBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickViewModal from "@/components/QuickViewModal";
import CartDrawer from "@/components/CartDrawer";
import { MobileNav, Toast } from "@/components/MobileChrome";

export const metadata: Metadata = {
  title: "Kontrok.com — Online Shopping in Cambodia",
  description: "Shop electronics, beauty, fashion and more with fast delivery across Cambodia. Pay with ABA Pay, Wing, KHQR or cash on delivery.",
};

export const viewport: Viewport = {
  themeColor: "#0285C9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Khmer:wght@300;400;500;600;700;800&display=swap"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <StoreProvider>
          <CampaignStrip />
          <UtilityBar />
          <Header />
          {children}
          <Footer />
          <MobileNav />
          <QuickViewModal />
          <CartDrawer />
          <Toast />
        </StoreProvider>
      </body>
    </html>
  );
}
