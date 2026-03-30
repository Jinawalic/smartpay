"use client";

import React from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { TopSellingItems } from "@/components/product/TopSellingItems";
import { History, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function RecentlyViewedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/buyer" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Recently Viewed</h1>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-12 flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
               <History className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-500 mb-8 max-w-xs text-center">Items you've recently looked at will appear here to help you get back to them quickly.</p>
            <Link href="/">
               <button className="text-primary font-bold text-sm hover:underline">Continue Searching</button>
            </Link>
        </div>

        <div className="mt-8">
           <TopSellingItems />
        </div>
      </main>

      <Footer />
    </div>
  );
}
