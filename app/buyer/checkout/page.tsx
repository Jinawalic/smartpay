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

   const [address, setAddress] = React.useState({
      name: "Titus Jinawa",
      phone: "08089230260",
      street: "Dutse Alhaji, zone 1 by celestial church",
      city: "Kubwa Bwari",
      state: "Federal Capital Territory Nigeria"
   });
   const [tempAddress, setTempAddress] = React.useState(address);
   const [isEditingAddress, setIsEditingAddress] = React.useState(false);
   const [isProcessing, setIsProcessing] = React.useState(false);
   const [isSuccess, setIsSuccess] = React.useState(false);
   const [trackingCode, setTrackingCode] = React.useState("");

   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
   const total = subtotal;

   const saveAddress = () => {
      setAddress(tempAddress);
      setIsEditingAddress(false);
   };

   const copyCode = () => {
      navigator.clipboard.writeText(trackingCode);
      alert("Code copied to clipboard!");
   };

   const handlePayment = (e: React.FormEvent) => {
      e.preventDefault();
      setIsProcessing(true);

      // Simulate Paystack processing
      setTimeout(() => {
         setIsProcessing(false);
         const code = "TXN-" + Math.random().toString(36).substring(2, 8).toUpperCase();
         setTrackingCode(code);
         setIsSuccess(true);
      }, 2000);
   };

   // Snapshot of cart for the invoice
   const checkoutItems = React.useMemo(() => [...cart], [isSuccess]);

   if (isSuccess) {
      return (
         <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500 mt-6 pb-12 transition-all">
            <div className="text-center">
               <div className="h-20 w-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-12 w-12 text-success" />
               </div>
               <h2 className="text-2xl font-black tracking-tight text-slate-800 uppercase">Payment Escrowed!</h2>
               <p className="text-slate-500 font-medium mt-2">
                  Your funds are securely held in escrow until your order is delivered.
               </p>
            </div>

            {/* Professional Invoice Card */}
            <div className="bg-white rounded-sm border border-slate-100 shadow-2xl overflow-hidden relative">
               <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-primary/50 to-primary"></div>

               <div className="p-10 border-b border-dashed border-slate-100">
                  <div className="flex justify-between items-start mb-2">
                     <div className="space-y-1">
                        <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">SMARTPAY INVOICE</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{trackingCode}</p>
                     </div>
                     <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10">
                        <CheckCircle2 className="h-6 w-6 text-primary" />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Ship To</p>
                        <p className="font-bold text-slate-800 leading-tight mb-1">{address.name}</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{address.street}</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">{address.city}, {address.state}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Order Date</p>
                        <p className="font-bold text-slate-800">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                     </div>
                  </div>
               </div>

               <div className="px-10 py-2 space-y-2">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-slate-50">
                           <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Item Description</th>
                           <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Qty</th>
                           <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Amount</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {checkoutItems.map((item) => (
                           <tr key={item.id}>
                              <td className="py-2">
                                 <p className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</p>
                                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">Verified Merchant: SmartPay Hub</p>
                              </td>
                              <td className="py-2 text-center font-bold text-slate-600 text-sm">{item.quantity}</td>
                              <td className="py-2 text-right font-bold text-slate-800 text-sm">₦ {(item.price * item.quantity).toLocaleString()}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>

                  <div className="pt-2 space-y-3">
                     <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                        <span>Subtotal</span>
                        <span>₦ {total.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between items-center bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <span className="text-sm font-black uppercase tracking-widest text-slate-800">Total Paid</span>
                        <span className="text-2xl font-black text-primary tracking-tighter">₦ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                     </div>
                  </div>
               </div>

               <div className="bg-slate-900 p-8 flex flex-col items-center justify-center text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Master Escrow Tracking Code</p>
                  <div className="flex items-center gap-4 mb-4">
                     {trackingCode.split('').map((char, i) => (
                        <div key={i} className="h-10 w-8 bg-white/10 rounded-lg flex items-center justify-center text-white font-mono font-black text-lg border border-white/10">{char}</div>
                     ))}
                  </div>
                  <Button variant="secondary" onClick={copyCode} className="text-[10px] uppercase font-black tracking-widest text-primary hover:text-white transition-all">Copy & Secure Code</Button>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <Link href={`/buyer/track?code=${trackingCode}`} className="flex-1">
                  <Button className="w-full h-14 text-sm uppercase font-bold tracking-widest rounded-2xl">
                     Track My Shipment <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
               </Link>
               <Link href="/buyer/products" className="flex-1">
                  <Button onClick={() => clearCart()} variant="outline" className="w-full h-14 text-sm uppercase font-bold tracking-widest rounded-2xl border-slate-200">
                     Continue Shopping
                  </Button>
               </Link>
            </div>
         </div>
      );
   }

   return (
      <div className="max-w-4xl mx-auto space-y-6">

         <div className="grid gap-6 md:grid-cols-5">
            <div className="md:col-span-3 space-y-6 flex flex-col">
               <div className="space-y-4 px-1">
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-black uppercase tracking-widest text-slate-800">Shipping Address</h3>
                  </div>

                  {isEditingAddress ? (
                     <Card className="rounded-[2rem] border-primary/20 shadow-xl animate-in slide-in-from-top-4">
                        <CardHeader>
                           <CardTitle className="text-lg">Update Destination</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recipient Name</label>
                                 <Input value={tempAddress.name} onChange={(e) => setTempAddress({ ...tempAddress, name: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Node</label>
                                 <Input value={tempAddress.phone} onChange={(e) => setTempAddress({ ...tempAddress, phone: e.target.value })} />
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Street / House No.</label>
                              <Input value={tempAddress.street} onChange={(e) => setTempAddress({ ...tempAddress, street: e.target.value })} />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">City Hub</label>
                                 <Input value={tempAddress.city} onChange={(e) => setTempAddress({ ...tempAddress, city: e.target.value })} />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">State / Region</label>
                                 <Input value={tempAddress.state} onChange={(e) => setTempAddress({ ...tempAddress, state: e.target.value })} />
                              </div>
                           </div>
                        </CardContent>
                        <CardFooter className="gap-3 bg-slate-50/50 rounded-b-[2rem] border-t border-slate-100 p-6">
                           <Button onClick={saveAddress} className="flex-1 font-bold uppercase tracking-widest text-[10px] h-12 rounded-xl">Save & Use</Button>
                           <Button onClick={() => setIsEditingAddress(false)} variant="ghost" className="flex-1 font-bold uppercase tracking-widest text-[10px] h-12 rounded-xl text-slate-400">Discard</Button>
                        </CardFooter>
                     </Card>
                  ) : (
                     <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex justify-between items-center group relative overflow-hidden">
                        {/* Airmail Border Decoration */}
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
                           {[...Array(10)].map((_, i) => (
                              <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-[#ff6b6b]' : 'bg-[#4d79ff]'}`}></div>
                           ))}
                        </div>

                        <div className="pl-6 space-y-1">
                           <p className="font-bold text-slate-800 flex items-center gap-2">
                              {address.name} <span className="font-medium text-slate-400 text-sm tracking-tight">{address.phone}</span>
                           </p>
                           <p className="text-slate-500 text-sm py-0.5">{address.street}</p>
                           <div className="flex items-center gap-3">
                              <p className="text-slate-500 text-sm font-medium">{address.city} {address.state} 961103</p>
                           </div>
                        </div>

                        <Button
                           variant="outline"
                           size="sm"
                           onClick={() => {
                              setTempAddress(address);
                              setIsEditingAddress(true);
                           }}
                           className="h-9 px-4 rounded-lg font-bold border-slate-200 text-slate-700 hover:text-primary hover:border-primary transition-all"
                        >
                           Edit Address
                        </Button>
                     </div>
                  )}
               </div>

               <Card className="flex-1">
                  <CardHeader>
                     <CardTitle>Payment Method</CardTitle>
                     <CardDescription className="flex items-center gap-2 text-primary mt-1 font-medium bg-primary/10 px-2 py-1 rounded-full w-fit">
                        <ShieldCheck className="h-4 w-4" /> Escrow Protected
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <form onSubmit={handlePayment} className="space-y-3 min-h-[200px]">
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

                        <div className="pt-3">
                           <Button type="submit" size="lg" className="w-full text-lg h-14" disabled={isProcessing}>
                              {isProcessing ? "Processing Securely..." : `Pay ₦ ${total.toLocaleString()} into Escrow`}
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
               <Card className="sticky top-24 border-primary/20 bg-muted/10">
                  <CardHeader>
                     <CardTitle className="text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="max-h-60 overflow-y-auto space-y-4 pr-2">
                        {cart.map((item) => (
                           <div key={item.id} className="flex gap-4 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                              <div className="h-13 w-13 bg-muted overflow-hidden rounded-md shrink-0">
                                 <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                 <p className="font-medium leading-none line-clamp-1 text-sm">{item.name}</p>
                                 <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                                 <p className="font-semibold text-primary mt-1 text-sm">₦ {(item.price * item.quantity).toLocaleString()}</p>
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="pt-2 space-y-3">
                        <div className="flex justify-between text-muted-foreground text-sm">
                           <span>Subtotal</span>
                           <span className="font-medium text-foreground">₦ {subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl pt-4 border-t border-border mt-4">
                           <span>Total Pay</span>
                           <span className="text-primary">₦ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
