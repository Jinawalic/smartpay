"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockStats, mockOrders } from "@/lib/data";
import { Users, Activity, ExternalLink, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function AdminDashboard() {
  const stats = mockStats.admin;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Overview</h2>
          <p className="text-muted-foreground">Monitor platform activity and system health.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Escrow Volume</CardTitle>
            <ExternalLink className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${stats.escrowVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently locked in escrow</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Active registered accounts</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Escrow Activities</CardTitle>
            <CardDescription>Latest transactions passing through the system</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {mockOrders.map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-border rounded-xl bg-card hover:bg-accent/50 transition-colors gap-4">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">ID: <span className="text-primary">{order.id}</span></p>
                            <p className="text-sm text-muted-foreground">${order.amount.toLocaleString()} - {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                             <Badge variant={order.status === "shipped" || order.status === "out-for-delivery" ? "warning" : "default"}>
                                {order.status === "shipped" || order.status === "out-for-delivery" ? "Locked in Escrow" : order.status}
                             </Badge>
                        </div>
                    </div>
                ))}
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Automated monitoring and flags</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-4">
                <div className="p-4 border border-warning/30 bg-warning/10 text-orange-600 rounded-xl flex items-start gap-4">
                    <div className="bg-orange-100 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0">!</div>
                    <div>
                        <p className="text-sm font-semibold">High Volume Anomaly Detected</p>
                        <p className="text-xs mt-1">Seller "Seller-1" has a 300% spike in orders. Automatic holding applied until delivery verification.</p>
                    </div>
                </div>

                <div className="p-4 border border-destructive/30 bg-destructive/10 text-destructive rounded-xl flex items-start gap-4">
                     <div className="bg-red-100 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0">x</div>
                     <div>
                         <p className="text-sm font-semibold">Dispute Opened</p>
                         <p className="text-xs mt-1">ORD-123456: Buyer claims package was damaged. Please review.</p>
                         <Button variant="outline" size="sm" className="mt-2 h-8 text-xs border-destructive text-destructive hover:bg-destructive hover:text-white">Resolve Dispute</Button>
                     </div>
                </div>

                <div className="p-4 border border-success/30 bg-success/10 text-success rounded-xl flex items-start gap-4">
                     <div className="bg-green-100 rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0">✓</div>
                     <div>
                         <p className="text-sm font-semibold">System Stable</p>
                         <p className="text-xs mt-1">All payment gateways and tracking APIs functioning normally.</p>
                     </div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
