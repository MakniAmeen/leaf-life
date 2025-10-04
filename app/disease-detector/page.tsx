import { PhotoDiagnostic } from "@/components/photo-diagnostic";
import { Navigation } from "@/components/navigation";

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PhotoDiagnostic />
    </div>
  );
}
