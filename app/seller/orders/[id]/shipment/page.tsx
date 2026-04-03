"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { mockOrders, mockProducts } from "@/lib/data";
import { ChevronLeft, Truck, Package, MapPin, CheckCircle2, Clock, ShieldCheck, AlertCircle, Phone, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useParams, useRouter } from "next/navigation";

export default function ShipmentStatusPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const order = mockOrders.find(o => o.id === orderId);
  const product = mockProducts.find(p => p.id === order?.productId);

  if (!order) return <div className="p-8 text-center">Order not found</div>;

  const timelineSteps = [
    { status: "delivered", label: "Package Delivered", description: "Successfully delivered to the buyer in Lagos.", time: "Oct 26, 14:30", completed: false },
    { status: "shipped", label: "Out for Delivery", description: "The rider is currently en route to the destination.", time: "Oct 26, 09:12", active: true, completed: true },
    { status: "shipped", label: "In Transit", description: "Package arrived at the Lagos Sorting Hub.", time: "Oct 25, 21:05", completed: true },
    { status: "shipped", label: "Shipped", description: "Package picked up by the courier from your store.", time: "Oct 25, 12:45", completed: true },
    { status: "pending", label: "Order Processed", description: "Payment verified and order label generated.", time: "Oct 24, 18:20", completed: true },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 mb-2 font-bold text-primary group transition-all"
          >
             <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
             <span className="text-[10px] uppercase tracking-[0.2em] font-black">Back to Orders</span>
          </button>
          <div className="flex items-center gap-3">
             <h2 className="text-2xl font-bold tracking-tight text-slate-800">Shipment Status</h2>
             <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-full">
                {order.trackingCode}
             </Badge>
          </div>
          <p className="text-muted-foreground text-sm italic font-medium tracking-tight mt-1">Real-time logistics tracking for Order {order.id}</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200 text-slate-500 bg-white">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span className="text-[10px] font-black uppercase tracking-widest">Report Issue</span>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8 flex flex-row items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                     <Truck className="h-6 w-6" />
                  </div>
                  <div>
                     <CardTitle className="text-lg">Delivery Progress</CardTitle>
                     <CardDescription className="text-xs font-black uppercase tracking-widest text-primary/60">Estimated: 26th Oct · 4:00 PM</CardDescription>
                  </div>
               </div>
               <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-primary rounded-full transition-all duration-1000 animate-pulse" />
               </div>
            </CardHeader>
            <CardContent className="p-8">
               <div className="space-y-0 relative">
                  <div className="absolute left-[15px] top-2 bottom-6 w-[2px] bg-slate-100" />
                  {timelineSteps.map((step, i) => (
                    <div key={i} className={`relative pl-12 pb-10 last:pb-0 ${step.active ? "animate-in fade-in slide-in-from-left-4 duration-500" : ""}`}>
                       <div className={`absolute left-0 top-1 h-8 w-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-all ${
                          step.active ? "bg-primary scale-125 ring-8 ring-primary/10" : 
                          step.completed ? "bg-success" : "bg-slate-200"
                       }`}>
                          {step.completed ? (
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          ) : step.active ? (
                            <Clock className="h-4 w-4 text-white animate-spin-slow" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-white/50" />
                          )}
                       </div>
                       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
                          <div>
                             <h4 className={`text-sm font-black uppercase tracking-widest ${step.active ? "text-primary" : step.completed ? "text-slate-800" : "text-slate-400"}`}>
                                {step.label}
                             </h4>
                             <p className="text-xs text-slate-500 font-medium tracking-tight mt-1">{step.description}</p>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">{step.time}</span>
                       </div>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden bg-slate-50/30">
             <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex items-center gap-4 flex-1">
                   <div className="h-16 w-16 rounded-3xl bg-white border border-slate-100 p-2 overflow-hidden shadow-sm shrink-0">
                      <img src={product?.image} className="h-full w-full object-contain mix-blend-multiply" alt="" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Contents</p>
                      <h5 className="text-base font-black text-slate-800 line-clamp-1">{product?.name}</h5>
                      <p className="text-xs font-bold text-primary italic">SKU: PROD-8291-XL</p>
                   </div>
                </div>
                <div className="text-right">
                   <Badge variant="outline" className="border-slate-200 text-slate-400 font-black text-[9px] tracking-widest px-4 py-1.5 rounded-xl uppercase">
                      Category: {product?.category}
                   </Badge>
                </div>
             </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
           <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                 <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Courier Info</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden border border-slate-50">
                       <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80" className="h-full w-full object-cover" alt="Rider" />
                    </div>
                    <div>
                       <p className="text-base font-black text-slate-800 leading-tight">Mustapha Adebayo</p>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Certified Rider · ID: RD-9012</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-11 rounded-xl flex items-center gap-2 border-slate-100 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all">
                       <Phone className="h-4 w-4" />
                       <span className="text-[10px] font-black uppercase">Call</span>
                    </Button>
                    <Button variant="outline" className="h-11 rounded-xl flex items-center gap-2 border-slate-100 text-slate-600 hover:bg-primary hover:text-white hover:border-primary transition-all">
                       <Phone className="h-4 w-4" />
                       <span className="text-[10px] font-black uppercase">SMS</span>
                    </Button>
                 </div>
              </CardContent>
           </Card>

           <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
                 <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400">Destination</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                 <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <div>
                       <p className="text-sm font-black text-slate-800">Delivery Address</p>
                       <p className="text-xs text-slate-500 font-medium leading-relaxed italic mt-1">{order.deliveryAddress}</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2 mb-3">
                       <ShieldCheck className="h-4 w-4 text-success" />
                       <span className="text-[9px] font-black uppercase tracking-widest text-success">Secure Buyer Verification</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-tight">The rider will request a 4-digit verification code from the buyer to confirm final settlement.</p>
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-primary/5 border border-primary/10 shadow-xl shadow-primary/5 rounded-[2rem] p-6 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center text-white">
                    <ShieldCheck className="h-5 w-5" />
                 </div>
                 <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary">Protection</h5>
                    <p className="text-[11px] font-bold text-slate-600">SmartPay Escrow Protection</p>
                 </div>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic font-medium">Funds will be released to your wallet within 6 hours of successful buyer verification.</p>
              <Button className="w-full h-11 bg-white hover:bg-white/80 text-primary rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-none border border-primary/10">
                 Need Help?
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
}
