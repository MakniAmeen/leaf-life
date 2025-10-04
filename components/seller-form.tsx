"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { Star, Upload, ArrowLeft } from "lucide-react";
import Image from "next/image";

export function SellerForm() {
  const router = useRouter();
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    seller: "",
    location: "",
    rating: 5,
    image: "",
    category: "",
    organic: true,
    reviews: 0,
    badge: "New",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const productData = {
        name: formData.name,
        price: `$${formData.price}`,
        seller: formData.seller,
        location: formData.location,
        rating: formData.rating,
        image: formData.image,
        category: formData.category,
        organic: formData.organic,
        reviews: formData.reviews,
        badge: formData.badge,
      };

      const { error } = await addProduct(productData);

      if (error) {
        alert(`Error adding product: ${error.message}`);
      } else {
        // Show success message
        alert("Product added successfully to the marketplace!");

        // Reset form
        setFormData({
          name: "",
          price: "",
          seller: "",
          location: "",
          rating: 5,
          image: "",
          category: "",
          organic: true,
          reviews: 0,
          badge: "New",
        });
        setImagePreview(null);

        // Navigate to marketplace
        router.push("/marketplace");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Become a <span className="text-primary">Seller</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Add your fresh products to our marketplace
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Organic Tomatoes"
                  required
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 4.99"
                  required
                />
              </div>

              {/* Seller Name */}
              <div className="space-y-2">
                <Label htmlFor="seller">Your Name *</Label>
                <Input
                  id="seller"
                  name="seller"
                  value={formData.seller}
                  onChange={handleInputChange}
                  placeholder="e.g., Amina Hassan"
                  required
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., Tunis, Tunisia"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Herbs">Herbs</option>
                  <option value="Oils">Oils</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label htmlFor="rating">Product Rating *</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-20"
                    required
                  />
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= formData.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Organic Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  id="organic"
                  name="organic"
                  type="checkbox"
                  checked={formData.organic}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <Label htmlFor="organic">Organic Product</Label>
              </div>

              {/* Product Image */}
              <div className="space-y-2">
                <Label htmlFor="image">Product Image *</Label>
                <div className="space-y-4">
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                    required
                  />
                  {imagePreview && (
                    <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Badge */}
              <div className="space-y-2">
                <Label htmlFor="badge">Product Badge</Label>
                <select
                  id="badge"
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="New">New</option>
                  <option value="Fresh">Fresh</option>
                  <option value="Premium">Premium</option>
                  <option value="Organic">Organic</option>
                  <option value="Sweet">Sweet</option>
                  <option value="Local">Local</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Add to Marketplace
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
