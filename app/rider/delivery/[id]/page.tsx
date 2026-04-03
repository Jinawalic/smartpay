"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { getOrderById, updateOrder } from "@/lib/deliveryStore";
import { MapPin, Navigation, Package, CheckCircle, ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function DeliveryDetailsPage() {
   const params = useParams();
   const id = params?.id as string;
   const router = useRouter();

   const order = getOrderById(id) || getOrderById("ORD-123456")!;

   const [deliveryCode, setDeliveryCode] = React.useState("");
   const [isSubmitting, setIsSubmitting] = React.useState(false);
   const [success, setSuccess] = React.useState(false);
   const [error, setError] = React.useState("");

   const handleConfirmDelivery = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");

      // Simulate API verification
      setTimeout(() => {
         setIsSubmitting(false);
         if (deliveryCode.toUpperCase() === order.trackingCode) {
            const updated = updateOrder(order.id, { status: "completed" });
            if (updated) {
               setSuccess(true);
            } else {
               setError("Unable to update delivery status. Please retry.");
            }
         } else {
            setError("Invalid code. Please verify with the buyer.");
         }
      }, 1000);
   };

   if (success) {
      return (
         <div className="max-w-md mx-auto mt-12 space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="h-24 w-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
               <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Delivery Confirmed!</h2>
            <p className="text-muted-foreground mt-2">
               Order {order.id} has been successfully delivered.
               Payment of <strong className="text-foreground">${order.amount.toLocaleString()}</strong> has been released from escrow.
            </p>
            <Button onClick={() => router.push("/rider")} className="mt-8 w-full" size="lg">
               Return to Dashboard
            </Button>
         </div>
      );
   }

   return (
      <div className="max-w-3xl mx-auto space-y-6">
         <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
               <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
               <h2 className="text-2xl font-bold tracking-tight">Delivery Task</h2>
               <p className="text-muted-foreground mt-1">Review details and confirm dropoff.</p>
            </div>
         </div>

         <div className="grid gap-6 md:grid-cols-2">
            {/* Details Card */}
            <Card className="h-fit">
               <CardHeader className="border-b border-border bg-muted/20 pb-4">
                  <div className="flex justify-between items-center">
                     <CardTitle className="text-lg text-primary">{order.id}</CardTitle>
                     <Badge variant={order.status === "shipped" ? "warning" : "default"}>{order.status}</Badge>
                  </div>
               </CardHeader>
               <CardContent className="pt-6 space-y-6">
                  <div className="space-y-4">
                     <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Order Info</h4>
                     <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                           <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                           <p className="font-medium">{order.productId}</p>
                           <p className="text-sm text-muted-foreground">${order.amount.toLocaleString()}</p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-border">
                     <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Locations</h4>

                     <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div>
                           <p className="text-xs font-semibold text-muted-foreground">Pickup</p>
                           <p className="text-sm font-medium mt-0.5">Seller Hub #1</p>
                           <p className="text-sm text-muted-foreground">123 Victoria Island, Lagos</p>
                           <p className="text-sm text-muted-foreground mt-1 text-primary">Status: Completed</p>
                        </div>
                     </div>

                     <div className="flex items-start gap-3">
                        <Navigation className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                           <p className="text-xs font-semibold text-muted-foreground">Dropoff</p>
                           <p className="text-sm font-medium mt-0.5">Buyer (Contact: {order.buyerId})</p>
                           <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {/* Action Card */}
            <Card className="h-fit border-primary">
               <CardHeader>
                  <div className="flex items-center gap-2">
                     <ShieldAlert className="h-5 w-5 text-primary" />
                     <CardTitle>Confirm Dropoff</CardTitle>
                  </div>
                  <CardDescription>
                     Ask the buyer for their unique securely generated code to complete the delivery and release escrow funds.
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handleConfirmDelivery} className="space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium leading-none">Security Code</label>
                        <Input
                           placeholder="e.g TXN-XXXXXX"
                           value={deliveryCode}
                           onChange={(e) => setDeliveryCode(e.target.value.toUpperCase())}
                           className="text-center text-lg tracking-widest font-mono"
                           maxLength={10}
                           required
                        />
                        {error && (
                           <p className="text-sm text-destructive mt-1 font-medium">{error}</p>
                        )}
                     </div>
                     <Button type="submit" size="lg" className="w-full mt-4" disabled={isSubmitting || !deliveryCode}>
                        {isSubmitting ? "Verifying..." : "Verify & Complete Delivery"}
                     </Button>
                  </form>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
