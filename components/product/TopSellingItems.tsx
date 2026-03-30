"use client";

import React from "react";
import Link from "next/link";
import { mockProducts } from "@/lib/data";
import { ChevronRight } from "lucide-react";

export function TopSellingItems() {
  // Take a few items for "Top selling"
  const items = mockProducts.slice(0, 6);

  return (
    <section className="bg-white shadow-sm mt-6 mb-6 rounded-lg overflow-hidden border border-slate-100">
      <div className="p-3 flex justify-between items-center border-b border-slate-50">
        <h3 className="font-bold text-lg text-slate-800">Top selling items</h3>
        <Link href="/deals" className="text-sm font-bold text-primary hover:underline flex items-center">
          See All <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
      
      <div className="flex overflow-x-auto pb-4 pt-4 hide-scrollbar snap-x px-3 gap-3">
        {items.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="min-w-[150px] max-w-[170px] flex-shrink-0 snap-start group bg-white border border-slate-50 rounded-lg p-2 hover:shadow-md transition-shadow">
            <div className="relative h-32 w-full mb-2 bg-white flex items-center justify-center">
              {product.discountPercentage && (
                <span className="absolute top-0 right-0 bg-primary/10 text-primary text-[10px] font-bold px-1.5 py-0.5 rounded">
                  -{product.discountPercentage}%
                </span>
              )}
              <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
            </div>
            <div className="space-y-1">
              <h4 className="text-[11px] text-slate-600 font-medium line-clamp-2 leading-tight group-hover:text-primary">{product.name}</h4>
              <div className="font-extrabold text-sm text-slate-900">₦ {product.price.toLocaleString()}</div>
            </div>
          </Link>
        ))}
      </div>
      
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
