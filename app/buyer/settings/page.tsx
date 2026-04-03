"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { User, Bell, Shield, Wallet, CreditCard, ChevronRight } from "lucide-react";

export default function SettingsPage() {
  const [address, setAddress] = React.useState({
    name: "Titus Jinawa",
    phone: "08089230260",
    street: "Dutse Alhaji, zone 1 by celestial church",
    city: "Kubwa Bwari",
    state: "Federal Capital Territory Nigeria"
  });
  const [tempAddress, setTempAddress] = React.useState(address);
  const [isEditingAddress, setIsEditingAddress] = React.useState(false);

  const saveAddress = () => {
    setAddress(tempAddress);
    setIsEditingAddress(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <aside className="space-y-1">
          <Button variant="secondary" className="w-full justify-start gap-2 h-11 font-semibold">
            <User className="h-4 w-4" /> Personal Info
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 h-11 font-medium text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 h-11 font-medium text-muted-foreground hover:text-foreground">
            <Shield className="h-4 w-4" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 h-11 font-medium text-muted-foreground hover:text-foreground">
            <CreditCard className="h-4 w-4" /> Payment Methods
          </Button>
        </aside>

        <div className="md:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <Input defaultValue="Ruby" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <Input defaultValue="Nafisat" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue="rubynafisat@gmail.com" type="email" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input defaultValue="+234 800 000 0000" type="tel" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <Input defaultValue="********" type="password" />
                </div>
              </div>
              <Button className="mt-4">Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
              <CardDescription>Your default delivery address.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditingAddress ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
                       <Input value={tempAddress.name} onChange={(e) => setTempAddress({...tempAddress, name: e.target.value})} placeholder="Titus Jinawa" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Number</label>
                       <Input value={tempAddress.phone} onChange={(e) => setTempAddress({...tempAddress, phone: e.target.value})} placeholder="08089230260" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Street Address</label>
                    <Input value={tempAddress.street} onChange={(e) => setTempAddress({...tempAddress, street: e.target.value})} placeholder="Dutse Alhaji, zone 1 by celestial church" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">City / Area</label>
                      <Input value={tempAddress.city} onChange={(e) => setTempAddress({...tempAddress, city: e.target.value})} placeholder="Kubwa Bwari" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">State / Territory</label>
                      <Input value={tempAddress.state} onChange={(e) => setTempAddress({...tempAddress, state: e.target.value})} placeholder="Federal Capital Territory Nigeria" />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button onClick={saveAddress} className="flex-1 rounded-xl h-12 font-bold uppercase tracking-widest text-xs">Save Address</Button>
                    <Button variant="ghost" onClick={() => setIsEditingAddress(false)} className="flex-1 rounded-xl h-12 font-bold uppercase tracking-widest text-xs text-slate-400">Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20"></div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-800">{address.name} {address.phone}</p>
                      </div>
                      <p className="text-slate-500 text-sm italic">{address.street}</p>
                      <div className="flex items-center gap-2">
                        <p className="text-slate-500 text-sm italic">{address.city} {address.state} 961103</p>
                        <span className="bg-success/10 text-success text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-tighter">Default Address</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => {
                        setTempAddress(address);
                        setIsEditingAddress(true);
                      }}
                      className="rounded-xl border-slate-200 font-bold uppercase tracking-widest text-[10px] h-9 px-4 hover:border-primary hover:text-primary transition-all shadow-sm"
                    >
                      Edit Address
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 h-14 border border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold uppercase tracking-widest text-xs hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all"
                    onClick={() => {
                      setTempAddress({ name: "", phone: "", street: "", city: "", state: "" });
                      setIsEditingAddress(true);
                    }}
                  >
                    Add New Address
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
