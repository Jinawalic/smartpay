"use client";

import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/lib/data";
import Link from "next/link";
import { ChevronRight, Zap } from "lucide-react";

export default function Home() {
   const flashSales = mockProducts.slice(0, 4);
   const limitedDeals = mockProducts.slice(4, 8);
   const trendyFashion = mockProducts.slice(0, 3);

   const categoryDeals = [
      {
         title: "Awoof of the Month",
         label: "Awoof deals",
         image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
         cat: "flash-sales"
      },
      {
         title: "CLEARANCE SALES",
         label: "Up to 80% Off",
         image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80",
         cat: "limited"
      },
      {
         title: "SMARTPAY FORCE",
         label: "Earn While You Shop",
         image: "https://images.unsplash.com/photo-1556742049-02e53f82c8b0?w=400&q=80",
         cat: "appliance"
      },
      {
         title: "MEN'S FASHION",
         label: "Men Fashion",
         image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400&q=80",
         cat: "fashion"
      },
   ];

   return (
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
         <PublicNavbar />

         {/* Top Banner - Call to order */}
         <div className="w-full bg-primary text-white text-center py-2 text-sm font-semibold sticky top-[64px] z-30 shadow-md">
            CALL TO ORDER: 07006000000, 020188833...
         </div>

         {/* Hero / Promo Banner Slider Container */}
         <section className="bg-white p-2">
            <div className="w-full h-[180px] md:h-[350px] rounded-lg overflow-hidden relative shadow-sm">
               <img
                  src="https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=1000&q=80"
                  alt="Promo Banner"
                  className="w-full h-full object-cover"
               />
               {/* Overlay styled like the mock design but using primary color */}
               <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
                  <h1 className="text-2xl md:text-5xl font-extrabold mb-4 drop-shadow-lg leading-tight max-w-lg">
                     Empowering Secure <br />Commerce via Escrow
                  </h1>
                  <div className="flex gap-4">
                     <span className="bg-white text-primary px-4 py-2 rounded-lg text-sm font-bold uppercase shadow-lg tracking-wider">
                        Free Delivery
                     </span>
                  </div>
               </div>
            </div>
         </section>

         {/* High-Impact Category Deal Grid */}
         <section className="bg-white px-2 py-4 shadow-sm mb-2">
            <div className="grid grid-cols-4 gap-2 text-center text-xs font-medium">
               {categoryDeals.map((deal, idx) => (
                  <Link key={idx} href={`/deals?cat=${deal.cat}`} className="flex flex-col items-center gap-2 group">
                     <div className="relative w-full aspect-square rounded-lg overflow-hidden flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-[1.02] transition-transform duration-300">
                        <img src={deal.image} className="absolute inset-0 w-full h-full object-cover" alt={deal.title} />
                        {/* Overlay for text legibility */}
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/40 transition-colors"></div>
                        <div className="relative z-10 font-bold p-1 leading-tight text-white flex items-center justify-center h-full text-[10px] md:text-sm uppercase tracking-tighter">
                           {deal.title}
                        </div>
                     </div>
                     <span className="text-[10px] md:text-xs text-slate-600 font-bold truncate group-hover:text-primary transition-colors">{deal.label}</span>
                  </Link>
               ))}
            </div>
         </section>

         {/* Flash Sales Section */}
         <section className="bg-white shadow-sm mb-2 rounded-lg overflow-hidden border border-slate-100 mx-1 md:mx-4">
            <div className="bg-primary text-white p-3 flex justify-between items-center bg-gradient-to-r from-primary to-primary/80">
               <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-white fill-white animate-pulse" />
                  <div>
                     <h3 className="font-bold text-lg leading-none">Flash Sales</h3>
                     <div className="text-[10px] font-semibold tracking-wider opacity-90 mt-1 uppercase">TIME LEFT: <span className="font-mono">12h : 08m : 11s</span></div>
                  </div>
               </div>
               <Link href="/deals?cat=flash-sales" className="text-sm font-bold hover:underline flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
                  See All <ChevronRight className="w-4 h-4 ml-1" />
               </Link>
            </div>

            <div className="flex overflow-x-auto pb-4 pt-4 hide-scrollbar snap-x px-3">
               {flashSales.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="min-w-[140px] max-w-[160px] flex-shrink-0 snap-start mr-3 group">
                     <div className="bg-white h-full flex flex-col relative rounded-md overflow-hidden border border-slate-50">
                        <span className="absolute top-2 right-2 bg-primary/10 text-primary text-[10px] font-extrabold px-1.5 py-1 rounded-sm z-10 border border-primary/20 backdrop-blur-sm">
                           -{product.discountPercentage}%
                        </span>
                        <div className="h-40 w-full mb-2 bg-white relative p-2">
                           <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 p-2">
                           <h4 className="text-[11px] text-slate-700 font-medium line-clamp-2 group-hover:text-primary transition-colors mb-1">{product.name}</h4>
                           <span className="font-extrabold text-sm text-slate-900">₦ {product.price.toLocaleString()}</span>
                           {product.stockLeft !== undefined && (
                              <div className="mt-2 text-[10px] text-slate-500 flex flex-col gap-1">
                                 <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                                    <div className="bg-primary h-full" style={{ width: `${Math.min(100, product.stockLeft * 2)}%` }}></div>
                                 </div>
                                 <span className="font-bold text-slate-600">{product.stockLeft} items left</span>
                              </div>
                           )}
                        </div>
                     </div>
                  </Link>
               ))}
            </div>
         </section>

         {/* Limited Stock Deals (Section Wrapper for consistent look) */}
         <section className="bg-white shadow-sm mb-2 rounded-lg overflow-hidden border border-slate-100 mx-1 md:mx-4">
            <div className="bg-primary text-white p-3 flex justify-between items-center bg-gradient-to-r from-primary to-primary/80">
               <h3 className="font-bold text-lg">Limited Stock Deals</h3>
               <Link href="/deals?cat=limited" className="text-sm font-bold hover:underline flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm transition-colors">
                  See All <ChevronRight className="w-4 h-4 ml-1" />
               </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 bg-slate-100">
               {limitedDeals.map((product) => (
                  <Link key={product.id} href={`/product/${product.id}`} className="bg-white p-3 flex flex-col relative group transition-all hover:z-10 hover:shadow-xl border-slate-50 border-[0.5px]">
                     <span className="absolute top-3 right-3 bg-primary/5 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded border border-primary/10">
                        -{product.discountPercentage}%
                     </span>
                     <div className="h-44 w-full mb-3 bg-white flex items-center justify-center p-2">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                     </div>
                     <div className="flex-1 flex flex-col">
                        <h4 className="text-xs text-slate-600 font-medium line-clamp-2 mb-2 leading-snug group-hover:text-primary">{product.name}</h4>
                        <span className="font-extrabold text-base text-slate-900">₦ {product.price.toLocaleString()}</span>
                        <span className="text-[10px] text-slate-400 line-through">₦ {product.originalPrice?.toLocaleString()}</span>
                     </div>
                  </Link>
               ))}
            </div>
         </section>

         {/* New Section: Top Rated Lifestyle Collections */}
         <section className="bg-white shadow-sm mb-6 rounded-lg overflow-hidden border border-slate-100 mx-1 md:mx-4">
            <div className="bg-primary text-white p-3 flex items-center justify-between">
               <h3 className="font-extrabold tracking-tight uppercase text-sm italic">Top Rated Collections</h3>
               <Link href="/deals?cat=category" className="text-xs font-bold hover:underline uppercase tracking-widest flex items-center">
                  View <ChevronRight className="w-3 h-3 ml-1" />
               </Link>
            </div>
            <div className="p-4 grid grid-cols-4 gap-2">
               {trendyFashion.map((p, idx) => (
                  <Link key={idx} href={`/product/${p.id}`} className="flex flex-col gap-1 items-center group">
                     <div className="w-full aspect-square rounded-xl border-2 border-primary/20 overflow-hidden relative p-2 bg-slate-50 group-hover:border-primary transition-all">
                        <img src={p.image} className="w-full h-full object-contain mix-blend-multiply" alt={p.name} />
                     </div>
                     <span className="text-[9px] font-bold text-center text-slate-700 uppercase truncate w-full">{p.category}</span>
                  </Link>
               ))}
            </div>
         </section>

         <Footer />

         {/* Global Scrollbar Reset injected style */}
         <style dangerouslySetInnerHTML={{
            __html: `
        .hide-scrollbar::-webkit-scrollbar { display: block; }
        .hide-scrollbar { -ms-overflow-style: block; scrollbar-width: block; }
      `}} />
      </div>
   );
}

