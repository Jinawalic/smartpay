"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ChevronLeft, Image as ImageIcon, Plus, ShieldCheck, Tag, Box, Star, Truck, Search, ArrowRight, ChevronRight, Store, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ToastProvider";
import { useRouter, useParams } from "next/navigation";
import { mockProducts } from "@/lib/data";

export default function EditProductPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;
  const product = mockProducts.find(p => p.id === productId);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!product) return <div className="p-8 text-center font-bold text-slate-800">Product Not Found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Product updated successfully! Changes are live.", "success");
      router.push("/seller/products");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-bold text-primary group cursor-pointer" onClick={() => router.back()}>
             <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
             <span className="text-[10px] uppercase tracking-[0.2em] font-black">Back to Products</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Edit Product Listing</h2>
          <p className="text-muted-foreground text-sm italic font-medium tracking-tight">Modify details for <span className="font-black text-primary uppercase">{product.id}</span></p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200" type="button" onClick={() => router.back()}>
            Discard Changes
          </Button>
          <Button 
            className="rounded-xl h-11 px-8 shadow-xl shadow-primary/20 bg-primary ring-offset-2 transition-all active:scale-95 border-none" 
            form="edit-product-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <form id="edit-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
              <div className="flex items-center gap-3">
                 <Box className="h-6 w-6 text-primary" />
                 <CardTitle className="text-lg">Product Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Marketplace Title</label>
                <Input defaultValue={product.name} required className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 bg-slate-50/30" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Comprehensive Description</label>
                <textarea 
                  className="w-full min-h-[180px] p-5 rounded-[2rem] border border-slate-100 focus:outline-none focus:ring-4 focus:ring-primary/5 text-sm placeholder:text-slate-400 transition-all font-medium text-slate-600 bg-slate-50/30 leading-relaxed"
                  defaultValue={product.description}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category Hub</label>
                  <select defaultValue={product.category} className="flex h-14 w-full rounded-2xl border border-slate-100 bg-slate-50/30 px-4 py-1 text-sm transition-colors focus-visible:outline-none focus:ring-4 focus:ring-primary/5 font-bold text-slate-800">
                    <option value="electronics">Electronics</option>
                    <option value="computing">Computing</option>
                    <option value="phones">Phones & Tablets</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="fashion">Fashion</option>
                    <option value="gaming">Gaming</option>
                    <option value="beauty">Beauty & Health</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Inventory Stock</label>
                  <Input type="number" defaultValue={product.stockLeft} min="0" required className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-black text-slate-800 bg-slate-50/30" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
              <div className="flex items-center gap-3">
                 <Tag className="h-6 w-6 text-primary" />
                 <CardTitle className="text-lg">Pricing Valuation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Final Sale Price (₦)</label>
                    <Input type="number" defaultValue={product.price} required className="h-16 border-slate-100 rounded-2xl focus-visible:ring-primary font-black text-2xl text-primary bg-slate-50/30" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Compare-at Price (₦)</label>
                    <Input type="number" defaultValue={product.originalPrice} className="h-16 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-400 line-through bg-slate-50/30" />
                  </div>
               </div>
               <div className="mt-8 p-6 bg-primary/5 rounded-[2rem] border border-primary/10 flex items-start gap-5">
                  <ShieldCheck className="h-8 w-8 text-primary shrink-0 opacity-80" />
                  <div>
                    <h5 className="text-[11px] font-black uppercase tracking-widest text-primary mb-1">Escrow Ready Listing</h5>
                    <p className="text-xs text-slate-500 font-medium italic leading-relaxed">Changes to price will take effect immediately across all active buyer carts. Settlement rules remain unchanged.</p>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <div className="flex items-center gap-3">
                 <ImageIcon className="h-5 w-5 text-primary" />
                 <CardTitle className="text-sm font-black uppercase tracking-widest text-slate-400 font-black">Main Asset</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
               <div className="aspect-square border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30 flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:bg-primary/5 hover:border-primary/20 transition-all group overflow-hidden relative">
                  <img src={product.image} className="h-full w-full object-contain mix-blend-multiply opacity-100 group-hover:scale-105 transition-transform" alt="" />
                  <div className="absolute inset-x-0 bottom-0 py-3 bg-white/90 backdrop-blur-sm border-t border-slate-50 text-[10px] font-black uppercase tracking-widest text-primary">
                     Change Image
                  </div>
               </div>
               <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="aspect-square rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300">
                     <Plus className="h-5 w-5" />
                  </div>
                  <div className="aspect-square rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300">
                     <Plus className="h-5 w-5" />
                  </div>
                  <div className="aspect-square rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300">
                     <Plus className="h-5 w-5" />
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 shadow-2xl shadow-slate-200 border-none rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-white/5 opacity-5">
               <Store className="h-32 w-32 rotate-12" />
            </div>
            <div className="relative z-10 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/40">
                     <Store className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary">Status</p>
                     <p className="text-sm font-black uppercase tracking-tight">Active Marketplace</p>
                  </div>
               </div>
               <p className="text-[10px] font-medium text-slate-400 italic leading-relaxed">This product is currently receiving active traffic. High resolution images are recommended for consistent sales performance.</p>
               <Button className="w-full h-12 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white border border-white/10 shadow-none transition-all" variant="outline">
                  Archive Listing
               </Button>
            </div>
          </Card>
        </div>
      </form>
    </div>
  );
}
