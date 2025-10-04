"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"

// 1. IMPORT THE CART HOOK (only the hook)
import { useCart } from "@/hooks/use-cart"
// 2. IMPORT THE PRODUCT TYPE SEPARATELY (clean serialization fix)
import { Product } from "@/lib/type"

// --- Product Interface (REMOVED - now imported from @/lib/types) ---

// 2. USE THE DATA
const products: Product[] = [
  {
    id: 1,
    name: "Tomates Bio Premium",
    seller: "Marie Dubois",
    location: "Provence, France",
    price: "4.50€/kg",
    rating: 4.8,
    reviews: 124,
    image: "/tomatoes-organic-fresh-red-ripe.jpg",
    category: "Légumes",
    organic: true,
  },
  {
    id: 2,
    name: "Miel de Lavande Artisanal",
    seller: "Sophie Martin",
    location: "Drôme, France",
    price: "12.00€/pot",
    rating: 4.9,
    reviews: 89,
    image: "/lavender-honey-jar-artisanal.jpg",
    category: "Produits transformés",
    organic: true,
  },
  {
    id: 3,
    name: "Salade Verte Fraîche",
    seller: "Fatima El Mansouri",
    location: "Casablanca, Maroc",
    price: "2.20€/botte",
    rating: 4.7,
    reviews: 156,
    image: "/fresh-green-lettuce-salad.jpg",
    category: "Légumes",
    organic: true,
  },
  {
    id: 4,
    name: "Huile d'Olive Extra Vierge",
    seller: "Isabella Rossi",
    location: "Toscane, Italie",
    price: "18.50€/bouteille",
    rating: 4.9,
    reviews: 203,
    image: "/extra-virgin-olive-oil-bottle.jpg",
    category: "Huiles",
    organic: true,
  },
  {
    id: 5,
    name: "Herbes Aromatiques Séchées",
    seller: "Amina Hassan",
    location: "Fès, Maroc",
    price: "8.00€/sachet",
    rating: 4.6,
    reviews: 78,
    image: "/dried-aromatic-herbs-mix.jpg",
    category: "Épices",
    organic: true,
  },
  {
    id: 6,
    name: "Fromage de Chèvre Fermier",
    seller: "Claire Lefebvre",
    location: "Loire, France",
    price: "15.00€/pièce",
    rating: 4.8,
    reviews: 92,
    image: "/artisanal-goat-cheese-farm.jpg",
    category: "Fromages",
    organic: true,
  },
]

export function ProductGrid() {
  const [favorites, setFavorites] = useState<number[]>([])
  // 3. INITIALIZE THE CART HOOK
  const cart = useCart();

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  // 4. ADD THE onAddToCart FUNCTION
  const onAddToCart = (product: Product) => {
    cart.addItem(product);
    console.log(`Added product ${product.id} to cart.`); 
    // Optional: Add a toast notification here
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Produits Populaires</h2>
            <p className="text-muted-foreground">Découvrez les meilleurs produits de nos agricultrices</p>
          </div>
          <Button variant="outline">Voir tout</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-border">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={`/.jpg?height=200&width=300&query=${encodeURIComponent(product.image.replace("/", ""))}`}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(product.id) ? "fill-primary text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                  {product.organic && (
                    <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">Bio</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>

                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Par {product.seller} • {product.location}
                </p>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => onAddToCart(product)} 
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ajouter au panier
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}