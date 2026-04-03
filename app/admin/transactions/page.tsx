"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { mockOrders, mockProducts } from "@/lib/data";
import { History, Search, Filter, ArrowUpRight, Download, CreditCard, ExternalLink, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function AdminTransactionsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const getProduct = (id: string) => mockProducts.find(p => p.id === id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-success/10 text-success border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Completed</Badge>;
      case "delivered":
        return <Badge className="bg-success/10 text-success border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-amber-500/10 text-amber-500 border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Escrow Locked</Badge>;
      case "out-for-delivery":
        return <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">In Transit</Badge>;
      case "pending":
        return <Badge className="bg-slate-100 text-slate-400 border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Pending</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-400 border-none rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 uppercase italic">Transaction Ledger</h2>
          <p className="text-muted-foreground font-medium italic text-sm text-slate-500">Comprehensive oversight of all platform fiscal movements.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-200 text-slate-600 bg-white shadow-sm flex items-center gap-2 group hover:border-primary/30 transition-all">
              <Download className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest">Export CSV</span>
           </Button>
           <Button className="h-11 px-6 rounded-xl shadow-lg shadow-primary/20 bg-primary border-none">
              <CreditCard className="h-4 w-4 mr-2" />
              <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Audit Reports</span>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { title: "Escrow Volume", value: "₦ 2,850,000", icon: Clock, color: "text-amber-500", trend: "+12.5% vs Prev Month" },
           { title: "Net Revenue", value: "₦ 450,200", icon: CheckCircle2, color: "text-success", trend: "Tax & Service Fees" },
           { title: "Flagged Items", value: "08", icon: AlertCircle, color: "text-destructive", trend: "Requiring Attention" },
         ].map((stat, i) => (
           <Card key={i} className="border-slate-100 shadow-sm rounded-2xl p-6 hover:border-primary/20 transition-all group overflow-hidden relative bg-white">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                 <stat.icon className="h-12 w-12" />
              </div>
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.title}</CardTitle>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight italic">{stat.trend}</p>
           </Card>
         ))}
      </div>

      <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
         <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <History className="h-5 w-5 text-primary" />
               <CardTitle className="text-lg">Real-time Activity</CardTitle>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search by Hash, ID or User..." 
                    className="pl-10 h-10 w-full md:w-64 text-[10px] rounded-xl border-slate-100 bg-white focus-visible:ring-primary shadow-none" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button variant="outline" className="h-10 px-3 rounded-xl border-slate-200">
                  <Filter className="h-4 w-4" />
               </Button>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/30 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50 font-sans">
                     <tr>
                        <th className="px-8 py-5">Transaction Details</th>
                        <th className="px-8 py-5">Platform Entities</th>
                        <th className="px-8 py-5 text-center">Escrow Status</th>
                        <th className="px-8 py-5 text-right">Amount</th>
                        <th className="px-8 py-5 text-right">Audit</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {mockOrders.map((order, i) => {
                       const product = getProduct(order.productId);
                       return (
                        <tr key={i} className="hover:bg-primary/5 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex flex-col">
                                 <span className="font-black text-slate-800 text-sm uppercase tracking-tight">{order.id}</span>
                                 <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase line-clamp-1 italic tracking-tight">{product?.name || "Premium Item Listing"}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex flex-col space-y-1">
                                 <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase text-slate-400">Buyer:</span>
                                    <span className="text-[11px] font-bold text-slate-600">{order.buyerId}</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase text-slate-400">Seller:</span>
                                    <span className="text-[11px] font-bold text-slate-600">{order.sellerId}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              {getStatusBadge(order.status)}
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex flex-col items-end">
                                 <span className="font-black text-slate-800 text-base">₦ {order.amount.toLocaleString()}</span>
                                 <span className="text-[9px] font-black uppercase text-success tracking-tighter italic">Tax Covered</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:text-primary transition-all border border-transparent hover:border-slate-100 shadow-none hover:shadow-sm">
                                 <ExternalLink className="h-4 w-4" />
                              </Button>
                           </td>
                        </tr>
                       );
                     })}
                     
                     {/* Sample rows if mock data is small */}
                     {[...Array(5)].map((_, i) => (
                        <tr key={`sample-${i}`} className="hover:bg-primary/5 transition-colors group opacity-60">
                           <td className="px-8 py-6">
                              <div className="flex flex-col">
                                 <span className="font-black text-slate-800 text-sm uppercase tracking-tight">TXN-0098273{i}</span>
                                 <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">HISTORICAL_RECORD_{i+1}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex flex-col space-y-1">
                                 <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase text-slate-400">Buyer:</span>
                                    <span className="text-[11px] font-bold text-slate-600">user-82{i}</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <span className="text-[9px] font-black uppercase text-slate-400">Seller:</span>
                                    <span className="text-[11px] font-bold text-slate-600">merchant-09{i}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-center">
                              <Badge className="bg-success/10 text-success border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest">Released</Badge>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex flex-col items-end">
                                 <span className="font-black text-slate-800 text-base">₦ 25,400</span>
                                 <span className="text-[9px] font-black uppercase text-slate-300 tracking-tighter italic">Settled</span>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:text-primary transition-all border border-transparent hover:border-slate-100 shadow-none hover:shadow-sm">
                                 <ExternalLink className="h-4 w-4" />
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
               <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
                  Show Paginated Results (1 - 50)
               </Button>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
