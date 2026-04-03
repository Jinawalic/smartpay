"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { mockProducts } from "@/lib/data";
import { getStoredOrders } from "@/lib/deliveryStore";
import { History, CheckCircle2, TrendingUp, Calendar, ChevronRight, Download, Filter, Search, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function RiderHistoryPage() {
   const [searchTerm, setSearchTerm] = React.useState("");
   const [completedDeliveries, setCompletedDeliveries] = React.useState(() =>
      getStoredOrders().filter((o) => o.status === "completed" || o.status === "delivered")
   );

   React.useEffect(() => {
      const orders = getStoredOrders();
      setCompletedDeliveries(orders.filter((o) => o.status === "completed" || o.status === "delivered"));
   }, []);


   const getProduct = (id: string) => mockProducts.find(p => p.id === id);

   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">Delivery Archive</h2>
               <p className="text-muted-foreground font-medium text-sm">Reviewing your performance and earning analytics.</p>
            </div>
         </div>

         <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                  <History className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Delivery Ledger</CardTitle>
               </div>
               <div className="flex items-center gap-4">
                  <div className="relative group">
                     <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                     <Input
                        placeholder="Search by ID or Product..."
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
                           <th className="px-8 py-5">Delivery Details</th>
                           <th className="px-8 py-5">Destination Address</th>
                           <th className="px-8 py-5 text-center">Status</th>
                           <th className="px-8 py-5 text-right">Action</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {completedDeliveries
                           .filter((delivery) =>
                              [delivery.id, delivery.deliveryAddress, delivery.productId]
                                 .join(" ")
                                 .toLowerCase()
                                 .includes(searchTerm.toLowerCase())
                           )
                           .map((delivery, i) => {
                              const product = getProduct(delivery.productId);
                              return (
                                 <tr key={i} className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-8 py-6">
                                       <div className="flex flex-col">
                                          <span className="font-black text-slate-800 text-sm uppercase tracking-tight">{delivery.id}</span>
                                          <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase line-clamp-1">{product?.name || "Premium Item"}</span>
                                       </div>
                                    </td>
                                    <td className="px-8 py-6">
                                       <p className="text-xs font-medium text-slate-500 max-w-[200px] line-clamp-2">{delivery.deliveryAddress}</p>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                       <Badge variant="outline" className="rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest border-none bg-success/10 text-success">
                                          {delivery.status}
                                       </Badge>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                       <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:text-primary transition-all">
                                          <ChevronRight className="h-5 w-5" />
                                       </Button>
                                    </td>
                                 </tr>
                              );
                           })}

                        {/* Sample rows if mock data is small */}
                        {[...Array(3)].map((_, i) => (
                           <tr key={`sample-${i}`} className="hover:bg-primary/5 transition-colors group opacity-60">
                              <td className="px-8 py-6">
                                 <div className="flex flex-col">
                                    <span className="font-black text-slate-800 text-sm uppercase tracking-tight">ORD-99182{i}</span>
                                    <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">ARCHIVED_RECORD_00{i + 1}</span>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <p className="text-xs font-medium text-slate-500 max-w-[200px] line-clamp-2">Lekki Phase 1, Road 14, Unit {i + 1}0</p>
                              </td>
                              <td className="px-8 py-6 text-center">
                                 <Badge variant="outline" className="rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest border-none bg-slate-100 text-slate-400">
                                    COMPLETED
                                 </Badge>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-white hover:text-primary transition-all">
                                    <ChevronRight className="h-5 w-5" />
                                 </Button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
                  <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
                     Show all activity for October 2024
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
