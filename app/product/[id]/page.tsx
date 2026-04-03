"use client";

import { use, useState } from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { Card, CardContent } from "@/components/ui/Card";
import { notFound, useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { ShoppingCart, ShieldCheck, Tag, Box, Star, Truck, Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
   const unwrappedParams = use(params);
   const productId = unwrappedParams.id;
   const { addToCart } = useCart();
   const [quantity, setQuantity] = useState(1);
   const [searchTerm, setSearchTerm] = useState("");
   const router = useRouter();

   const product = mockProducts.find(p => p.id === productId);

   if (!product) {
      notFound();
   }

   const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && searchTerm.trim()) {
         router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      }
   };

   // Related products (exclude current)
   const relatedProducts = mockProducts.filter(p => p.id !== product.id).slice(0, 4);

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
         <PublicNavbar />

         <main className="flex-1 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

               {/* Search bar inside Product Page */}
               <div className="mb-8 relative max-w-2xl mx-auto md:hidden">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                     placeholder="Search for other products..."
                     className="pl-10 h-10 bg-white border-slate-200 shadow-sm rounded-xl"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     onKeyDown={handleSearch}
                  />
               </div>

               <div className="bg-white px-6 py-2 border-slate-200 border rounded-2xl text-[10px] md:text-sm text-slate-500 font-medium mb-8 flex items-center gap-2">
                  <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                  <span>&gt;</span>
                  <Link href="/buyer/products" className="hover:text-primary transition-colors">Products</Link>
                  <span>&gt;</span>
                  <span className="text-slate-900 font-bold truncate">{product.name}</span>
               </div>

               {/* Product Overview */}
               <div className="grid md:grid-cols-2 gap-4 lg:gap-8 mb-6 bg-white p-4 md:p-6 rounded-xl border border-slate-100">
                  {/* Product Image */}
                  <div className="rounded-xl overflow-hidden bg-white border border-slate-50 aspect-square relative shadow-inner p-3 flex items-center justify-center group">
                     <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                     />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col">
                     <div className="mb-2 p-2 bg-primary/5 rounded-xl border self-start text-[10px] font-black uppercase tracking-widest text-primary">
                        {product.category || "Premium Quality"}
                     </div>

                     <div className="mb-2">
                        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 mb-3 leading-tight">
                           {product.name}
                        </h1>
                        <div className="flex items-center gap-6 mb-3">
                           <div className="flex flex-col">
                              <span className="text-xl font-bold text-primary">₦ {product.price.toLocaleString()}</span>
                              {product.originalPrice && (
                                 <span className="text-sm text-slate-400 line-through">₦ {product.originalPrice.toLocaleString()}</span>
                              )}
                           </div>
                           <div className="h-10 w-[1px] bg-slate-100"></div>
                           <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-xl text-amber-700 border border-amber-100">
                              <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                              <span className="font-bold text-sm">4.8</span>
                              <span className="text-amber-600/60 text-[10px] font-medium">(240 Reviews)</span>
                           </div>
                        </div>
                        <p className="text-base leading-relaxed text-slate-600 border-l-4 border-primary/20 pl-4 py-2 font-medium">
                           {product.description}
                        </p>
                     </div>

                     {/* Escrow Trust Badge */}
                     <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex gap-5 mb-3 group hover:border-emerald-200 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                           <ShieldCheck className="h-7 w-7 text-emerald-600" />
                        </div>
                        <div>
                           <h4 className="font-black text-emerald-900 text-sm uppercase tracking-wider">SmartPay Escrow Protection</h4>
                           <p className="text-emerald-800/70 mt-1 text-[11px] leading-relaxed font-medium">
                              Your funds are safe. We hold your payment securely and only release it to the seller after you confirm that the product is delivered and satisfactory.
                           </p>
                        </div>
                     </div>

                     <div className="space-y-3 mt-2">
                        {/* Add to Cart Controls */}
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                           <div className="flex items-center border-2 border-slate-100 rounded-[1.25rem] bg-white p-1 h-14 w-full sm:w-auto shadow-sm">
                              <button
                                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                 className="w-12 h-full flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 hover:text-primary rounded-xl font-bold text-xl"
                              >
                                 -
                              </button>
                              <div className="w-12 text-center font-black text-slate-800">{quantity}</div>
                              <button
                                 onClick={() => setQuantity(quantity + 1)}
                                 className="w-12 h-full flex items-center justify-center hover:bg-slate-50 transition-colors text-slate-400 hover:text-primary rounded-xl font-bold text-xl"
                              >
                                 +
                              </button>
                           </div>
                           <Button
                              size="lg"
                              className="w-full sm:flex-1 h-16 text-sm rounded-[1.25rem] font-black transition-transform active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
                              onClick={() => addToCart(product, quantity)}
                           >
                              <ShoppingCart className="h-5 w-5" />
                              Add to Cart
                           </Button>
                        </div>

                        {/* Extra details */}
                        <div className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-slate-100">
                           <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50">
                              <Truck className="h-5 w-5 text-slate-400" />
                              <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Fast Escrow Delivery</span>
                           </div>
                           <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50/50">
                              <Box className="h-5 w-5 text-slate-400" />
                              <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">Verified Seller</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Recommended Products */}
               {relatedProducts.length > 0 && (
                  <div className="pt-12">
                     <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Recommended For You</h2>
                        <Link href="/buyer/products" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                           View All <ChevronRight className="h-4 w-4" />
                        </Link>
                     </div>
                     <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((p) => (
                           <div key={p.id} className="group bg-white rounded-xl border border-slate-100 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-1">
                              <Link href={`/product/${p.id}`} className="block relative h-40 md:h-52 w-full overflow-hidden bg-white p-4">
                                 <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply"
                                 />
                                 {p.discountPercentage && (
                                    <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] font-bold px-2 py-1 rounded">
                                       -{p.discountPercentage}%
                                    </span>
                                 )}
                              </Link>
                              <div className="p-4 flex-1 flex flex-col bg-slate-50/30">
                                 <Link href={`/product/${p.id}`} className="hover:text-primary transition-colors h-10">
                                    <h3 className="font-bold text-slate-800 text-sm md:text-base line-clamp-2 mb-2 leading-tight">{p.name}</h3>
                                 </Link>
                                 <div className="mt-auto">
                                    <span className="font-black text-primary text-base md:text-xl">₦ {p.price.toLocaleString()}</span>
                                    <div className="mt-4">
                                       <Button
                                          variant="outline"
                                          className="w-full rounded-2xl h-10 font-bold border-slate-200 hover:bg-primary hover:text-white hover:border-primary text-xs"
                                          onClick={() => addToCart(p)}
                                       >
                                          Add to Cart
                                       </Button>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         </main>

         <Footer />
      </div>
   );
}
