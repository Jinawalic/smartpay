"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { User, Shield, CreditCard, Bell, ChevronRight, Truck, MapPin, Mail, Phone, Lock, Eye, EyeOff, CheckCircle2, Wallet, Plus, ArrowRight, Activity, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ToastProvider";
import { Badge } from "@/components/ui/Badge";

export default function RiderSettingsPage() {
   const { showToast } = useToast();
   const [isSubmitting, setIsSubmitting] = React.useState(false);
   const [activeTab, setActiveTab] = React.useState<"profile" | "payout" | "security">("profile");

   const saveProfile = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
         setIsSubmitting(false);
         showToast("Rider profile updated successfully!", "success");
      }, 1200);
   };

   const menuItems = [
      { id: "profile", label: "My Profile", icon: User },
      { id: "payout", label: "Earning Accounts", icon: CreditCard },
      { id: "security", label: "Security & Safety", icon: Shield },
   ];

   return (
      <div className="space-y-6">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 uppercase italic">Rider Profile</h2>
               <p className="text-muted-foreground font-medium italic text-sm">Managing your professional identity and logistics configurations.</p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">


            <div className="md:col-span-3 space-y-6">
               {activeTab === "profile" && (
                  <Card className="border-slate-100 shadow-sm rounded-xl overflow-hidden bg-white">
                     <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-10">
                        <div className="flex items-center gap-3 text-slate-800">
                           <Truck className="h-5 w-5 text-primary" />
                           <CardTitle className="text-lg">Logistics Identity</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent className="p-10">
                        <form onSubmit={saveProfile} className="space-y-6">
                           <div className="flex flex-col md:flex-row items-center gap-10 pb-10 border-b border-slate-50">
                              <div className="group relative">
                                 <div className="h-30 w-30 rounded-full overflow-hidden border-1 border-white bg-slate-50 flex items-center justify-center p-8 text-slate-200 relative group-hover:scale-[1.02] transition-transform duration-500">
                                    <User className="h-full w-full" />
                                 </div>
                                 <button className="absolute -bottom-2 -right-2 bg-primary text-white p-3.5 rounded-2xl shadow-xl border-4 border-white hover:scale-110 active:scale-95 transition-transform flex items-center justify-center">
                                    <Plus className="h-2 w-2" />
                                 </button>
                              </div>
                              <div className="flex-1 space-y-2 text-center md:text-left">
                                 <h3 className="text-xl font-black text-slate-800 tracking-tight">Rider Avatar</h3>
                                 <p className="text-sm text-slate-500 max-w-sm italic tracking-tight font-medium">A clear photo helps customers identify you during the delivery process.</p>
                                 <Badge variant="outline" className="rounded-full bg-slate-50 border-slate-100 text-slate-400 font-bold px-3 py-0.5 text-[9px] uppercase tracking-[0.1em]">Recommended: 500x500px</Badge>
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-10">
                              <div className="space-y-3">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Legal Full Name</label>
                                 <Input defaultValue="John Doe Rider" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 shadow-sm" />
                              </div>
                              <div className="space-y-3">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Rider ID #</label>
                                 <Input defaultValue="RIDER-008291" disabled className="h-14 border-slate-100 rounded-2xl bg-slate-50/50 font-black text-slate-400 uppercase tracking-widest text-[11px]" />
                              </div>
                              <div className="space-y-3">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                                 <Input defaultValue="j.doe@logistics.com" type="email" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 shadow-sm" />
                              </div>
                              <div className="space-y-3">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Mobile Contact</label>
                                 <Input defaultValue="+234 800 000 0000" type="tel" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 shadow-sm" />
                              </div>
                              <div className="md:col-span-2 space-y-3">
                                 <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Base Dispatch Region</label>
                                 <Input defaultValue="Victoria Island & Lekki Axis, Lagos State" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 shadow-sm" />
                              </div>
                           </div>

                           <div className="pt-4 flex justify-end">
                              <Button className="h-14 px-12 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 transition-all border-none" disabled={isSubmitting}>
                                 {isSubmitting ? "Persisting Changes..." : "Secure Update Profile"}
                              </Button>
                           </div>
                        </form>
                     </CardContent>
                  </Card>
               )}

               {activeTab === "payout" && (
                  <Card className="border-slate-100 shadow-sm rounded-[3rem] overflow-hidden bg-white">
                     <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-10">
                        <div className="flex items-center gap-3 text-slate-800">
                           <CreditCard className="h-5 w-5 text-primary" />
                           <CardTitle className="text-lg">Settlement Preferences</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent className="p-10 space-y-10">
                        <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-6 shadow-inner">
                           <div className="h-20 w-20 bg-white rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm border border-slate-100 rotate-3 transition-transform hover:rotate-0 duration-500">
                              <CreditCard className="h-10 w-10" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Bank Account Linked</h4>
                              <p className="text-sm text-slate-500 tracking-tight font-medium italic">Earning from completed deliveries are settled automatically every Friday.</p>
                           </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-10">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Settlement Bank</label>
                              <select className="flex h-14 w-full rounded-2xl border border-slate-100 bg-white px-4 py-1 text-sm transition-colors focus-visible:outline-none focus:ring-2 focus:ring-primary/20 font-bold text-slate-700 shadow-sm appearance-none">
                                 <option>Zenith Bank PLC</option>
                                 <option>Access Bank PLC</option>
                                 <option>First Bank of Nigeria</option>
                                 <option>Guaranty Trust Bank</option>
                              </select>
                           </div>
                           <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Account Number</label>
                              <Input defaultValue="2039128312" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-black text-slate-800 tracking-widest text-lg shadow-sm" />
                           </div>
                           <div className="space-y-3 md:col-span-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm Account Name</label>
                              <Input defaultValue="JOHN DOE RIDER" className="h-14 border-slate-100 rounded-2xl bg-slate-50/50 font-black text-slate-400 uppercase tracking-widest text-xs" disabled />
                           </div>
                        </div>

                        <div className="mt-6 pt-10 border-t border-slate-50 flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="h-12 w-12 bg-success/10 rounded-2xl flex items-center justify-center text-success border border-success/10">
                                 <CheckCircle2 className="h-6 w-6" />
                              </div>
                              <p className="text-sm font-bold text-slate-700 italic tracking-tight">System Identity Verified</p>
                           </div>
                           <Button className="h-14 rounded-[2rem] px-10 text-[10px] uppercase tracking-[0.2em] font-black shadow-2xl shadow-primary/20 bg-primary border-none">
                              Save Financial Data
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               )}

               {activeTab === "security" && (
                  <Card className="border-slate-100 shadow-sm rounded-[3rem] overflow-hidden bg-white">
                     <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-10">
                        <div className="flex items-center gap-3 text-slate-800">
                           <Shield className="h-5 w-5 text-primary" />
                           <CardTitle className="text-lg">Security & Privacy</CardTitle>
                        </div>
                     </CardHeader>
                     <CardContent className="p-10 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-white border border-slate-100 group hover:border-primary/20 transition-all shadow-sm">
                           <div className="space-y-2">
                              <h4 className="text-lg font-black text-slate-800 group-hover:text-primary transition-colors tracking-tighter uppercase italic">Access Password</h4>
                              <p className="text-sm font-medium text-slate-500 italic max-w-sm">Ensure your password is complex and rotated every 90 days.</p>
                           </div>
                           <Button variant="outline" className="h-12 rounded-2xl px-6 text-[10px] uppercase font-black tracking-widest border-slate-200 hover:bg-primary/5 hover:text-primary transition-all">
                              Rotate Hash
                           </Button>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-[2.5rem] bg-white border border-slate-100 group hover:border-primary/20 transition-all shadow-sm">
                           <div className="space-y-2">
                              <h4 className="text-lg font-black text-slate-800 group-hover:text-primary transition-colors tracking-tighter uppercase italic">Platform Session</h4>
                              <p className="text-sm font-medium text-slate-500 italic max-w-sm">Securely termination all active sessions across your logistics devices.</p>
                           </div>
                           <Button variant="outline" className="h-12 rounded-2xl px-6 text-[10px] uppercase font-black tracking-widest border-slate-200 hover:bg-destructive/5 hover:text-destructive transition-all hover:border-destructive/20">
                              Purge Sessions
                           </Button>
                        </div>
                     </CardContent>
                  </Card>
               )}
            </div>
         </div>
      </div>
   );
}
