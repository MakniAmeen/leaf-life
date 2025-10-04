"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const cart = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const itemCount = cart.items.length;

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png" // Put your logo inside the public folder
              alt="Leaf and Life Logo"
              width={80}       // desktop size
    height={80}
            />
            <span className="text-xl font-semibold text-foreground">
              LEAF&LIFE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors ${
                isActive("/") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Home
            </Link>
            <Link
              href="/marketplace"
              className={`transition-colors ${
                isActive("/marketplace") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Marketplace
            </Link>
            <Link
              href="/disease-detector"
              className={`transition-colors ${
                isActive("/disease-detector") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Plant Health
            </Link>
            <Link
              href="/control"
              className={`transition-colors ${
                isActive("/control") ? "text-primary font-medium" : "text-foreground hover:text-primary"
              }`}
            >
              Smart Control
            </Link>

            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-600 text-xs font-medium text-white ring-2 ring-white">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link href="/profile" className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition">
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name?.split(" ")[0] || "Profile"}
                  </span>
                </Link>
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 p-2 rounded-full hover:bg-gray-100 transition text-gray-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link href="/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link href="/" className={`transition-colors ${isActive("/") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`} onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/marketplace" className={`transition-colors ${isActive("/marketplace") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`} onClick={() => setIsOpen(false)}>
                Marketplace
              </Link>
              <Link href="/disease-detector" className={`transition-colors ${isActive("/disease-detector") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`} onClick={() => setIsOpen(false)}>
                Plant Health
              </Link>
              <Link href="/control" className={`transition-colors ${isActive("/control") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`} onClick={() => setIsOpen(false)}>
                Smart Control
              </Link>
              <Link href="/seller" className={`transition-colors ${isActive("/seller") ? "text-primary font-medium" : "text-foreground hover:text-primary"}`} onClick={() => setIsOpen(false)}>
                Sell
              </Link>

              {/* Mobile Cart */}
              <Link href="/cart" className="flex items-center gap-2 transition-colors text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>
                <ShoppingCart className="h-5 w-5" />
                Cart {itemCount > 0 && `(${itemCount})`}
              </Link>

              <div className="flex flex-col gap-2 pt-2 border-t border-border">
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { signOut(); setIsOpen(false); }}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/signin" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">Sign In</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button size="sm" className="w-full">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
