"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { mockProducts } from "@/lib/data";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Discover top products securely via Escrow.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mockProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow group overflow-hidden border-border flex flex-col h-full">
             <div className="relative h-48 w-full bg-muted overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
             </div>
             <CardContent className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                   <span className="font-bold text-primary whitespace-nowrap">${product.price.toLocaleString()}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                <div className="flex items-center gap-1 mt-3">
                   <Star className="h-4 w-4 fill-primary text-primary" />
                   <Star className="h-4 w-4 fill-primary text-primary" />
                   <Star className="h-4 w-4 fill-primary text-primary" />
                   <Star className="h-4 w-4 fill-primary text-primary" />
                   <Star className="h-4 w-4 fill-muted text-muted" />
                   <span className="text-xs text-muted-foreground ml-1">(120)</span>
                </div>
             </CardContent>
             <CardFooter className="p-4 pt-0 border-t border-border bg-muted/10 mt-auto">
                 <Link href="/buyer/cart" className="w-full">
                    <Button className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white" variant="outline">
                       <ShoppingCart className="h-4 w-4 mr-2" />
                       Add to Cart
                    </Button>
                 </Link>
             </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
