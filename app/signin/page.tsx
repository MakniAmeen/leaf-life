"use client";

import { Navigation } from "@/components/navigation";
import { SignInForm } from "@/components/signin-form";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <SignInForm />
    </div>
  );
}
