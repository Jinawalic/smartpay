"use client";

import React from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { TopSellingItems } from "@/components/product/TopSellingItems";
import { Mail, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/buyer" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">Inbox Messages</h1>
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden text-center py-16 px-6">
           <div className="relative inline-flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <Mail className="w-12 h-12 text-primary" />
              </div>
              <span className="absolute top-0 right-0 bg-primary/20 text-primary border border-primary/30 w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm shadow-sm backdrop-blur-sm">
                0
              </span>
           </div>
           
           <h2 className="text-xl font-extrabold text-slate-800 mb-3">You don't have any messages</h2>
           <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
             Here you will be able to see all the messages that we send you. Stay tuned for deals, updates and more.
           </p>
        </section>

        {/* Top Selling Section as requested */}
        <div className="mt-8">
           <TopSellingItems />
        </div>
      </main>

      <Footer />
    </div>
  );
}
