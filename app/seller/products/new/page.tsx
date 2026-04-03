"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ChevronLeft, Image as ImageIcon, Plus, ShieldCheck, Tag, Box, Star, Truck, Search, ArrowRight, ChevronRight, Store, Upload } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ToastProvider";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const { showToast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Product added successfully! Your listing is now live.", "success");
      router.push("/seller/products");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 font-bold text-primary group cursor-pointer" onClick={() => router.back()}>
             <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
             <span className="text-xs uppercase tracking-widest">Back to Products</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Add New Product</h2>
          <p className="text-muted-foreground text-sm italic">Create a new listing for the SmartPay marketplace.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button 
            className="rounded-xl h-11 px-8 shadow-lg shadow-primary/20" 
            form="product-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Product"}
          </Button>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
              <div className="flex items-center gap-2">
                 <Box className="h-5 w-5 text-primary" />
                 <CardTitle className="text-lg">General Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Product Name</label>
                <Input placeholder="e.g. Sony PlayStation 5 Console" required className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500">Description</label>
                <textarea 
                  className="w-full min-h-[150px] p-4 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm placeholder:text-slate-400 transition-all font-medium"
                  placeholder="Describe your product features, condition, and any accessories included..."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Category</label>
                  <select className="flex h-12 w-full rounded-xl border border-slate-100 bg-white px-3 py-1 text-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-600">
                    <option value="electronics">Electronics</option>
                    <option value="computing">Computing</option>
                    <option value="phones">Phones & Tablets</option>
                    <option value="home">Home & Kitchen</option>
                    <option value="fashion">Fashion</option>
                    <option value="gaming">Gaming</option>
                    <option value="beauty">Beauty & Health</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Stock Quantity</label>
                  <Input type="number" placeholder="1" min="1" required className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-bold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
              <div className="flex items-center gap-2">
                 <Tag className="h-5 w-5 text-primary" />
                 <CardTitle className="text-lg">Pricing & Fees</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Sale Price (₦)</label>
                    <Input type="number" placeholder="0.00" required className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-black text-lg text-primary" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500">Original Price (₦)</label>
                    <Input type="number" placeholder="0.00" className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-bold text-slate-400 line-through" />
                  </div>
               </div>
               <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
                  <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-primary">Escrow Protection Active</p>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Buyers pay into our secure escrow vault. Funds are only settled to your wallet once delivery is confirmed by the buyer or tracking shows successful delivery.</p>
                  </div>
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
              <div className="flex items-center gap-2">
                 <ImageIcon className="h-5 w-5 text-primary" />
                 <CardTitle className="text-lg">Product Media</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
               <div className="aspect-square border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/30 flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-primary/5 hover:border-primary/30 transition-all group">
                  <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                     <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-600">Upload Product Image</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">PNG, JPG or WebP up to 5MB</p>
               </div>
               <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="aspect-square rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300">
                     <Plus className="h-4 w-4" />
                  </div>
                  <div className="aspect-square rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300">
                     <Plus className="h-4 w-4" />
                  </div>
                  <div className="aspect-square rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col items-center justify-center text-slate-300">
                     <Plus className="h-4 w-4" />
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 shadow-xl shadow-primary/5 bg-primary/5 overflow-hidden rounded-2xl">
            <CardContent className="p-6 space-y-4">
               <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white">
                     <Store className="h-5 w-5" />
                  </div>
                  <div>
                     <p className="text-xs font-black uppercase tracking-widest text-primary">Visibility</p>
                     <p className="text-sm font-bold text-slate-800">Public Marketplace</p>
                  </div>
               </div>
               <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Your product will be visible in the search results and categories for all potential buyers. Ensure high quality images for better conversion.</p>
               <Button className="w-full h-12 rounded-xl text-xs uppercase tracking-widest font-black bg-white hover:bg-white/80 text-primary border border-primary/20 shadow-none" variant="outline">
                  Save as Draft
               </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
