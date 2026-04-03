"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { User, Shield, CreditCard, Bell, ChevronRight, Activity, Zap, ShieldCheck, Lock, Globe, Server, Database, Key, Settings, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/ToastProvider";
import { Badge } from "@/components/ui/Badge";

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"platform" | "finance" | "security">("platform");

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast("Platform configurations updated successfully!", "success");
    }, 1200);
  };

  const menuItems = [
    { id: "platform", label: "Platform Policy", icon: Globe },
    { id: "finance", label: "Fee Structure", icon: CreditCard },
    { id: "security", label: "Root Security", icon: Shield },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 uppercase italic">Admin Governance</h2>
          <p className="text-muted-foreground font-medium italic text-sm text-slate-500">Managing global platform constants and security infrastructure.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
           <Badge variant="outline" className="px-4 py-2 text-[10px] uppercase font-black tracking-widest bg-success/10 text-success border-none flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 animate-pulse" />
              Mainnet Active
           </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-4">
           <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden p-1.5 bg-white">
              <div className="space-y-1">
                 {menuItems.map((item) => (
                    <button
                       key={item.id}
                       onClick={() => setActiveTab(item.id as any)}
                       className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                          activeTab === item.id 
                          ? "bg-primary text-white shadow-lg shadow-primary/20" 
                          : "text-slate-500 hover:bg-slate-50/80 hover:text-primary"
                       }`}
                    >
                       <div className="flex items-center gap-3">
                          <item.icon className={`h-4.5 w-4.5 ${activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-primary"}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                       </div>
                       <ChevronRight className={`h-4 w-4 ${activeTab === item.id ? "text-white/50" : "text-slate-300"}`} />
                    </button>
                 ))}
              </div>
           </Card>

           <Card className="bg-slate-900 shadow-2xl shadow-slate-900/10 border-none rounded-[2rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-white/5 opacity-5">
                 <Server className="h-32 w-32 rotate-12" />
              </div>
              <div className="relative z-10 space-y-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Node Status</p>
                    <div className="flex items-center gap-3">
                       <div className="h-2 w-2 rounded-full bg-success animate-ping" />
                       <p className="text-xl font-bold uppercase tracking-tighter italic">Operational</p>
                    </div>
                 </div>
                 <div className="pt-4 space-y-3">
                    <div className="flex justify-between items-center text-[10px] text-white/60 font-medium uppercase tracking-widest">
                       <span>Database Health:</span>
                       <span className="text-success font-black">99.9%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                       <div className="h-full bg-success w-[99%]" />
                    </div>
                 </div>
              </div>
           </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
           {activeTab === "platform" && (
             <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-10 flex items-center justify-between">
                   <div className="flex items-center gap-3 text-slate-800">
                      <Globe className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg uppercase italic font-extrabold tracking-tight">Platform Configuration</CardTitle>
                   </div>
                   <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 rounded-xl">
                      <Settings className="h-5 w-5" />
                   </Button>
                </CardHeader>
                <CardContent className="p-10">
                   <form onSubmit={saveSettings} className="space-y-10">
                      <div className="flex flex-col md:flex-row items-center gap-10 pb-10 border-b border-slate-50">
                         <div className="h-32 w-32 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center p-6 text-slate-200 relative shadow-inner">
                            <img src="/logo.png" className="h-12 w-auto grayscale opacity-40 mb-2" alt="Platform" />
                            <span className="text-[8px] font-black uppercase tracking-widest">Logo Node</span>
                         </div>
                         <div className="flex-1 space-y-3 text-center md:text-left">
                            <h3 className="text-xl font-black text-slate-800 tracking-tight uppercase italic">Branding Intelligence</h3>
                            <p className="text-sm text-slate-500 max-w-sm italic tracking-tight font-medium">Update the global visual identity of the SmartPay hub.</p>
                            <Button variant="outline" className="h-10 px-6 rounded-xl border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:border-primary transition-all">Upload New Assets</Button>
                         </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-10">
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Platform Name</label>
                            <Input defaultValue="SmartPay Escrow Platform" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 shadow-sm" />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Support Email Node</label>
                            <Input defaultValue="hq-support@smartpay.io" type="email" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 shadow-sm" />
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Maintenance Window</label>
                            <select className="flex h-14 w-full rounded-2xl border border-slate-100 bg-white px-4 py-1 text-sm transition-colors focus-visible:outline-none focus:ring-1 focus:ring-primary font-bold text-slate-700 shadow-sm appearance-none">
                               <option>Automated (Sun 2AM - 4AM)</option>
                               <option>Manual Only</option>
                            </select>
                         </div>
                         <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Default Locale</label>
                            <Input defaultValue="en-NG (Lagos Time)" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 shadow-sm" />
                         </div>
                         <div className="md:col-span-2 space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">System Global Announcement</label>
                            <Input placeholder="Message for all users..." className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-bold text-slate-800 shadow-sm" />
                         </div>
                      </div>

                      <div className="pt-4 flex justify-end">
                        <Button className="h-14 px-12 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 bg-primary hover:bg-primary/90 transition-all border-none text-white" disabled={isSubmitting}>
                           {isSubmitting ? "Persisting Changes..." : "Secure Update Architecture"}
                        </Button>
                      </div>
                   </form>
                </CardContent>
             </Card>
           )}

           {activeTab === "finance" && (
             <Card className="border-slate-100 shadow-sm rounded-[3rem] overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-10">
                   <div className="flex items-center gap-3 text-slate-800">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg uppercase italic font-extrabold tracking-tight">Fiscal Algorithm Settings</CardTitle>
                   </div>
                </CardHeader>
                <CardContent className="p-10 space-y-10">
                   <div className="p-8 bg-slate-900/5 border border-slate-100 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-inner overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-8 opacity-5 text-slate-900 pointer-events-none">
                         <Activity className="h-32 w-32" />
                      </div>
                      <div className="h-20 w-20 bg-primary rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-primary/20 transition-transform hover:scale-110 duration-500 shrink-0">
                         <Zap className="h-10 w-10" />
                      </div>
                      <div className="space-y-1 relative z-10 flex-1">
                         <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Dynamic Fee Processing</h4>
                         <p className="text-sm text-slate-500 tracking-tight font-medium italic">Adjust the system commission and tax deduction coefficients.</p>
                      </div>
                   </div>

                   <div className="grid md:grid-cols-3 gap-10">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Escrow Fee %</label>
                        <Input defaultValue="5.0" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-black text-primary text-xl shadow-sm text-center" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">FIRS Tax Deduction %</label>
                        <Input defaultValue="7.5" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-black text-slate-800 text-xl shadow-sm text-center" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Min. Withdrawal Threshold</label>
                        <Input defaultValue="₦ 5,000" className="h-14 border-slate-100 rounded-2xl focus-visible:ring-primary font-black text-slate-800 text-xl shadow-sm text-center" />
                      </div>
                   </div>

                   <div className="space-y-6 pt-10 border-t border-slate-50">
                      <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                         <div className="flex items-center gap-4">
                            <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-success border border-slate-100">
                               <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div className="space-y-1">
                               <p className="text-xs font-black uppercase text-slate-800">Instant Settlement (T+0)</p>
                               <p className="text-[10px] font-medium text-slate-400">Merchant gets paid immediately after buyer confirms delivery.</p>
                            </div>
                         </div>
                         <div className="h-6 w-11 rounded-full bg-primary p-1 flex justify-end cursor-pointer transition-colors shadow-sm">
                            <div className="h-4 w-4 bg-white rounded-full"></div>
                         </div>
                      </div>
                   </div>

                   <div className="flex justify-end pt-4">
                      <Button className="h-14 rounded-[2rem] px-12 text-[10px] uppercase tracking-[0.2em] font-black shadow-2xl shadow-primary/20 bg-primary border-none text-white transition-all active:scale-95">
                         Persist Fiscal Constants
                      </Button>
                   </div>
                </CardContent>
             </Card>
           )}

           {activeTab === "security" && (
             <Card className="border-slate-100 shadow-sm rounded-[3rem] overflow-hidden bg-white">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-10 flex items-center justify-between">
                   <div className="flex items-center gap-3 text-slate-800">
                      <Shield className="h-5 w-5 text-destructive" />
                      <CardTitle className="text-lg uppercase italic font-extrabold tracking-tight">System Defense Node</CardTitle>
                   </div>
                   <Badge variant="outline" className="bg-destructive/10 text-destructive border-none uppercase text-[9px] font-black px-3 py-1">High Risk Access</Badge>
                </CardHeader>
                <CardContent className="p-10 space-y-8">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 rounded-[3rem] bg-white border border-slate-100 relative group overflow-hidden hover:border-destructive/20 transition-all">
                      <div className="absolute top-0 right-0 p-8 opacity-5 text-destructive group-hover:scale-110 transition-transform">
                         <Shield className="h-24 w-24" />
                      </div>
                      <div className="space-y-3 relative z-10">
                         <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter italic">Encryption Hash Rotation</h4>
                         <p className="text-sm font-medium text-slate-500 italic max-w-sm">Force system-wide password reset and clear all active platform sessions.</p>
                      </div>
                      <Button className="h-14 rounded-full px-10 text-[10px] uppercase font-black tracking-widest bg-destructive hover:bg-destructive/90 text-white shadow-xl shadow-destructive/20 border-none transition-all active:scale-95">
                         Trigger Rotation
                      </Button>
                   </div>

                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-10 rounded-[3rem] bg-slate-900 border-none shadow-2xl shadow-slate-200 relative group overflow-hidden">
                      <div className="absolute top-0 left-0 p-8 opacity-5 text-white group-hover:scale-110 transition-transform">
                         <Database className="h-24 w-24" />
                      </div>
                      <div className="space-y-3 relative z-10">
                         <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">Platform Snapshot</h4>
                         <p className="text-sm font-medium text-slate-400 italic max-w-sm tracking-tight leading-relaxed">Initiate a cold-storage backup of the current system state including all escrow ledger data.</p>
                      </div>
                      <Button className="h-14 rounded-full px-10 text-[10px] uppercase font-black tracking-widest bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all active:scale-95">
                         Begin Snapshot
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
