"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ShieldCheck, Search, Filter, AlertTriangle, Scale, Clock, MessageSquare, ExternalLink, CheckCircle2, XCircle, FileText, User, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function AdminDisputesPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const mockDisputes = [
    { id: "DISP-101", orderId: "ORD-123456", buyer: "James T.", seller: "Zenith Mart", reason: "Product Mismatch", status: "open", createdAt: "2 hours ago", amount: 15400 },
    { id: "DISP-102", orderId: "ORD-992812", buyer: "Sarah L.", seller: "Global Tech", reason: "Arrival Damage", status: "resolving", createdAt: "1 day ago", amount: 110000 },
    { id: "DISP-103", orderId: "ORD-008172", buyer: "Michael O.", seller: "Store NG", reason: "Late Delivery", status: "resolved", createdAt: "3 days ago", amount: 4260 },
    { id: "DISP-104", orderId: "ORD-716492", buyer: "Kelechi P.", seller: "Fashion Hub", reason: "Item Not Found", status: "rejected", createdAt: "5 days ago", amount: 15645 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-destructive/10 text-destructive border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest shadow-sm">Urgent Open</Badge>;
      case "resolving":
        return <Badge className="bg-amber-500/10 text-amber-500 border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest">Arbitration</Badge>;
      case "resolved":
        return <Badge className="bg-success text-white border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest shadow-sm">Closed</Badge>;
      case "rejected":
        return <Badge className="bg-slate-100 text-slate-400 border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest">Rejected</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-400 border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 px-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 uppercase italic">Resolution Center</h2>
          <div className="flex items-center gap-2 text-muted-foreground font-medium italic text-sm text-slate-500">
             <Scale className="h-4 w-4 text-primary" />
             <span>Platform Arbitration & Dispute Liquidation Terminal</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-11 px-4 rounded-xl border-slate-200 text-slate-600 bg-white shadow-sm flex items-center gap-2 group hover:border-primary/30 transition-all">
              <FileText className="h-4 w-4 text-slate-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Dispute Guidelines</span>
           </Button>
           <Button className="h-11 px-6 rounded-xl shadow-lg shadow-destructive/20 bg-destructive hover:bg-destructive uppercase text-white border-none">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="text-[10px] font-black uppercase tracking-widest">Critical Alert Protocol</span>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { title: "Open Disputes", value: "14", icon: AlertTriangle, color: "text-destructive", trend: "Pending Arbitration" },
           { title: "Avg. Resolve Time", value: "4.2 hrs", icon: Clock, color: "text-primary", trend: "-12% Efficiency Boost" },
           { title: "Resolution Rate", value: "98.5%", icon: CheckCircle2, color: "text-success", trend: "Platform Trust Level" },
           { title: "Total Volume", value: "₦ 1.2M", icon: MessageSquare, color: "text-slate-400", trend: "Protected Capital" },
         ].map((stat, i) => (
           <Card key={i} className="border-slate-100 shadow-sm rounded-2xl p-6 hover:border-primary/20 transition-all group overflow-hidden relative bg-white">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                 <stat.icon className="h-10 w-10 text-slate-800" />
              </div>
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.title}</CardTitle>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <p className="text-[10px] font-black text-slate-400 mt-1 uppercase tracking-tight italic">{stat.trend}</p>
           </Card>
         ))}
      </div>

      <Card className="border-slate-100 shadow-sm rounded-[3rem] overflow-hidden bg-white">
         <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <ShieldCheck className="h-5 w-5 text-primary" />
               <CardTitle className="text-lg">Case Log Index</CardTitle>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search Case ID, User or Reason..." 
                    className="pl-10 h-10 w-full md:w-64 text-[10px] rounded-xl border-slate-100 bg-white focus-visible:ring-primary shadow-none" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button variant="outline" className="h-10 px-3 rounded-xl border-slate-200">
                  <Filter className="h-4 w-4 text-slate-400" />
               </Button>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/30 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-50 font-sans">
                     <tr>
                        <th className="px-10 py-5">Case Parameters</th>
                        <th className="px-10 py-5">Contending Stakeholders</th>
                        <th className="px-10 py-5">Status / Urgency</th>
                        <th className="px-10 py-5 text-right">Protected Capital</th>
                        <th className="px-10 py-5 text-right">Arbitrate</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {mockDisputes.map((dispute, i) => (
                        <tr key={i} className="hover:bg-primary/5 transition-colors group">
                           <td className="px-10 py-8">
                              <div className="flex flex-col">
                                 <span className="font-black text-slate-800 text-sm uppercase tracking-tight italic">{dispute.id}</span>
                                 <div className="flex items-center gap-2 mt-1">
                                    <ShoppingBag className="h-3 w-3 text-slate-300" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter hover:text-primary cursor-pointer transition-colors">{dispute.orderId}</span>
                                 </div>
                                 <span className="text-[10px] font-bold text-destructive mt-2 uppercase tracking-tight opacity-80 flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    {dispute.reason}
                                 </span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col space-y-2">
                                 <div className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-lg bg-primary/5 border border-primary/10 flex items-center justify-center text-primary">
                                       <User className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter"><span className="text-[9px] text-slate-300 font-black">Buyer:</span> {dispute.buyer}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-lg bg-success/5 border border-success/10 flex items-center justify-center text-success">
                                       <Scale className="h-3.5 w-3.5" />
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tighter"><span className="text-[9px] text-slate-300 font-black">Seller:</span> {dispute.seller}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col gap-2">
                                 {getStatusBadge(dispute.status)}
                                 <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest pl-1">{dispute.createdAt}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex flex-col items-end">
                                 <span className="font-black text-slate-800 text-base">₦ {dispute.amount.toLocaleString()}</span>
                                 <span className="text-[9px] font-black uppercase text-amber-500 tracking-tighter italic">Held in Escrow</span>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right">
                              <div className="flex items-center justify-end gap-2 group-hover:opacity-100 transition-opacity">
                                 <Button variant="ghost" className="h-10 px-4 rounded-xl hover:bg-white hover:text-primary transition-all border border-transparent shadow-none hover:shadow-sm hover:border-slate-100 text-[10px] uppercase font-black tracking-widest">
                                    Detail File
                                 </Button>
                                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white group-hover:text-primary transition-all border border-transparent shadow-none hover:shadow-sm">
                                    <MessageSquare className="h-4.5 w-4.5" />
                                 </Button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
               <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
                  Next Case Bundle
               </Button>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
