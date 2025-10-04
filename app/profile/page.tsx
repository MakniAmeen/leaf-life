"use client";

import { Navigation } from "@/components/navigation";
import { ProfileView } from "@/components/profile-view";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProfileView />
    </div>
  );
}
