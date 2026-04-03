"use client";

import { useCart } from "@/components/CartProvider";
import { PublicNavbar } from "@/components/layout/PublicNavbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PublicCartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fee = subtotal * 0.05; // 5% escrow fee example
  const total = subtotal + fee;

  const handleCheckout = () => {
    // Redirect to login page with a returnUrl parameter
    router.push("/login?redirect=/buyer/checkout");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicNavbar />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
              <p className="text-muted-foreground">Review your items before proceeding to secure checkout.</p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
             <div className="md:col-span-2 space-y-4">
                {cart.map(item => (
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
                             <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                                <Trash2 className="h-5 w-5" />
                             </button>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                             <div className="flex items-center gap-3 border border-border rounded-lg bg-background px-2 py-1">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground disabled:opacity-50 transition-colors" disabled={item.quantity <= 1}>
                                   <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors">
                                   <Plus className="h-4 w-4" />
                                </button>
                             </div>
                             <div className="font-bold text-lg">₦ {(item.price * item.quantity).toLocaleString()}</div>
                          </div>
                       </div>
                    </div>
                ))}
                
                {cart.length === 0 && (
                   <div className="text-center py-12 border border-border border-dashed rounded-xl bg-muted/20">
                      <p className="text-muted-foreground mb-4">Your cart is empty.</p>
                      <Link href="/#products">
                         <Button variant="outline">Browse Products</Button>
                      </Link>
                   </div>
                )}
             </div>

             <div>
                <Card className="sticky top-24 border-primary/20 shadow-lg">
                   <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                      <div className="flex justify-between text-muted-foreground text-sm">
                         <span>Subtotal ({cart.length} items)</span>
                         <span>₦ {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground text-sm">
                         <span>Escrow Protection Fee</span>
                         <span>₦ {fee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-4 border-t border-border mt-4">
                         <span>Total</span>
                         <span className="text-primary">₦ {total.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                      </div>
                      
                      <div className="pt-6">
                         <Button className="w-full flex items-center justify-between group h-14 text-lg" disabled={cart.length === 0} onClick={handleCheckout}>
                            Checkout securely
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                         </Button>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-4">
                         You will be asked to log in or create an account to process your payment safely via Escrow.
                      </p>
                   </CardContent>
                </Card>
             </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
