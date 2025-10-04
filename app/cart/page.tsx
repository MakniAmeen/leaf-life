"use client";

import { Navigation } from "@/components/navigation";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Trash2, Check } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const cart = useCart();
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmOrder = () => {
    setIsConfirming(true);
    // Simulate order confirmation
    setTimeout(() => {
      cart.clearCart();
      setIsConfirming(false);
      alert("Order confirmed successfully!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Your Shopping Cart
        </h1>

        {cart.loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading cart...</p>
          </div>
        ) : cart.items.length === 0 ? (
          <p className="text-muted-foreground">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border p-4 rounded-lg bg-card shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => cart.removeItem(item.product.id)}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div className="flex flex-col">
                    <span className="font-semibold text-card-foreground">
                      {item.product.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      by {item.product.seller}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Quantity: {item.quantity}
                    </span>
                  </div>
                </div>

                <span className="text-lg font-bold text-primary">
                  {item.product.price}
                </span>
              </div>
            ))}

            {/* Confirm Order Button */}
            <div className="pt-6 flex justify-center">
              <Button
                onClick={handleConfirmOrder}
                disabled={isConfirming}
                size="lg"
                className="px-8 py-3"
              >
                {isConfirming ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Confirming...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Confirm Order
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
