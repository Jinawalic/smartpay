"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { mockProducts } from "@/lib/data";
import { ShoppingCart, Star, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Input } from "@/components/ui/Input";

export default function ProductsPage() {
   const { addToCart } = useCart();
   const [searchTerm, setSearchTerm] = React.useState("");

   const filteredProducts = mockProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="space-y-3">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
               <h2 className="text-2xl font-bold tracking-tight text-slate-800">Marketplace</h2>
               <p className="text-muted-foreground mt-1 font-medium">Discover premium products secured via SmartPay Escrow.</p>
            </div>
            <div className="relative w-full md:w-80 group">
               <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
               <Input
                  placeholder="Filter products..."
                  className="pl-10 h-11 bg-white border-slate-200 rounded-2xl focus-visible:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
         </div>

         <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
               <div key={product.id} className="bg-white rounded-xl border border-slate-100 transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-1 group">
                  <Link href={`/product/${product.id}`} className="relative h-56 w-full bg-white flex items-center justify-center p-3 overflow-hidden">
                     <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                     />
                     {product.discountPercentage && (
                        <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[8px] font-black px-2 py-1 rounded-xl border border-primary/20 backdrop-blur-sm">
                           -{product.discountPercentage}%
                        </span>
                     )}
                  </Link>
                  <div className="p-3 flex-1 flex flex-col bg-slate-50/20">
                     <div className="mb-4">
                        <Link href={`/product/${product.id}`}>
                           <h3 className="font-extrabold text-slate-800 text-sm line-clamp-1 group-hover:text-primary transition-colors mb-2 leading-tight">
                              {product.name}
                           </h3>
                        </Link>
                        <div className="flex items-baseline gap-2">
                           <span className="font-black text-sm text-slate-900 leading-none">₦ {product.price.toLocaleString()}</span>
                           {product.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">₦ {product.originalPrice.toLocaleString()}</span>
                           )}
                        </div>
                     </div>

                     <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                           {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`h-3 w-3 ${s <= 4 ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
                           ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">(214)</span>
                     </div>

                     <div className="mt-auto space-y-2">
                        <Button
                           className="w-full h-12 rounded-2xl font-black text-sm uppercase tracking-widest transition-all border-none"
                           onClick={() => addToCart(product)}
                        >
                           <Plus className="h-4 w-4 mr-2 stroke-[3px]" />
                           Add to Cart
                        </Button>
                        <Link href={`/product/${product.id}`} className="block">
                           <Button variant="ghost" className="w-full h-10 rounded-xl font-bold text-slate-400 hover:text-primary hover:bg-primary/5 text-xs">
                              View Details
                           </Button>
                        </Link>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
