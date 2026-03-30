"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { mockProducts } from "@/lib/data";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CartPage() {
  const [cartItems, setCartItems] = React.useState(
    mockProducts.slice(0, 2).map(product => ({ ...product, quantity: 1 }))
  );

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = subtotal * 0.05; // 5% escrow fee example
  const total = subtotal + fee;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Shopping Cart</h2>
          <p className="text-muted-foreground">Review your items before proceeding to secure checkout.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <div className="md:col-span-2 space-y-4">
            {cartItems.map(item => (
                <div key={item.id} className="flex gap-4 p-4 border border-border bg-card rounded-xl">
                   <div className="h-24 w-24 bg-muted overflow-hidden rounded-lg shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                         <div>
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">Seller: {item.sellerId}</p>
                         </div>
                         <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="h-5 w-5" />
                         </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                         <div className="flex items-center gap-3 border border-border rounded-lg bg-background px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors" disabled={item.quantity <= 1}>
                               <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors">
                               <Plus className="h-4 w-4" />
                            </button>
                         </div>
                         <div className="font-bold text-lg">${(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                   </div>
                </div>
            ))}
            
            {cartItems.length === 0 && (
               <div className="text-center py-12 border border-border border-dashed rounded-xl bg-muted/20">
                  <p className="text-muted-foreground mb-4">Your cart is empty.</p>
                  <Link href="/buyer/products">
                     <Button variant="outline">Browse Products</Button>
                  </Link>
               </div>
            )}
         </div>

         <div>
            <Card className="sticky top-24">
               <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                     <span>Subtotal ({cartItems.length} items)</span>
                     <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                     <span>Escrow Protection Fee</span>
                     <span>${fee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-4 border-t border-border border-dashed mt-4">
                     <span>Total</span>
                     <span>${total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>
                  
                  <Link href="/buyer/checkout" className="block mt-6">
                     <Button className="w-full flex items-center justify-between group h-12 text-lg" disabled={cartItems.length === 0}>
                        Checkout securely
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                     </Button>
                  </Link>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                     Payments are securely held in escrow until you confirm delivery.
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
    </div>
  );
}
