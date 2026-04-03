"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { User, Shield, CreditCard, Bell, ChevronRight, Store, MapPin, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, Wallet, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ToastProvider";
import { Badge } from "@/components/ui/Badge";

export default function SellerSettingsPage() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"profile" | "payout" | "security">("profile");

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Profile updated successfully!", "success");
    }, 1200);
  };

  const menuItems = [
    { id: "profile", label: "Business Profile", icon: Store },
    { id: "payout", label: "Payout Details", icon: CreditCard },
    { id: "security", label: "Security & Login", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Business Settings</h2>
          <p className="text-muted-foreground italic text-sm">Manage your business profile, payouts, and security preferences.</p>
        </div>
        <div className="flex items-center gap-2">
           <Badge variant="outline" className="rounded-full bg-success/10 text-success border-success/20 px-4 py-1.5 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Verified Seller
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-4">
           <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden p-2">
              <div className="space-y-1">
                 {menuItems.map((item) => (
                    <button
                       key={item.id}
                       onClick={() => setActiveTab(item.id as any)}
                       className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all group ${
                          activeTab === item.id 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "text-slate-500 hover:bg-slate-50/80 hover:text-primary"
                       }`}
                    >
                       <div className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-primary"}`} />
                          <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                       </div>
                       <ChevronRight className={`h-4 w-4 ${activeTab === item.id ? "text-white/50" : "text-slate-300"}`} />
                    </button>
                 ))}
              </div>
           </Card>

           <Card className="bg-primary shadow-xl shadow-primary/10 border-none rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-white/5 opacity-5">
                 <Wallet className="h-32 w-32 rotate-12" />
              </div>
              <div className="relative z-10 space-y-4">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Wallet Balance</p>
                    <p className="text-3xl font-black">₦ 12,500.00</p>
                 </div>
                 <Button className="w-full h-11 bg-white hover:bg-white/90 text-primary rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-primary/40 border-none">
                    Withdraw Funds
                 </Button>
              </div>
           </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
           {activeTab === "profile" && (
             <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                   <div className="flex items-center gap-3 text-slate-800">
                      <Store className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Business Information</CardTitle>
                   </div>
                </CardHeader>
                <CardContent className="p-8">
                   <form onSubmit={saveProfile} className="space-y-8">
                      <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-slate-50">
                         <div className="group relative">
                            <div className="h-32 w-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-slate-100 bg-slate-50 flex items-center justify-center p-6 text-slate-300">
                               <Store className="h-full w-full" />
                            </div>
                            <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2.5 rounded-2xl shadow-lg border-2 border-white hover:scale-110 active:scale-95 transition-transform">
                               <Plus className="h-4 w-4" />
                            </button>
                         </div>
                         <div className="flex-1 space-y-2 text-center md:text-left">
                            <h3 className="text-xl font-bold text-slate-800">Shop Logo</h3>
                            <p className="text-sm text-slate-500 max-w-sm italic tracking-tight font-medium">Update your shop avatar to make your business stand out in the marketplace results.</p>
                         </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                         <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Business Name</label>
                            <Input defaultValue="Global Gadgets Store" className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-bold text-slate-800" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Store Username</label>
                            <div className="relative">
                               <span className="absolute left-4 top-3.5 text-slate-400 font-bold text-sm">@</span>
                               <Input defaultValue="global-gadgets" className="pl-8 h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-bold text-slate-800" />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Business Email</label>
                            <Input defaultValue="sales@globalgadgets.com" type="email" className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-bold text-slate-800" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Contact Phone</label>
                            <Input defaultValue="+234 812 345 6789" type="tel" className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-bold text-slate-800" />
                         </div>
                         <div className="md:col-span-2 space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Business Description</label>
                            <textarea 
                               className="w-full min-h-[100px] p-4 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm transition-all font-medium text-slate-600"
                               defaultValue="We specialize in premium tech accessories and smart devices. Best service guaranteed since 2018."
                            />
                         </div>
                      </div>

                      <div className="pt-4">
                        <Button className="h-12 px-10 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all" disabled={isSubmitting}>
                           {isSubmitting ? "Saving Changes..." : "Save Profile Updates"}
                        </Button>
                      </div>
                   </form>
                </CardContent>
             </Card>
           )}

           {activeTab === "payout" && (
             <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                   <div className="flex items-center gap-3 text-slate-800">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Settlement Account</CardTitle>
                   </div>
                </CardHeader>
                <CardContent className="p-8">
                   <div className="mb-8 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4">
                      <div className="h-14 w-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                         <CreditCard className="h-7 w-7" />
                      </div>
                      <div className="space-y-1">
                         <h4 className="text-base font-bold text-slate-800">Primary Payout Method</h4>
                         <p className="text-xs text-slate-500 tracking-tight font-medium">Funds from successful escrow transactions are paid here.</p>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Bank Name</label>
                        <select className="flex h-12 w-full rounded-xl border border-slate-100 bg-white px-3 py-1 text-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-600">
                           <option>Access Bank PLC</option>
                           <option>First Bank of Nigeria</option>
                           <option>Guaranty Trust Bank</option>
                           <option>Zenith Bank</option>
                           <option>United Bank for Africa</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Account Number</label>
                        <Input defaultValue="0123456789" className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-mono font-black text-slate-800 tracking-widest text-lg" />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Account Name</label>
                        <Input defaultValue="GLOBAL GADGETS LIMITED" className="h-12 border-slate-100 rounded-xl focus-visible:ring-primary font-bold text-slate-800 uppercase tracking-widest text-xs" />
                      </div>
                   </div>

                   <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="h-10 w-10 bg-success/10 rounded-full flex items-center justify-center text-success">
                            <CheckCircle2 className="h-5 w-5" />
                         </div>
                         <p className="text-sm font-bold text-slate-700">Withdrawal limits active</p>
                      </div>
                      <Button className="h-12 rounded-xl text-xs uppercase tracking-widest font-black shadow-lg shadow-primary/20">
                         Update Payout Method
                      </Button>
                   </div>
                </CardContent>
             </Card>
           )}

           {activeTab === "security" && (
             <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
                   <div className="flex items-center gap-3 text-slate-800">
                      <Shield className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">Security & Authentication</CardTitle>
                   </div>
                </CardHeader>
                <CardContent className="p-8">
                   <div className="space-y-8">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-100 group hover:border-primary/20 transition-all">
                         <div className="space-y-1">
                            <h4 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors">Change Password</h4>
                            <p className="text-xs text-slate-500 font-medium">Update your password to keep your business data secure.</p>
                         </div>
                         <Button variant="outline" className="h-10 rounded-xl text-[10px] uppercase font-black tracking-widest border-slate-200 hover:bg-primary/5 hover:text-primary transition-all">
                            Manage Password
                         </Button>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-white border border-slate-100 group hover:border-primary/20 transition-all">
                         <div className="space-y-1">
                            <h4 className="text-base font-bold text-slate-800 group-hover:text-primary transition-colors">2FA Authentication</h4>
                            <p className="text-xs text-slate-500 font-medium">Add an extra layer of security using an authenticator app.</p>
                         </div>
                         <Button variant="outline" className="h-10 rounded-xl text-[10px] uppercase font-black tracking-widest border-slate-200 hover:bg-primary/5 hover:text-primary transition-all">
                            Enable 2FA
                         </Button>
                      </div>

                      <div className="pt-6 border-t border-slate-50">
                         <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Recent Login Activity</h5>
                         <div className="space-y-3">
                            {[1, 2].map((i) => (
                               <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100/50">
                                  <div className="flex items-center gap-3">
                                     <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center text-slate-400 border border-slate-100 shadow-sm">
                                        <Lock className="h-4 w-4" />
                                     </div>
                                     <div>
                                        <p className="text-[12px] font-bold text-slate-700">Windows Chrome · Ikeja, NG</p>
                                        <p className="text-[10px] text-slate-400 font-semibold tracking-tight uppercase">Active now</p>
                                     </div>
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-slate-300" />
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </CardContent>
             </Card>
           )}
        </div>
      </div>
    </div>
  );
}
