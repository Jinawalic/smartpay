"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockStats, mockOrders } from "@/lib/data";
import { Download, FileText, Settings, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function FirsDashboard() {
  const stats = mockStats.firs;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">FIRS Dashboard</h2>
          <p className="text-muted-foreground">Monitor platform tax collections and summaries.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Monthly Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Tax Collected</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₦ {stats.totalTaxCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">From a fixed 10% rate</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow bg-card hover:bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Taxable Transactions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.taxableTransactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully cleared and taxed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader>
             <CardTitle>Recent Tax Remittances</CardTitle>
             <CardDescription>Breakdown by individual transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border overflow-hidden">
               <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground text-xs uppercase font-medium">
                     <tr>
                        <th className="px-6 py-3">Seller</th>
                        <th className="px-6 py-3">Transaction ID</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Base Amount</th>
                        <th className="px-6 py-3 text-right">Tax (10%)</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                     {mockOrders.map((order) => (
                        <tr key={order.id} className="bg-card hover:bg-accent/50 transition-colors">
                           <td className="px-6 py-4 font-medium">{order.sellerId}</td>
                           <td className="px-6 py-4">{order.id}</td>
                           <td className="px-6 py-4 text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</td>
                           <td className="px-6 py-4 font-medium">₦ {order.amount.toLocaleString()}</td>
                           <td className="px-6 py-4 text-right font-medium text-success">₦ {order.taxAmount.toLocaleString()}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
