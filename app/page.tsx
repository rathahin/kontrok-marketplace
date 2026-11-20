import UtilityBar from "@/components/UtilityBar";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ChannelPills from "@/components/ChannelPills";
import FlashSale from "@/components/FlashSale";
import CategoryGrid from "@/components/CategoryGrid";
import JustForYou from "@/components/JustForYou";
import Footer from "@/components/Footer";
import QuickViewModal from "@/components/QuickViewModal";
import CartDrawer from "@/components/CartDrawer";
import { MobileNav, Toast } from "@/components/MobileChrome";

export default function Home() {
  return (
    <>
      <UtilityBar />
      <Header />
      <main className="mx-auto max-w-site space-y-5 px-3 pb-20 pt-3 sm:px-4 lg:pb-4">
        <HeroSection />
        <ChannelPills />
        <FlashSale />
        <CategoryGrid />
        <JustForYou />
      </main>
      <Footer />
      <MobileNav />
      <QuickViewModal />
      <CartDrawer />
      <Toast />
    </>
  );
}
