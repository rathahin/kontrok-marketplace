import HeroSection from "@/components/HeroSection";
import ServiceTiles from "@/components/ServiceTiles";
import FlashSale from "@/components/FlashSale";
import MallSection from "@/components/MallSection";
import CategoryGrid from "@/components/CategoryGrid";
import JustForYou from "@/components/JustForYou";

export default function Home() {
  return (
    <main className="mx-auto max-w-site space-y-5 px-3 pb-20 pt-3 sm:px-4 lg:pb-4">
      <HeroSection />
      <ServiceTiles />
      <FlashSale />
      <MallSection />
      <CategoryGrid />
      <JustForYou />
    </main>
  );
}
