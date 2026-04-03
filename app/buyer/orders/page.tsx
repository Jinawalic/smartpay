"use client";

import React from "react";
import { Package, ChevronLeft, Calendar, User, Search, MapPin, Truck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { mockOrders, mockProducts } from "@/lib/data";

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = React.useState("All");

  const filteredOrders = mockOrders.filter((order) => {
    if (activeStatus === "All") return true;
    return order.status.toLowerCase() === activeStatus.toLowerCase();
  });

  const statuses = ["All", "Pending", "Shipped", "Completed"];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order History</h1>
        <p className="text-slate-500 text-sm font-medium">
          Check the status of recent orders, manage returns, and discover similar products
        </p>
      </div>

      {/* Global Filter Bar - Styled like the card header in the image */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-3 bg-slate-50/50 flex flex-wrap items-center justify-between gap-4">
          <div className="flex bg-white rounded-lg border border-slate-200 p-0.5">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-6 py-2 rounded-md text-xs font-bold transition-all ${activeStatus === status
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-500 hover:text-primary hover:bg-slate-50"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="hidden md:flex gap-4 px-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest items-center border-l border-slate-200 ml-4">
            <div className="flex flex-col">
              <button className="px-5 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm">
                View Invoice
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              activeStatus={activeStatus}
              setActiveStatus={setActiveStatus}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-20 text-center">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-800 mb-2">No {activeStatus !== "All" ? activeStatus : ""} orders found</h3>
            <p className="text-slate-500 text-sm mb-6">We couldn't find any orders matching your current filter.</p>
            <button
              onClick={() => setActiveStatus("All")}
              className="text-primary font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

function OrderCard({ order, activeStatus, setActiveStatus }: { order: any, activeStatus: string, setActiveStatus: (s: string) => void }) {
  const product = mockProducts.find(p => p.id === order.productId) || mockProducts[0];
  const statuses = ["All", "Pending", "Shipped", "Completed"];

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300">
      {/* Order Item - Matching image layout */}
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <div className="w-28 md:w-28 h-28 md:h-28 bg-white rounded-xl border border-slate-100 p-3 flex items-center justify-center shrink-0 shadow-inner">
            <img
              src={product.image}
              className="w-28 h-28 object-contain mix-blend-multiply"
              alt={product.name}
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <h4 className="font-semibold text-slate-900 text-sm md:text-sm tracking-tight uppercase">{product.name}</h4>
                <div className="flex flex-col gap-1 mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Quantity: 01</span>
                  <span>Escrow Tracking: #{order.id || "ORD-277829"}</span>
                </div>
              </div>
              <span className="text-sm md:text-sm font-bold text-slate-900">₦ {product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>

            {/* Status & Actions - Bottom row */}
            <div className="flex flex-wrap items-center justify-between mt-2 pt-2 border-t border-slate-50 md:mt-2 md:pt-4">
              <div className="flex items-center gap-3">
                <div className={`h-4 w-4 rounded-full flex items-center justify-center ${order.status === 'completed' ? 'bg-success' : 'bg-primary'}`}>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm text-slate-700">
                  {order.status === 'completed' ? 'Delivered' : order.status.charAt(0).toUpperCase() + order.status.slice(1)} on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center gap-8 mt-4 sm:mt-0">
                <Link href={`/product/${product.id}`} className="text-[10px] uppercase font-black tracking-[0.2em] text-primary hover:underline">
                  View Product
                </Link>
                <div className="hidden sm:block w-[1px] h-4 bg-slate-200" />
                <button className="text-[10px] uppercase font-black tracking-[0.2em] text-primary hover:underline">
                  Buy Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
