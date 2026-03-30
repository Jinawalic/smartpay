"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockStats, mockOrders } from "@/lib/data";
import { MapPin, Navigation, Package, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function RiderDashboard() {
  const stats = mockStats.rider;

  // Filter out actual rider deliveries for demo
  const upcomingDeliveries = mockOrders.slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between items-start gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rider Dashboard</h2>
          <p className="text-muted-foreground">Manage your assigned deliveries.</p>
        </div>
        <Badge variant="success" className="px-4 py-2 text-sm">Online & Available</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Assigned Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.assignedDeliveries}</div>
            <p className="text-xs text-muted-foreground mt-1">Ready for pickup or transit</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Completed Deliveries</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.completedDeliveries}</div>
            <p className="text-xs text-muted-foreground mt-1">All time total</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Today's Route</h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcomingDeliveries.map((delivery) => (
            <Card key={delivery.id} className="border-border hover:border-primary/50 transition-colors cursor-pointer">
              <CardHeader className="pb-3 border-b border-border bg-muted/20">
                <div className="flex items-center justify-between">
                  <Badge variant={delivery.status === "shipped" ? "warning" : "default"}>
                    {delivery.status === "shipped" ? "Ready for Pickup" : "In Transit"}
                  </Badge>
                  <span className="text-sm font-semibold text-primary">{delivery.id}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pickup</p>
                    <p className="text-sm font-medium">Seller Hub #1</p>
                    <p className="text-xs text-muted-foreground truncate">123 Victoria Island, Lagos</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Navigation className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dropoff</p>
                    <p className="text-sm font-medium">Buyer Address</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{delivery.deliveryAddress}</p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-border">
                  <Link href={`/rider/delivery/${delivery.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
