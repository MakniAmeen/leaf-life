"use client";

import { Navigation } from "@/components/navigation";
import { SignUpForm } from "@/components/signup-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SignUpForm />
    </div>
  );
}
