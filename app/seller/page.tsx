"use client";

import { Navigation } from "@/components/navigation";
import { SellerForm } from "@/components/seller-form";

export default function SellerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SellerForm />
    </div>
  );
}
