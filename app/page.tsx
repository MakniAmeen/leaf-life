import { PlantGallery } from "@/components/plant-gallery";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <PlantGallery />
    </div>
  );
}
