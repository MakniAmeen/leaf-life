"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { useProducts } from "@/hooks/use-products";
import Link from "next/link";

export function SimpleMarketplace() {
  const cart = useCart();
  const { products } = useProducts();

  const handleAddToCart = (product: any) => {
    cart.addItem(product);
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Fresh from <span className="text-primary">Women Farmers</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Support local women farmers by purchasing their fresh, organic
            produce directly
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {product.price}
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                      {product.rating}
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground mb-1">
                    by {product.seller}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-3 w-3" />
                    {product.location}
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary/5 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Want to sell your products?
          </h2>
          <p className="text-muted-foreground mb-6">
            Join our community of successful women farmers and start selling
            today
          </p>
          <Link href="/seller">
            <Button size="lg" className="px-8">
              Become a Seller
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
