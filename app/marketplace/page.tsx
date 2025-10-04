import { Navigation } from "@/components/navigation";
import { SimpleMarketplace } from "@/components/simple-marketplace";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SimpleMarketplace />
    </div>
  );
}
