// lib/types.ts

// DEFINE THE SHARED PRODUCT INTERFACE HERE
export interface Product {
    id: number;
    name: string;
    seller: string;
    location: string;
    price: string;
    rating: number;
    reviews: number;
    image: string;
    category: string;
    organic: boolean;
}