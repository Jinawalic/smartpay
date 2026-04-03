"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockStats, mockOrders, mockProducts } from "@/lib/data";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Package, ShoppingCart, CheckCircle2, Search, ArrowRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ToastProvider";

export default function BuyerDashboard() {
  const stats = mockStats.buyer;
  const router = useRouter();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    showToast(`Code ${text} copied to clipboard!`, "success");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  // Filter products or orders limit for demo
  const recentOrders = mockOrders.filter(o => o.buyerId === "buyer-1");
  const popularProducts = mockProducts.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-800">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
             <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
             <Input 
               placeholder="Search products..." 
               className="pl-9 h-10 bg-white border-slate-200"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               onKeyDown={handleSearch}
             />
          </div>
          <Link href="/buyer/products">
            <Button className="flex items-center gap-2 h-10 shadow-sm">
              <Package className="h-4 w-4" />
              Browse All
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow border-slate-100 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold text-slate-600">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-slate-900">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border-slate-100 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold text-slate-600">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-primary">{stats.activeOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Delivery in progress</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border-slate-100 shadow-sm rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-bold text-slate-600">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-success">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-slate-100 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have {stats.activeOrders} active orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-800">{order.id}</p>
                        <button 
                          onClick={() => copyToClipboard(order.id)} 
                          className="text-slate-400 hover:text-primary transition-colors"
                          title="Copy Order ID"
                        >
                          {copiedId === order.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 uppercase font-bold tracking-tighter">₦ {order.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={order.status === "delivered" ? "success" : order.status === "shipped" ? "warning" : "default"} className="rounded-full px-3 capitalize">
                      {order.status}
                    </Badge>
                    <Link href={`/buyer/track?code=${order.trackingCode}`}>
                      <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary rounded-full">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 border-slate-100 shadow-sm rounded-2xl">
          <CardHeader>
            <CardTitle>Recommended For You</CardTitle>
            <CardDescription>Based on your purchase history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {popularProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 border-b border-slate-50 pb-5 last:border-0 last:pb-0 group">
                  <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-100 bg-white p-1 shadow-sm">
                    <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-bold text-slate-800 leading-tight line-clamp-1 group-hover:text-primary transition-colors">{product.name}</p>
                    <p className="text-sm font-black text-primary">₦ {product.price.toLocaleString()}</p>
                  </div>
                  <Link href={`/product/${product.id}`}>
                    <Button variant="outline" size="sm" className="rounded-xl font-bold border-slate-200 hover:bg-primary hover:text-white hover:border-primary transition-all">View</Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
