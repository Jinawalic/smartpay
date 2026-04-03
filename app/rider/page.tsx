"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockStats } from "@/lib/data";
import { getStoredOrders, persistOrders, updateOrder } from "@/lib/deliveryStore";
import { MapPin, Navigation, Package, Truck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function RiderDashboard() {
  const stats = mockStats.rider;
  const router = useRouter();

  const [orders, setOrders] = React.useState(getStoredOrders());
  const [currentLocation, setCurrentLocation] = React.useState("");

  React.useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const activeDeliveries = orders.filter((o) => o.status !== "completed" && o.status !== "delivered");
  const completedDeliveries = orders.filter((o) => o.status === "completed" || o.status === "delivered");

  const changeOrderStatus = (id: string, newStatus: string) => {
    const updated = updateOrder(id, { status: newStatus as any });
    if (!updated) return;
    setOrders(getStoredOrders());
  };

  const handleStartDelivery = (orderId: string) => {
    changeOrderStatus(orderId, "shipped");
  };

  const updateLocation = (value: string) => {
    setCurrentLocation(value);
  };

  // persist current location as last known
  React.useEffect(() => {
    if (!currentLocation) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("smartpay_rider_location", currentLocation);
    }
  }, [currentLocation]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between items-start gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Rider Dashboard</h2>
          <p className="text-muted-foreground">Manage and complete your assigned deliveries.</p>
        </div>
        <Badge variant="success" className="px-4 py-2 text-sm">Online & Available</Badge>
      </div>

      <Card className="rounded-3xl border-slate-100 shadow-sm bg-white">
        <CardHeader className="flex flex-col md:flex-row justify-between items-start gap-4 bg-slate-50/80 px-6 py-5">
          <div>
            <CardTitle className="text-lg">Live Location</CardTitle>
            <CardDescription>Keep your route updated for delivery assignments.</CardDescription>
          </div>
          <div className="flex w-full md:w-96 gap-3 items-center">
            <MapPin className="h-5 w-5 text-primary" />
            <Input
              placeholder="Current location (e.g., Lekki, Lagos)"
              value={currentLocation}
              onChange={(event) => updateLocation(event.target.value)}
              className="w-full rounded-xl"
            />
            <Button>Update</Button>
          </div>
        </CardHeader>
        <CardContent className="px-0 py-4">
          <div className="mx-6 text-sm text-muted-foreground">
            {currentLocation ? `Last known location: ${currentLocation}` : "Location not yet shared."}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-slate-100 shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/80 px-6 py-5 border-b border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <CardTitle className="text-lg">Assigned Deliveries</CardTitle>
              <CardDescription>{activeDeliveries.length} items in progress.</CardDescription>
            </div>
            <div className="font-semibold text-sm text-slate-500">
              Completed so far: {completedDeliveries.length}
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
              <tr>
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-left">Address</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {activeDeliveries.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 text-center" colSpan={4}>No active deliveries. 🎉</td>
                </tr>
              ) : (
                activeDeliveries.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4">
                      <p className="font-semibold">{order.id}</p>
                      <p className="text-xs text-slate-500">{order.productId}</p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-xs text-slate-700">{order.deliveryAddress}</p>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <Badge
                        variant={order.status === "pending" ? "secondary" : order.status === "shipped" ? "warning" : "default"}
                        className="rounded-full px-3 py-1 text-[10px] font-bold uppercase"
                      >
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-center space-x-2">
                      <Button
                        size="sm"
                        variant={order.status === "pending" ? "secondary" : "outline"}
                        onClick={() => handleStartDelivery(order.id)}
                        disabled={order.status !== "pending"}
                      >
                        Start Delivery
                      </Button>
                      <Link href={`/rider/delivery/${order.id}`} className="inline-block">
                        <Button size="sm" variant="primary">Mark as Delivered</Button>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="rounded-3xl border-slate-100 shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/80 px-6 py-5 border-b border-slate-100">
          <CardTitle className="text-lg">Today’s Activity</CardTitle>
          <CardDescription>{completedDeliveries.length} completed delivery entries in history.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Address</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {completedDeliveries.slice(0, 3).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-4 font-medium">{order.id}</td>
                    <td className="px-4 py-4">
                      <Badge variant="success" className="rounded-full px-3 py-1 text-[10px] font-bold uppercase">{order.status}</Badge>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-500">{order.deliveryAddress}</td>
                  </tr>
                ))}
                {completedDeliveries.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-slate-500">No completed deliveries yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
