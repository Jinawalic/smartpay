"use client";

import { useSearchParams } from "next/navigation";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/lib/data";
import Link from "next/link";
import React, { Suspense } from "react";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import { Button } from "@/components/ui/Button";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";
  const { addToCart } = useCart();

  const results = mockProducts.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category?.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {query ? `Search results for "${query}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground mt-2">{results.length} items found</p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group flex flex-col">
                <Link href={`/product/${product.id}`} className="block relative h-48 w-full bg-white p-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                  />
                  {product.discountPercentage && (
                    <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">
                      -{product.discountPercentage}%
                    </span>
                  )}
                </Link>
                
                <div className="p-4 flex-1 flex flex-col bg-slate-50/30">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="font-bold text-slate-800 text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors h-10">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-black text-slate-900">₦ {product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">₦ {product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full gap-2 rounded-xl h-11"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <div className="text-slate-300 mb-4 flex justify-center">
               <ShoppingCart className="h-16 w-16" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">No products found</h2>
            <p className="text-muted-foreground mt-2 mb-8">Try searching for something else like "phones" or "fashion".</p>
            <Link href="/">
              <Button size="lg" className="px-10 rounded-2xl">Back to Home</Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  );
}
