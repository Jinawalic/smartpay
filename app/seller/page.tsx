"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockStats, mockOrders, mockProducts } from "@/lib/data";
import { Settings, ShoppingBag, Clock, Wallet, Plus, ArrowRight, Package, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function SellerDashboard() {
  const stats = mockStats.seller;
  const recentOrders = mockOrders.filter(o => o.sellerId === "seller-1");
  const getProduct = (id: string) => mockProducts.find(p => p.id === id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Business Overview</h2>
          <p className="text-muted-foreground text-sm italic font-medium tracking-tight">Welcome back to your store performance dashboard.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/seller/products/new">
            <Button className="flex items-center gap-2 h-11 px-6 rounded-xl shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">New Product</span>
            </Button>
          </Link>
          <Link href="/seller/wallet">
            <Button variant="outline" className="flex items-center gap-2 h-11 px-6 rounded-xl border-slate-200 text-slate-600 bg-white">
              <Wallet className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Withdraw</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          { title: "Total Sales", value: `₦ ${stats.totalSales.toLocaleString()}`, icon: TrendingUp, color: "text-primary", bg: "bg-primary/10", trend: "+20.1% from last month" },
          { title: "Wallet Balance", value: `₦ ${stats.walletBalance.toLocaleString()}`, icon: Wallet, color: "text-success", bg: "bg-success/10", trend: "Available for payout" },
          { title: "Pending Orders", value: stats.pendingOrders, icon: Clock, color: "text-amber-500", bg: "bg-amber-50", trend: "Requires action" },
          { title: "Store Views", value: "1,250", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50", trend: "Last 7 days" },
        ].map((item, i) => (
          <Card key={i} className="border-slate-100 shadow-sm rounded-2xl hover:border-primary/20 transition-all group overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                <item.icon className="h-12 w-12" />
             </div>
             <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
               <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.title}</CardTitle>
             </CardHeader>
             <CardContent>
               <div className={`text-2xl font-black ${item.color}`}>{item.value}</div>
               <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{item.trend}</p>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-slate-100 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6 flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-lg">Recent Sales Activity</CardTitle>
               <CardDescription className="text-xs font-medium">Monitoring your latest customer orders</CardDescription>
            </div>
            <Link href="/seller/orders">
               <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest hover:text-primary">View All Orders</Button>
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Revenue</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentOrders.map((order) => {
                    const product = getProduct(order.productId);
                    return (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-4 font-bold text-slate-800">{order.id}</td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-lg bg-white border border-slate-100 p-1 overflow-hidden shrink-0">
                                 <img src={product?.image} alt="" className="h-full w-full object-contain mix-blend-multiply" />
                              </div>
                              <span className="font-medium text-slate-600 line-clamp-1">{product?.name || order.productId}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 font-black text-primary">₦ {order.amount.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest border ${
                             order.status === "shipped" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-primary/5 text-primary border-primary/20"
                          }`}>
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                        No recent sales found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden self-start">
           <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
           </CardHeader>
           <CardContent className="p-6 space-y-3">
              {[
                 { label: "My Inventory", icon: Package, href: "/seller/products", color: "text-primary" },
                 { label: "Withdraw Earnings", icon: Wallet, href: "/seller/wallet", color: "text-success" },
                 { label: "Store Settings", icon: Settings, href: "/seller/settings", color: "text-indigo-500" },
              ].map((item, i) => (
                 <Link key={i} href={item.href} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all group">
                    <div className="flex items-center gap-3">
                       <item.icon className={`h-5 w-5 ${item.color}`} />
                       <span className="text-xs font-black uppercase tracking-widest text-slate-600">{item.label}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                 </Link>
              ))}
              
              <div className="mt-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2">Seller Tips</p>
                 <p className="text-xs font-bold text-indigo-700 leading-relaxed italic">Improve your ranking by delivering orders within 24 hours.</p>
              </div>
           </CardContent>
        </Card>
      </div>
    </div>
  );
}
