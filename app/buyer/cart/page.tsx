"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart as CartIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
   const { cart, removeFromCart, updateQuantity } = useCart();

   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
   const total = subtotal;

   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h2 className="text-2xl font-bold tracking-tight">Shopping Cart</h2>
               <p className="text-muted-foreground">Review your items before proceeding to secure checkout.</p>
            </div>
         </div>

         <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
               {cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border border-border bg-card rounded-xl transition-shadow">
                     <div className="h-24 w-24 bg-muted overflow-hidden rounded-lg shrink-0 border border-border/50">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start">
                           <div>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">Seller ID: {item.sellerId}</p>
                           </div>
                           <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-destructive/10 rounded-full">
                              <Trash2 className="h-5 w-5" />
                           </button>
                        </div>

                        <div className="flex justify-between items-center mt-auto">
                           <div className="flex items-center gap-1 border border-border rounded-xl bg-background p-1">
                              <button
                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                 className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors"
                                 disabled={item.quantity <= 1}
                              >
                                 <Minus className="h-4 w-4 font-bold" />
                              </button>
                              <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                              <button
                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                 className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                              >
                                 <Plus className="h-4 w-4 font-bold" />
                              </button>
                           </div>
                           <div className="font-bold text-xl text-primary">₦ {(item.price * item.quantity).toLocaleString()}</div>
                        </div>
                     </div>
                  </div>
               ))}

               {cart.length === 0 && (
                  <div className="text-center py-20 border-2 border-dashed border-muted rounded-3xl bg-muted/5">
                     <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <CartIcon className="h-8 w-8 text-muted-foreground" />
                     </div>
                     <h3 className="text-lg font-bold text-slate-800">Your cart is empty</h3>
                     <p className="text-muted-foreground mb-8 mt-2 max-w-xs mx-auto">Looks like you haven't added anything to your cart yet.</p>
                     <Link href="/buyer/products">
                        <Button size="lg" className="rounded-xl px-8">Find Products</Button>
                     </Link>
                  </div>
               )}
            </div>

            <div>
               <Card className="sticky top-24 border-primary/20 overflow-hidden">
                  <div className="bg-primary/5 p-4 border-b border-primary/10">
                     <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                        <ArrowRight className="h-5 w-5" /> Order Summary
                     </h3>
                  </div>
                  <CardContent className="p-6 space-y-4">
                     <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                        <span className="font-bold">₦ {subtotal.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between font-black text-2xl pt-6 border-t border-border border-dashed mt-4">
                        <span>Total</span>
                        <span className="text-primary">₦ {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                     </div>

                     <Link href="/buyer/checkout" className="block mt-4">
                        <Button className="w-full flex items-center justify-between group h-13 text-[17px] rounded-2xl" disabled={cart.length === 0}>
                           Checkout securely
                           <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                     </Link>

                     <div className="flex items-center gap-2 mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                           <ArrowRight className="h-4 w-4 text-primary rotate-45" />
                        </div>
                        <p className="text-[10px] leading-snug text-muted-foreground">
                           <span className="font-bold text-primary">Secure Escrow:</span> Payment is held safely and only released when delivery is confirmed.
                        </p>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
}
