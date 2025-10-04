import { ElectrovaleControl } from "@/components/electrovane-control";
import { Navigation } from "@/components/navigation";

export default function ControlPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ElectrovaleControl />
    </div>
  );
}
