"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { mockOrders, mockProducts } from "@/lib/data";
import { MapPin, Navigation, Package, Truck, CheckCircle2, ChevronRight, Phone, MessageSquare, Clock, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ToastProvider";

export default function RiderDeliveriesPage() {
  const { showToast } = useToast();
  // Filter active deliveries for rider-1
  const activeDeliveries = mockOrders.filter(o => o.riderId === "rider-1" && (o.status === "shipped" || o.status === "out-for-delivery"));
  
  const getProduct = (id: string) => mockProducts.find(p => p.id === id);

  const updateStatus = (id: string, status: string) => {
    showToast(`Delivery ${id} status updated to ${status}!`, "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Assigned Deliveries</h2>
          <p className="text-muted-foreground font-medium italic text-sm">Real-time logistics management for your current route.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
           <Badge variant="outline" className="px-4 py-2 text-[10px] uppercase font-black tracking-widest bg-success/10 text-success border-none animate-pulse">
              System: Online
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Main Delivery List */}
         <div className="lg:col-span-2 space-y-6">
            {activeDeliveries.map((delivery) => {
              const product = getProduct(delivery.productId);
              return (
                <Card key={delivery.id} className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden bg-white hover:border-primary/30 transition-all group">
                   <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                            <Truck className="h-6 w-6" />
                         </div>
                         <div>
                            <CardTitle className="text-lg font-black uppercase tracking-tight">{delivery.id}</CardTitle>
                            <CardDescription className="text-xs font-bold text-primary flex items-center gap-1">
                               <Clock className="h-3 w-3" /> Pickup by 2:00 PM
                            </CardDescription>
                         </div>
                      </div>
                      <Badge className={`rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest border-none ${
                         delivery.status === 'shipped' ? 'bg-amber-50 text-amber-600' : 'bg-primary/10 text-primary'
                      }`}>
                         {delivery.status === 'shipped' ? 'Ready for Pickup' : 'In Transit'}
                      </Badge>
                   </CardHeader>
                   
                   <CardContent className="p-8 grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                         <div className="relative">
                            {/* Vertical Line Connector */}
                            <div className="absolute left-[11px] top-[24px] bottom-1 w-[2px] bg-slate-100 border-dashed border-l-2 border-slate-200"></div>
                            
                            <div className="flex items-start gap-5 relative z-10">
                               <div className="h-6 w-6 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center ring-1 ring-slate-100 shadow-sm">
                                  <div className="h-2 w-2 rounded-full bg-slate-400" />
                               </div>
                               <div className="flex-1 space-y-1">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pickup Location</p>
                                  <p className="text-sm font-bold text-slate-800 uppercase">Seller Hub #1 · VI Lagos</p>
                                  <p className="text-xs text-slate-500 font-medium italic">123 Victoria Island, Lagos State</p>
                               </div>
                            </div>

                            <div className="flex items-start gap-5 mt-8 relative z-10">
                               <div className="h-6 w-6 rounded-full bg-primary/20 border-4 border-white flex items-center justify-center ring-1 ring-primary/20 shadow-sm">
                                  <div className="h-2 w-2 rounded-full bg-primary" />
                               </div>
                               <div className="flex-1 space-y-1">
                                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Destination Address</p>
                                  <p className="text-sm font-bold text-slate-800 uppercase">Private Residence</p>
                                  <p className="text-xs text-slate-500 font-medium italic leading-relaxed">{delivery.deliveryAddress}</p>
                               </div>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-6 flex flex-col justify-between">
                         <div className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
                            <div className="flex items-center gap-4">
                               <div className="h-12 w-12 rounded-xl bg-white border border-slate-100 p-2 overflow-hidden shadow-sm shrink-0">
                                  <img src={product?.image} className="h-full w-full object-contain mix-blend-multiply" alt="" />
                               </div>
                               <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Parcel Contents</p>
                                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{product?.name}</p>
                                  <p className="text-[10px] font-black text-primary uppercase mt-0.5">Fragile · Box-Small</p>
                               </div>
                            </div>
                         </div>

                         <div className="flex gap-3">
                            {delivery.status === 'shipped' ? (
                               <Button onClick={() => updateStatus(delivery.id, 'picked_up')} className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary shadow-lg shadow-primary/20 border-none transition-all active:scale-95">
                                  Confirm Pickup
                               </Button>
                            ) : (
                               <Button onClick={() => updateStatus(delivery.id, 'delivered')} className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest bg-success border-none shadow-lg shadow-success/20 transition-all active:scale-95 text-white">
                                  Complete Delivery
                               </Button>
                            )}
                            <Link href={`/rider/delivery/${delivery.id}`} className="flex-1">
                               <Button variant="outline" className="w-full h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 text-slate-500 hover:text-primary transition-all">
                                  View Routes
                               </Button>
                            </Link>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              );
            })}
            
            {activeDeliveries.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white/50 rounded-[3rem] border border-dashed border-slate-200">
                <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                   <Package className="h-10 w-10" />
                </div>
                <div>
                   <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">No Active Loads</h3>
                   <p className="text-sm text-slate-400 font-medium italic">You are currently all caught up on your scheduled deliveries.</p>
                </div>
                <Button className="rounded-full px-8 h-11 border-none shadow-xl shadow-primary/20 bg-primary">
                   Check for New Jobs
                </Button>
              </div>
            )}
         </div>

         {/* Sidebar Stats & Status */}
         <div className="space-y-6">
            <Card className="bg-slate-900 border-none rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
               <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Navigation className="h-48 w-48 rotate-12" />
               </div>
               <div className="relative z-10 space-y-8 text-center flex flex-col items-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Real-time Status</p>
                  <div className="h-24 w-24 rounded-full border-4 border-primary/30 flex items-center justify-center relative">
                     <div className="absolute inset-2 rounded-full border border-primary animate-ping" />
                     <Navigation className="h-10 w-10 text-primary" />
                  </div>
                  <div className="space-y-1">
                     <h3 className="text-2xl font-black italic tracking-tighter uppercase">Heading North</h3>
                     <p className="text-[10px] font-bold text-white/60 tracking-widest uppercase">Approaching VI Junction</p>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-2/3" />
                  </div>
               </div>
            </Card>

            <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden bg-white">
               <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Quick Connect</CardTitle>
               </CardHeader>
               <CardContent className="p-6 space-y-3">
                  <Button variant="outline" className="w-full flex items-center justify-between h-14 rounded-2xl border-slate-100 px-5 group hover:border-primary/30 transition-all">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center"><Phone className="h-5 w-5" /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">SmartPay Dispatch</span>
                     </div>
                     <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-between h-14 rounded-2xl border-slate-100 px-5 group hover:border-primary/30 transition-all">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center"><MessageSquare className="h-5 w-5" /></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Rider Community</span>
                     </div>
                     <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary" />
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
