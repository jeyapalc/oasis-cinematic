import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/canvas/HeroSection";
import { HeroOverlay } from "@/components/canvas/HeroOverlay";
import { HeatMirageTransition } from "@/components/sections/HeatMirageTransition";
import { ContentBlocks } from "@/components/sections/ContentBlocks";
import { NightDesertSection } from "@/components/sections/NightDesertSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Hero: 3D desert scene with editorial overlay */}
      <div className="relative h-screen w-full overflow-hidden">
        <HeroSection />
        <HeroOverlay />
      </div>

      {/* Heat mirage scroll transition */}
      <HeatMirageTransition />

      {/* Content blocks: Listings, Events, Documents, Portal */}
      <ContentBlocks />

      {/* Night desert sky section */}
      <NightDesertSection />

      {/* Footer */}
      <Footer />
    </>
  );
}
