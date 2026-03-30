"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import { Copy, MapPin, Truck, Search, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const trackingSteps = [
  { title: "Pending", description: "Order confirmed" },
  { title: "Shipped", description: "Handed to rider" },
  { title: "Out for Delivery", description: "Rider is nearby" },
  { title: "Delivered", description: "Confirmed by you" },
];

export default function TrackOrderPage() {
  const [trackingCode, setTrackingCode] = React.useState("");
  const [isTracking, setIsTracking] = React.useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.length > 3) setIsTracking(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(trackingCode);
    alert("Tracking code copied to clipboard!");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Track Your Order</h2>
        <p className="text-muted-foreground mt-1">Enter your tracking/delivery code to see the status.</p>
      </div>

      <Card className="border-border shadow-md">
        <CardContent className="pt-6">
          <form onSubmit={handleTrack} className="flex gap-4 items-center">
            <div className="flex-1 relative">
               <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
               <Input 
                 placeholder="Enter code e.g., TXN-123456" 
                 className="pl-10 h-12"
                 value={trackingCode}
                 onChange={(e) => setTrackingCode(e.target.value)}
                 required
               />
            </div>
            <Button type="submit" size="lg">Track Order</Button>
          </form>
        </CardContent>
      </Card>

      {isTracking && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <Card>
            <CardHeader className="border-b border-border bg-muted/20 pb-4">
              <div className="flex items-center gap-3">
                 <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Truck className="h-6 w-6 text-primary" />
                 </div>
                 <div className="flex-1">
                    <CardTitle className="text-xl">TXN-829312</CardTitle>
                    <CardDescription>MacBook Pro M3 • Total: $1,999</CardDescription>
                 </div>
                 <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex items-center gap-2">
                    <Copy className="h-4 w-4" />
                    Copy Code
                 </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-8 pb-10">
              <Stepper steps={trackingSteps} currentStep={1} />
            </CardContent>
            
            <CardFooter className="bg-muted/10 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
               <div>
                  <h4 className="text-sm font-semibold">Delivery Address</h4>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                     <MapPin className="h-4 w-4" /> 123 Main St, Lagos
                  </p>
               </div>
               
               <div className="md:text-right">
                  <h4 className="text-sm font-semibold">Estimated Delivery</h4>
                  <p className="text-sm text-primary font-medium mt-1">Today, 2:00 PM - 4:00 PM</p>
               </div>
            </CardFooter>
          </Card>

          <Card className="border-border shadow-sm border-l-4 border-l-primary">
            <CardContent className="p-4 flex items-center justify-between">
                <div>
                    <h4 className="font-semibold flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary" />
                        Safe Delivery Instruction
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        Keep your tracking code safe. You will need to provide it to the rider upon delivery to release the payment from escrow.
                    </p>
                </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
