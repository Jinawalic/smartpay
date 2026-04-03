"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { mockStats, mockOrders } from "@/lib/data";
import { Users, Activity, ExternalLink, RefreshCcw, ShieldCheck, Wallet, History, TrendingUp, AlertCircle, ShoppingBag, Globe, Zap, ArrowRight, ActivitySquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function AdminDashboard() {
  const stats = mockStats.admin;

  return (
    <div className="space-y-8 px-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-sm border border-primary/20">
                <ShieldCheck className="h-5 w-5" />
             </div>
             <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 uppercase italic">Admin Governance Hub</h2>
          </div>
          <p className="text-muted-foreground font-medium italic text-sm text-slate-500 pl-1">Global platform monitoring, security oversight and escrow auditing.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm grow-0">
           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-slate-300 hover:text-primary transition-all">
              <RefreshCcw className="h-5 w-5" />
           </Button>
           <div className="h-6 w-[1px] bg-slate-100 mx-1" />
           <Badge className="bg-success/10 text-success border-none uppercase text-[10px] font-black px-4 py-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Mainnet Active
           </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
           { title: "Escrow Volume", value: `₦ ${stats.escrowVolume.toLocaleString()}`, icon: ShieldCheck, color: "text-primary", trend: "+12.5% Month-over-Month" },
           { title: "Hub Users", value: stats.totalUsers.toLocaleString(), icon: Users, color: "text-slate-800", trend: "Stakeholders registered" },
           { title: "Total Ledger", value: stats.totalTransactions.toLocaleString(), icon: History, color: "text-success", trend: "Fiscal movements" },
           { title: "System Health", value: "99.9%", icon: Activity, color: "text-amber-500", trend: "Server Uptime" },
        ].map((stat, i) => (
           <Card key={i} className="border-slate-100 shadow-sm rounded-[2rem] p-6 hover:border-primary/20 transition-all group overflow-hidden relative bg-white border">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                 <stat.icon className="h-12 w-12 text-slate-800" />
              </div>
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{stat.title}</CardTitle>
              <div className={`text-2xl font-black ${stat.color} tracking-tighter italic`}>{stat.value}</div>
              <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight italic">{stat.trend}</p>
           </Card>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 lg:grid-cols-5">
        <Card className="lg:col-span-3 border-slate-100 shadow-sm rounded-[3rem] overflow-hidden bg-white">
           <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8 flex justify-between items-center">
              <div className="flex items-center gap-3">
                 <ShoppingBag className="h-5 w-5 text-primary" />
                 <CardTitle className="text-lg">Recent Escrow Activity</CardTitle>
              </div>
              <Link href="/admin/transactions">
                 <Button variant="ghost" className="text-[10px] uppercase font-black tracking-widest text-primary hover:bg-primary/5 transition-all">View All Entries</Button>
              </Link>
           </CardHeader>
           <CardContent className="p-0">
             <div className="divide-y divide-slate-50">
                {mockOrders.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row items-center justify-between p-7 hover:bg-slate-50/50 transition-colors group">
                        <div className="flex items-center gap-4">
                           <div className="h-10 w-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform shadow-sm">
                              <Zap className="h-5 w-5" />
                           </div>
                           <div className="space-y-1">
                               <p className="text-sm font-black text-slate-800 uppercase tracking-tighter italic">ID: {order.id}</p>
                               <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">₦ {order.amount.toLocaleString()}</span>
                                  <span className="h-1 w-1 bg-slate-200 rounded-full" />
                                  <span className="text-[10px] font-bold text-slate-400 uppercase italic">{new Date(order.createdAt).toLocaleDateString()}</span>
                               </div>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 mt-4 sm:mt-0">
                             <Badge variant="outline" className={`rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border-none ${
                                order.status === "shipped" || order.status === "out-for-delivery" ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" : "bg-success/10 text-success"
                             }`}>
                                {order.status === "shipped" || order.status === "out-for-delivery" ? "Escrow Locked" : order.status}
                             </Badge>
                             <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-300 hover:text-primary transition-all">
                                <ArrowRight className="h-5 w-5" />
                             </Button>
                        </div>
                    </div>
                ))}
             </div>
             <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 italic">Global Audit Stream Active</p>
             </div>
           </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-slate-100 shadow-sm rounded-[3rem] overflow-hidden bg-white">
           <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-10">
              <div className="flex items-center gap-3">
                 <AlertCircle className="h-5 w-5 text-destructive" />
                 <CardTitle className="text-lg">Platform Criticals</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="p-10">
              <div className="flex flex-col gap-6">
                 <div className="p-6 border border-destructive/10 bg-destructive/5 rounded-[2rem] group hover:border-destructive/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="bg-destructive/10 rounded-xl p-2.5 h-10 w-10 flex items-center justify-center shrink-0 text-destructive group-hover:scale-110 transition-transform">!</div>
                        <div>
                            <p className="text-sm font-black uppercase tracking-tighter text-slate-800 italic">Anomaly Detected</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic leading-tight mt-0.5">Seller-02: 300% Spike Detected</p>
                        </div>
                    </div>
                    <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed mb-4">Merchant velocity exceeding norms. Automatic withdrawal suspension applied until verification.</p>
                    <Button variant="destructive" className="w-full h-10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-destructive/10 border-none">Initiate Audit</Button>
                 </div>

                 <div className="p-6 border border-amber-500/10 bg-amber-500/5 rounded-[2rem] group hover:border-amber-500/30 transition-all cursor-pointer">
                      <div className="flex items-center gap-4 mb-3">
                          <div className="bg-amber-500/10 rounded-xl p-2.5 h-10 w-10 flex items-center justify-center shrink-0 text-amber-500 group-hover:scale-110 transition-transform">✓</div>
                          <div>
                              <p className="text-sm font-black uppercase tracking-tighter text-slate-800 italic">Dispute Logged</p>
                              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic leading-tight mt-0.5">ORD-718210: Sarah L. vs Store-01</p>
                          </div>
                      </div>
                      <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed mb-4">Buyer claims package was damaged. Escrow hold extended for another 72 hours.</p>
                      <Link href="/admin/disputes">
                        <Button variant="outline" className="w-full h-10 rounded-xl text-[10px] font-black uppercase tracking-widest border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-white transition-all">Go to Arbitration</Button>
                      </Link>
                 </div>

                 <div className="p-6 border border-primary/10 bg-primary/5 rounded-[1.5rem] flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
                      <div className="bg-white rounded-xl h-12 w-12 flex items-center justify-center text-primary shadow-sm border border-primary/10">✓</div>
                      <div>
                          <p className="text-xs font-black uppercase tracking-widest text-slate-800 italic">Network Stable</p>
                          <div className="flex items-center gap-2 mt-1">
                             <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                             <p className="text-[10px] font-medium text-slate-400 italic">All gateways operational</p>
                          </div>
                      </div>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
