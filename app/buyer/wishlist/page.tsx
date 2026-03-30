"use client";

import React from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { TopSellingItems } from "@/components/product/TopSellingItems";
import { Heart, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/buyer" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Your Wishlist</h1>
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden text-center py-16 px-6">
           <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-primary fill-primary" />
           </div>
           
           <h2 className="text-xl font-extrabold text-slate-800 mb-3">Your wishlist is empty</h2>
           <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed mb-8">
             Found something you like? Tap on the heart icon to save it here for later.
           </p>
           <Link href="/">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-primary/90 transition-colors">
                G0 Shopping
              </button>
           </Link>
        </section>

        <div className="mt-8">
           <TopSellingItems />
        </div>
      </main>

      <Footer />
    </div>
  );
}
