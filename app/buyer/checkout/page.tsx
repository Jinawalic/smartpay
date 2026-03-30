"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Copy, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [trackingCode, setTrackingCode] = React.useState("");

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = subtotal * 0.05;
  const total = subtotal + fee;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate Paystack processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
      // Generate a unique code like TXN-XXXXXX
      const code = "TXN-" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setTrackingCode(code);
    }, 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(trackingCode);
    alert("Code copied to clipboard!");
  };

  if (isSuccess) {
     return (
        <div className="max-w-md mx-auto space-y-6 text-center animate-in fade-in zoom-in-95 duration-500 mt-12 py-12 px-6 border border-border bg-card rounded-2xl shadow-xl shadow-success/10">
           <div className="h-24 w-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-iner">
              <CheckCircle2 className="h-12 w-12 text-success" />
           </div>
           
           <h2 className="text-3xl font-bold tracking-tight text-foreground">Payment Successful!</h2>
           <p className="text-muted-foreground mt-2">
              Your funds are securely held in escrow until your order is delivered.
           </p>

           <div className="my-8 p-6 bg-primary/5 border border-primary/20 rounded-xl relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-pattern opacity-10 mix-blend-overlay"></div>
             <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">Delivery Code</p>
             <p className="text-4xl font-mono font-bold tracking-[0.2em]">{trackingCode}</p>
             
             <Button variant="outline" onClick={copyCode} className="mt-6 flex items-center justify-center gap-2 mx-auto disabled:opacity-50">
                <Copy className="h-4 w-4" />
                Copy Code
             </Button>
           </div>
           
           <div className="p-4 bg-muted/30 text-sm text-muted-foreground text-left rounded-lg mb-8">
              <span className="font-semibold text-foreground">Instruction:</span> Keep this code safe. Do not share it until the rider hands over your package. It will be required upon delivery.
           </div>

           <Link href={`/buyer/track?code=${trackingCode}`}>
             <Button className="w-full h-12 text-lg">
                Track My Order <ArrowRight className="ml-2 h-5 w-5" />
             </Button>
           </Link>
        </div>
     );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Checkout</h2>
          <p className="text-muted-foreground">Complete your purchase securely.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
         <div className="md:col-span-3 space-y-6 flex flex-col">
            <Card>
               <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="space-y-2">
                     <label className="text-sm font-medium">Full Name</label>
                     <Input defaultValue="Jane Doe" required />
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-medium">Delivery Address</label>
                     <Input defaultValue="123 Main St, Lagos" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-sm font-medium">City</label>
                        <Input defaultValue="Lagos" required />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <Input defaultValue="+234 800 000 0000" type="tel" required />
                     </div>
                  </div>
               </CardContent>
            </Card>
            
            <Card className="flex-1">
               <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-primary mt-1 font-medium bg-primary/10 px-2 py-1 rounded-full w-fit">
                     <ShieldCheck className="h-4 w-4" /> Escrow Protected
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <form onSubmit={handlePayment} className="space-y-6 min-h-[200px]">
                     <div className="grid gap-4">
                        <div className="border border-primary bg-primary/5 rounded-xl p-4 flex items-center gap-4 cursor-pointer relative shadow-sm">
                           <div className="absolute -top-3 left-4 bg-primary text-white text-xs px-2 py-0.5 rounded-full font-medium">Preferred</div>
                           <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-primary" />
                           <div className="flex-1">
                              <p className="font-medium text-foreground">Paystack Gateway</p>
                              <p className="text-sm text-muted-foreground">Cards, Bank Transfer, USSD</p>
                           </div>
                           <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center text-white font-bold text-xs shrink-0">
                              Pay
                           </div>
                        </div>
                     </div>
                     
                     <div className="pt-8">
                       <Button type="submit" size="lg" className="w-full text-lg h-14 shadow-lg shadow-primary/20" disabled={isProcessing}>
                          {isProcessing ? "Processing Securely..." : `Pay $${total.toLocaleString()} into Escrow`}
                       </Button>
                       <p className="text-xs text-center text-muted-foreground mt-4">
                          Your money is held securely. Sellers only get paid when you confirm delivery.
                       </p>
                     </div>
                  </form>
               </CardContent>
            </Card>
         </div>

         <div className="md:col-span-2">
            <Card className="sticky top-24 border-primary/20 bg-muted/10 shadow-lg">
               <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
                     {cart.map((item) => (
                       <div key={item.id} className="flex gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                          <div className="h-16 w-16 bg-muted overflow-hidden rounded-md shrink-0">
                             <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                             <p className="font-medium leading-none line-clamp-1 text-sm">{item.name}</p>
                             <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                             <p className="font-semibold text-primary mt-1 text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                  
                  <div className="pt-2 space-y-3">
                     <div className="flex justify-between text-muted-foreground text-sm">
                        <span>Subtotal</span>
                        <span className="font-medium text-foreground">${subtotal.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-muted-foreground text-sm">
                        <span className="flex items-center gap-1">Escrow Fee <ShieldCheck className="h-3 w-3 text-primary" /></span>
                        <span className="font-medium text-foreground">${fee.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between font-bold text-xl pt-4 border-t border-border mt-4">
                        <span>Total Pay</span>
                        <span className="text-primary">${total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
