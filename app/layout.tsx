import type { Metadata, Viewport } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "Kontrok.com — Online Shopping in Cambodia",
  description: "Shop electronics, beauty, fashion and more with fast delivery across Cambodia. Pay with ABA Pay, Wing, KHQR or cash on delivery.",
};

export const viewport: Viewport = {
  themeColor: "#F85606",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Khmer:wght@400;500;600;700&display=swap"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
