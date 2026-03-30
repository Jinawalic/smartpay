"use client";

import { useSearchParams } from "next/navigation";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { mockProducts } from "@/lib/data";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React, { Suspense } from "react";

function DealsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("cat") || "all";

  // Determine which products to show
  let displayProducts = [...mockProducts];
  let pageTitle = "Clearance Sale";

  if (categoryParam === "flash-sales") {
    displayProducts = mockProducts.slice(0, 8); // Example Flash Sales
    pageTitle = "Flash Sales";
  } else if (categoryParam === "limited") {
    displayProducts = mockProducts.slice(4, 12); // Example Limited Deals
    pageTitle = "Limited Stock Deals";
  } else if (categoryParam === "tv" || categoryParam === "electronics") {
    displayProducts = mockProducts.filter(p => p.category === "electronics" || p.category === "tv");
    pageTitle = "TVs & Electronics Deals";
  } else if (categoryParam === "fashion") {
    displayProducts = mockProducts.filter(p => p.category === "fashion");
    pageTitle = "Fashion Deals";
  } else if (categoryParam === "appliance") {
    displayProducts = mockProducts.filter(p => p.category === "appliance");
    pageTitle = "Home Appliances Deals";
  }

  const collections = [
    { name: "Phone Deals", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=100&q=80", cat: "electronics" },
    { name: "Fashion Deals", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80", cat: "fashion" },
    { name: "Supermarket", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&q=80", cat: "all" },
    { name: "Home & Appliances", img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&q=80", cat: "appliance" },
    { name: "Computing Deals", img: "https://images.unsplash.com/photo-1517336714460-4c78274a165a?w=100&q=80", cat: "electronics" },
    { name: "Electronics Deals", img: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100&q=80", cat: "electronics" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PublicNavbar />

      <div className="bg-white px-4 py-3 border-b text-xs md:text-sm text-slate-500 font-medium sticky top-[104px] md:top-[64px] z-30 flex items-center gap-2">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>&gt;</span>
        <span className="text-black font-bold truncate">{pageTitle}</span>
      </div>

      <div className="w-full bg-primary text-white text-center py-4 text-sm font-bold md:text-xl shadow-md">
         CALL TO ORDER 07006000000
      </div>

      <section className="bg-white mb-2 pt-4">
         <div className="bg-primary text-white py-2 text-center font-bold text-lg mb-6 mx-2 rounded-sm shadow-sm uppercase tracking-wide">
            Deal Collections
         </div>
         
         <div className="grid grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-2 px-4 pb-8 text-center">
            {collections.map((cat, idx) => (
               <Link key={idx} href={`/deals?cat=${cat.cat}`} className="flex flex-col items-center gap-2 group">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-slate-50 rounded-full overflow-hidden p-3 shadow-inner border border-slate-100 group-hover:border-primary transition-all group-hover:scale-105">
                     <img src={cat.img} alt={cat.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold leading-tight group-hover:text-primary transition-colors px-1 uppercase tracking-tighter">{cat.name}</span>
               </Link>
            ))}
         </div>
      </section>

      <section className="bg-white shadow-sm mb-6 flex-1 flex flex-col">
         <div className="bg-primary text-white p-3 flex justify-between items-center bg-gradient-to-r from-primary to-primary/80">
            <h3 className="font-bold text-lg">{pageTitle}</h3>
            <span className="text-xs opacity-75">{displayProducts.length} items found</span>
         </div>
         
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-0.5 bg-slate-100">
            {displayProducts.map((product) => (
               <Link key={product.id} href={`/product/${product.id}`} className="bg-white p-3 flex flex-col relative group transition-all hover:z-10 hover:shadow-xl border-slate-50 border-[0.5px]">
                  {product.discountPercentage && (
                     <span className="absolute top-3 right-3 bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded border border-primary/10">
                       -{product.discountPercentage}%
                     </span>
                  )}
                  <div className="h-40 w-full mb-3 bg-white flex items-center justify-center p-2">
                     <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="flex-1 flex flex-col">
                     <h4 className="text-xs text-slate-600 font-medium line-clamp-2 mb-2 leading-snug group-hover:text-primary">{product.name}</h4>
                     <div className="mt-auto">
                        <span className="font-extrabold text-base text-slate-900">₦ {product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                           <div className="text-[10px] text-slate-400 line-through">₦ {product.originalPrice.toLocaleString()}</div>
                        )}
                        <div className="mt-2 text-[10px] text-primary font-bold">In Stock</div>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </section>

      <Footer />
      
      {/* Scrollbar Reset */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

export default function ClearanceDealsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    }>
      <DealsContent />
    </Suspense>
  );
}
