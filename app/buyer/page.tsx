"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockStats, mockOrders, mockProducts } from "@/lib/data";
import { Package, ShoppingCart, CheckCircle2, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function BuyerDashboard() {
  const stats = mockStats.buyer;

  // Filter products or orders limit for demo
  const recentOrders = mockOrders.filter(o => o.buyerId === "buyer-1");
  const popularProducts = mockProducts.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/buyer/products">
            <Button className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Find Products
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.activeOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Delivery in progress</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have {stats.activeOrders} active orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-xl bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{order.id}</p>
                      <p className="text-sm text-muted-foreground mt-1">${order.amount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={order.status === "delivered" ? "success" : order.status === "shipped" ? "warning" : "default"}>
                      {order.status}
                    </Badge>
                    <Link href={`/buyer/track?code=${order.trackingCode}`}>
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recommended Products</CardTitle>
            <CardDescription>Based on your purchase history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-4 border-b border-border pb-4 last:border-0">
                  <div className="h-16 w-16 overflow-hidden rounded-md border border-border">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{product.name}</p>
                    <p className="text-sm text-muted-foreground font-medium text-primary">${product.price.toLocaleString()}</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
