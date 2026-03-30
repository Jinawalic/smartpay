"use client";

import { use, useState } from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, ShieldCheck, Tag, Box, Star, Truck } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
   const unwrappedParams = use(params);
   const productId = unwrappedParams.id;
   const { addToCart } = useCart();
   const [quantity, setQuantity] = useState(1);

   const product = mockProducts.find(p => p.id === productId);

   if (!product) {
      notFound();
   }

   // Related products (exclude current)
   const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 4);

   return (
      <div className="min-h-screen bg-background flex flex-col">
         <PublicNavbar />

         <main className="flex-1 py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
               {/* Product Overview */}
               <div className="grid md:grid-cols-2 gap-12 mb-16">
                  {/* Product Image */}
                  <div className="rounded-2xl overflow-hidden bg-muted border border-border aspect-square relative shadow-sm">
                     <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                     />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col">
                     <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
                           {product.name}
                        </h1>
                        <div className="flex items-center gap-4 mb-4">
                           <span className="text-2xl font-extrabold text-primary">${product.price.toLocaleString()}</span>
                           <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="font-semibold">4.8</span>
                              <span className="text-muted-foreground">(240 reviews)</span>
                           </div>
                        </div>
                        <p className="text-lg text-muted-foreground">
                           {product.description}
                        </p>
                     </div>

                     {/* Escrow Trust Badge */}
                     <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-4 mb-8 text-sm">
                        <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
                        <div>
                           <h4 className="font-semibold text-foreground">100% Escrow Protection</h4>
                           <p className="text-muted-foreground mt-1 text-sm">Your payment stays fully secured by SmartPay. We only release it to the seller when you receive and confirm the delivery.</p>
                        </div>
                     </div>

                     <div className="space-y-6 mt-auto">
                        {/* Add to Cart Controls */}
                        <div className="flex items-center gap-4">
                           <div className="flex items-center border border-border rounded-xl bg-card overflow-hidden h-12">
                              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 h-full hover:bg-muted text-foreground transition-colors">-</button>
                              <div className="w-12 text-center font-semibold">{quantity}</div>
                              <button onClick={() => setQuantity(quantity + 1)} className="px-4 h-full hover:bg-muted text-foreground transition-colors">+</button>
                           </div>
                           <Button
                              size="lg"
                              className="flex-1 h-12 text-sm shadow-sm"
                              onClick={() => {
                                 addToCart(product, quantity);
                                 alert(`${quantity} ${product.name}(s) added to cart.`);
                              }}
                           >
                              <ShoppingCart className="h-5 w-5 mr-3" />
                              Add to Cart
                           </Button>
                        </div>

                        {/* Extra details */}
                        <ul className="grid grid-cols-2 gap-y-3 pt-6 border-t border-border text-sm text-muted-foreground">
                           <li className="flex items-center gap-2"><Truck className="h-4 w-4" /> Fast Delivery Available</li>
                           <li className="flex items-center gap-2"><Box className="h-4 w-4" /> Condition: Brand New</li>
                           <li className="flex items-center gap-2"><Tag className="h-4 w-4" /> Category: Electronics</li>
                        </ul>
                     </div>
                  </div>
               </div>

               {/* Recommended Products */}
               {relatedProducts.length > 0 && (
                  <div className="pt-12 border-t border-border">
                     <h2 className="text-xl md:text-2xl font-bold mb-8">Recommended Products</h2>
                     <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((p) => (
                           <Card key={p.id} className="hover:shadow-md transition-shadow group overflow-hidden border-border flex flex-col h-full bg-white">
                              <Link href={`/product/${p.id}`} className="block relative h-40 md:h-48 w-full overflow-hidden bg-white p-2">
                                 <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                                 />
                              </Link>
                              <CardContent className="p-3 md:p-4 flex-1 flex flex-col">
                                 <Link href={`/product/${p.id}`} className="hover:text-primary transition-colors">
                                    <h3 className="font-semibold text-xs md:text-base line-clamp-1 mb-1">{p.name}</h3>
                                 </Link>
                                 <span className="font-bold text-primary text-sm md:text-base">₦ {p.price.toLocaleString()}</span>
                              </CardContent>
                           </Card>
                        ))}
                     </div>
                     
                     {/* Pagination */}
                     <div className="mt-12 flex items-center justify-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 w-24">Previous</Button>
                        <div className="flex gap-1">
                           <Button size="sm" className="h-8 w-8 p-0">1</Button>
                           <Button variant="ghost" size="sm" className="h-8 w-8 p-0">2</Button>
                           <Button variant="ghost" size="sm" className="h-8 w-8 p-0">3</Button>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 w-24">Next</Button>
                     </div>
                  </div>
               )}
            </div>
         </main>

         <Footer />
      </div>
   );
}
