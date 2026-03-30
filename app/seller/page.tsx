"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockStats, mockOrders } from "@/lib/data";
import { DollarSign, Settings, ShoppingBag, Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function SellerDashboard() {
  const stats = mockStats.seller;
  const recentOrders = mockOrders.filter(o => o.sellerId === "seller-1");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Seller Hub</h2>
          <p className="text-muted-foreground">Manage your products and orders.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/seller/products/new">
            <Button className="flex items-center gap-2">
              Add Product
            </Button>
          </Link>
          <Link href="/seller/wallet">
            <Button variant="outline" className="flex items-center gap-2 border-primary text-primary">
              <Wallet className="h-4 w-4" />
              Withdraw
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">${stats.walletBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Available to withdraw</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">Require action</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Incoming orders that require your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground text-xs uppercase font-medium">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Product</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="bg-card hover:bg-accent/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{order.id}</td>
                      <td className="px-6 py-4">{order.productId}</td>
                      <td className="px-6 py-4 text-success font-medium">${order.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <Badge variant={order.status === "shipped" ? "warning" : "default"}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button size="sm" variant="outline" className="w-full max-w-[100px]">Manage</Button>
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                        No recent orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
