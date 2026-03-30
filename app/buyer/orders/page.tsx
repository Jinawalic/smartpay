"use client";

import React from "react";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { TopSellingItems } from "@/components/product/TopSellingItems";
import { Package, ChevronLeft, Calendar, User, Search, MapPin, Truck } from "lucide-react";
import Link from "next/link";
import { mockOrders } from "@/lib/data";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <PublicNavbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/buyer" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Your Orders</h1>
          </div>
          
          <div className="flex overflow-x-auto gap-3 pb-2 hide-scrollbar">
            {["All", "Pending", "Shipped", "Delivered", "Completed"].map((status) => (
              <button 
                key={status} 
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold border transition-all ${
                   status === "All" ? "bg-primary text-white border-primary shadow-lg shadow-primary/30" : "bg-white text-slate-600 border-slate-200 hover:border-primary/50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {mockOrders.length > 0 ? (
          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <section className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden text-center py-20 px-8">
             <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Package className="w-12 h-12 text-primary" />
             </div>
             <h2 className="text-2xl font-extrabold text-slate-800 mb-4">No orders placed yet</h2>
             <p className="text-sm text-slate-500 max-w-sm mx-auto mb-10 leading-relaxed font-medium">
               Explore our vast category of items and start filling your cart!
             </p>
             <Link href="/">
               <button className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-xl shadow-primary/30 active:scale-95">
                 Start Shopping
               </button>
             </Link>
          </section>
        )}

        {/* Top Selling Section as requested */}
        <div className="mt-16">
           <TopSellingItems />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Card({ order }: { order: any }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-orange-100 text-orange-600 border-orange-200";
      case "shipped": return "bg-blue-100 text-blue-600 border-blue-200";
      case "delivered": return "bg-green-100 text-green-600 border-green-200";
      case "completed": return "bg-emerald-600 text-white border-emerald-700";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group">
       <div className="p-6 border-b border-slate-50 flex flex-wrap justify-between items-center bg-slate-50/50">
          <div className="flex flex-col">
             <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">Order Tracking No.</span>
             <span className="font-mono font-bold text-slate-800 text-lg group-hover:text-primary transition-colors">{order.trackingCode}</span>
          </div>
          <div className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-tight border shadow-sm ${getStatusColor(order.status)}`}>
             {order.status}
          </div>
       </div>
       
       <div className="p-8 grid md:grid-cols-2 gap-10">
          <div className="flex gap-6">
             <div className="relative w-28 h-28 aspect-square rounded-2xl overflow-hidden bg-white border border-slate-100 shrink-0 p-3 shadow-inner group-hover:scale-105 transition-transform">
                <img 
                  src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=200&q=80" 
                  className="w-full h-full object-contain mix-blend-multiply" 
                  alt="Order item"
                />
             </div>
             <div className="flex flex-col justify-center">
                <h4 className="font-extrabold text-slate-800 text-lg leading-tight mb-2 line-clamp-1">Premium Order Item</h4>
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold mb-4">
                   <Calendar className="w-3.5 h-3.5" />
                   <span>Placed: 12 July 2024</span>
                </div>
                <div className="text-2xl font-black text-primary">₦ {order.amount.toLocaleString()}</div>
             </div>
          </div>
          
          <div className="flex flex-col justify-center border-l border-slate-50 pl-10">
             <div className="flex items-start gap-4 mb-6">
                <div className="mt-1 bg-slate-100 p-2.5 rounded-xl text-slate-500">
                   <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter mb-0.5">Shipping Destination</span>
                   <span className="text-sm font-bold text-slate-700 leading-snug">{order.deliveryAddress || "Lekki Phase 1, Lagos, Nigeria"}</span>
                </div>
             </div>
             <Link href={`/buyer/track?id=${order.id}`} className="w-full">
               <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-slate-200 active:scale-[0.98]">
                 <Truck className="w-5 h-5" />
                 <span>Track & View Details</span>
               </button>
             </Link>
          </div>
       </div>
    </div>
  );
}
