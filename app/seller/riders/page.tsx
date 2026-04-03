"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { mockOrders, mockProducts } from "@/lib/data";
import { Truck, Star, MapPin, BadgeCheck, Search, Filter, ShieldCheck, Phone, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ToastProvider";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

function RidersPageContent() {
   const searchParams = useSearchParams();
   const orderId = searchParams.get("orderId");
   const router = useRouter();
   const { showToast } = useToast();
   const [searchTerm, setSearchTerm] = React.useState("");

   const mockRiders = [
      { id: "RD-1012", name: "Mustapha Adebayo", rating: 4.9, completed: 852, status: "available", location: "Ikeja, Lagos", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80" },
      { id: "RD-2041", name: "Chidi Okafor", rating: 4.8, completed: 421, status: "available", location: "Lekki, Lagos", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
      { id: "RD-3082", name: "Emeka Nwosu", rating: 4.7, completed: 1250, status: "busy", location: "Victoria Island, Lagos", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
      { id: "RD-4412", name: "Bola Tinubu", rating: 4.9, completed: 50, status: "available", location: "Surulere, Lagos", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
   ];

   const handleChooseRider = (riderName: string) => {
      if (orderId) {
         showToast(`${riderName} has been assigned to Order ${orderId}!`, "success");
         setTimeout(() => router.push("/seller/orders"), 1500);
      } else {
         showToast(`${riderName} is available for delivery tasks.`, "info");
      }
   };

   const filteredRiders = mockRiders.filter(r =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className="space-y-3">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               {orderId && (
                  <button
                     onClick={() => router.back()}
                     className="flex items-center gap-2 mb-2 font-bold text-primary group transition-all"
                  >
                     <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                     <span className="text-[10px] uppercase tracking-[0.2em] font-black underline underline-offset-4 decoration-primary/20">Cancel Assignment</span>
                  </button>
               )}
               <h2 className="text-2xl font-bold tracking-tight text-slate-800">Verified Riders Hub</h2>
               <p className="text-muted-foreground text-sm italic font-medium tracking-tight">Connect with top-rated riders to fulfill your orders.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
               <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-300" />
                  <Input
                     placeholder="Search by name or location..."
                     className="pl-10 h-10 bg-white border-slate-100 rounded-xl focus-visible:ring-primary shadow-sm"
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-slate-500 bg-white shadow-sm flex items-center gap-2">
                  <Filter className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Filter</span>
               </Button>
            </div>
         </div>

         {orderId && (
            <Card className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex flex-col md:flex-row items-center justify-between gap-2 overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-8 text-primary/5 group-hover:scale-110 transition-transform duration-700">
                  <Truck className="h-24 w-24" />
               </div>
               <div className="flex items-center gap-6 relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white">
                     <Truck className="h-7 w-7" />
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Assigning Order</p>
                     <h4 className="text-xl font-black text-slate-800">{orderId}</h4>
                     <p className="text-xs font-bold text-slate-500 italic tracking-tight font-medium leading-relaxed">Choose a reliable rider below to ship this order immediately.</p>
                  </div>
               </div>
            </Card>
         )}

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredRiders.map((rider) => (
               <Card key={rider.id} className={`border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white hover:border-primary/20 transition-all group ${rider.status === 'busy' ? 'opacity-60 grayscale-[0.5]' : ''}`}>
                  <div className="relative p-2 pb-2">
                     <div className="absolute top-4 right-4 z-20">
                        <Badge className={`rounded-full px-4 py-1 flex items-center gap-2 border-none text-[9px] font-black uppercase tracking-widest ${rider.status === 'available' ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-400'
                           }`}>
                           <div className={`h-1.5 w-1.5 rounded-full ${rider.status === 'available' ? 'bg-success' : 'bg-slate-300'}`} />
                           {rider.status}
                        </Badge>
                     </div>
                     <div className="aspect-square rounded-xl overflow-hidden border border-slate-50 group-hover:scale-105 transition-transform duration-500">
                        <img src={rider.image} className="h-full w-full object-cover" alt={rider.name} />
                     </div>
                  </div>

                  <CardContent className="p-3 pt-2 space-y-3">
                     <div className="text-center space-y-1">
                        <h5 className="text-sm font-black text-slate-800 uppercase tracking-tighter line-clamp-1">{rider.name}</h5>
                        <div className="flex items-center justify-center gap-4">
                           <div className="flex items-center gap-1 text-amber-500">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <span className="text-xs font-black">{rider.rating}</span>
                           </div>
                           <div className="h-4 w-[1px] bg-slate-100" />
                           <div className="flex items-center gap-1 text-slate-400 font-bold uppercase text-[9px] tracking-widest font-black">
                              {rider.completed} Tasks
                           </div>
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-slate-500 bg-slate-50 rounded-xl p-3 border border-slate-50">
                           <MapPin className="h-4 w-4 text-primary" />
                           <span className="text-xs font-bold truncate italic tracking-tight font-medium">{rider.location}</span>
                        </div>
                     </div>

                     <Button
                        className={`w-full h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 transition-all ${rider.status === 'available' ? 'bg-primary hover:bg-primary/90 active:scale-95' : 'bg-slate-100 text-slate-400 border-none cursor-not-allowed hidden'
                           }`}
                        onClick={() => handleChooseRider(rider.name)}
                        disabled={rider.status === 'busy'}
                     >
                        {orderId ? 'Choose & Assign' : 'View Profile'}
                     </Button>

                     {rider.status === 'busy' && (
                        <Button variant="outline" className="w-full h-12 rounded-2xl font-black text-[10px] uppercase tracking-widest border-slate-100 text-slate-300 italic cursor-not-allowed">
                           Currently Busy
                        </Button>
                     )}
                  </CardContent>
               </Card>
            ))}

            {/* Skeleton/Placeholder For Grid */}
            <div className="hidden lg:flex border border-dashed border-slate-200 rounded-[2.5rem] bg-slate-50/50 flex-col items-center justify-center p-8 text-center space-y-4 cursor-pointer hover:bg-slate-50 transition-all">
               <div className="h-14 w-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-200 shadow-sm">
                  <Truck className="h-7 w-7" />
               </div>
               <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Expand Network</p>
                  <p className="text-[10px] font-medium text-slate-300 mt-1 italic tracking-tight leading-relaxed">More riders will appear here as they register in your zone.</p>
               </div>
            </div>
         </div>

         <div className="pt-8 border-t border-slate-50">
            <Card className="bg-slate-900 shadow-2xl shadow-slate-200 border-none rounded-[2.5rem] p-10 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-12 text-white/5 opacity-5 pointer-events-none">
                  <ShieldCheck className="h-32 w-32" />
               </div>
               <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2 space-y-4">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-success/20 rounded-xl flex items-center justify-center text-success">
                           <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-success">SmartPay Logistics Protection</p>
                     </div>
                     <h3 className="text-3xl font-black text-white tracking-tighter leading-tight uppercase">Safe & Insured Delivery Network</h3>
                     <p className="text-slate-400 text-sm leading-relaxed max-w-xl italic tracking-tight font-medium">All riders in this directory are fully vetted and their deliveries are insured up to ₦100,000 against theft or transit damage.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                     <div className="p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-3">Rider Statistics</p>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center pb-2 border-b border-white/5">
                              <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Active Riders</span>
                              <span className="text-lg font-black text-white">12</span>
                           </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Avg Response</span>
                              <span className="text-lg font-black text-white">4m</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Card>
         </div>
      </div>
   );
}

export default function RidersPage() {
   return (
      <Suspense fallback={<div>Loading...</div>}>
         <RidersPageContent />
      </Suspense>
   );
}
