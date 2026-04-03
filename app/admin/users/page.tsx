"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { User, Users, Shield, MapPin, Search, Filter, Mail, Phone, ExternalLink, ShieldCheck, UserCheck, Trash2, Ban } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const mockUsers = [
    { id: "USR-001", name: "Ahmed Musa", email: "ahmed.m@example.com", role: "buyer", status: "active", location: "Lagos, NG" },
    { id: "USR-002", name: "Chinelo Obi", email: "obi.chi@merchants.com", role: "seller", status: "active", location: "Enugu, NG" },
    { id: "USR-003", name: "Babajide Sanwo", email: "jide@logistics.co", role: "rider", status: "pending", location: "Ikeja, NG" },
    { id: "USR-004", name: "Blessing Okoro", email: "bless.ok@buyer.net", role: "buyer", status: "active", location: "Abuja, NG" },
    { id: "USR-005", name: "Kelechi Ndukwe", email: "k.ndukwe@store.ng", role: "seller", status: "suspended", location: "Port Harcourt, NG" },
    { id: "USR-006", name: "Abubakar Sadiq", email: "abu.s@rider.com", role: "rider", status: "active", location: "Kano, NG" },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "buyer":
        return <Badge className="bg-primary/10 text-primary border-none rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest">Buyer</Badge>;
      case "seller":
        return <Badge className="bg-success/10 text-success border-none rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest">Merchant</Badge>;
      case "rider":
        return <Badge className="bg-amber-500/10 text-amber-500 border-none rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest">Courier</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-400 border-none rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success text-white border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest shadow-sm">Verified</Badge>;
      case "pending":
        return <Badge className="bg-slate-100 text-slate-400 border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest">Pending</Badge>;
      case "suspended":
        return <Badge className="bg-destructive text-white border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest shadow-sm">Suspended</Badge>;
      default:
        return <Badge className="bg-slate-100 text-slate-400 border-none rounded-full px-4 py-1 text-[9px] font-black uppercase tracking-widest">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800 uppercase italic">User Directory</h2>
          <p className="text-muted-foreground font-medium italic text-sm text-slate-500">Registry of all platform stakeholders and account statuses.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button className="h-11 px-6 rounded-xl shadow-lg shadow-primary/20 bg-primary border-none">
              <UserCheck className="h-4 w-4 mr-2" />
              <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Global Verification</span>
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {[
           { title: "Total Hub Users", value: "8,920", icon: Users, color: "text-primary", trend: "+45 this week" },
           { title: "Active Merchants", value: "1,240", icon: ShieldCheck, color: "text-success", trend: "Fully KYB-Verified" },
           { title: "Verified Couriers", value: "340", icon: UserCheck, color: "text-amber-500", trend: "High Availability" },
           { title: "Blocked Entities", value: "12", icon: Ban, color: "text-destructive", trend: "Security Flags" },
         ].map((stat, i) => (
           <Card key={i} className="border-slate-100 shadow-sm rounded-2xl p-6 hover:border-primary/20 transition-all group overflow-hidden relative bg-white">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                 <stat.icon className="h-10 w-10" />
              </div>
              <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{stat.title}</CardTitle>
              <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight italic">{stat.trend}</p>
           </Card>
         ))}
      </div>

      <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
         <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
               <Shield className="h-5 w-5 text-primary" />
               <CardTitle className="text-lg">Permission Management</CardTitle>
            </div>
            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="Search by Identity or Metadata..." 
                    className="pl-10 h-10 w-full md:w-64 text-[10px] rounded-xl border-slate-100 bg-white focus-visible:ring-primary shadow-none" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
               <Button variant="outline" className="h-10 px-3 rounded-xl border-slate-200">
                  <Filter className="h-4 w-4" />
               </Button>
            </div>
         </CardHeader>
         <CardContent className="p-0">
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/30 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50 font-sans">
                     <tr>
                        <th className="px-8 py-5">Platform User Identity</th>
                        <th className="px-8 py-5">Classification</th>
                        <th className="px-8 py-5 text-center">Status Index</th>
                        <th className="px-8 py-5">Contact Node</th>
                        <th className="px-8 py-5 text-right">Administrative Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                     {mockUsers.map((user, i) => (
                        <tr key={i} className="hover:bg-primary/5 transition-colors group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 rounded-[1.25rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-200 shadow-sm relative group-hover:scale-110 transition-transform">
                                    <User className="h-6 w-6" />
                                    <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-success"></div>
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="font-black text-slate-800 text-sm uppercase tracking-tight italic">{user.name}</span>
                                    <span className="text-[10px] font-black text-slate-400 mt-0.5 uppercase tracking-tighter opacity-70">HASH: {user.id}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              {getRoleBadge(user.role)}
                           </td>
                           <td className="px-8 py-6 text-center">
                              {getStatusBadge(user.status)}
                           </td>
                           <td className="px-8 py-6">
                              <div className="flex flex-col space-y-1">
                                 <div className="flex items-center gap-2">
                                    <Mail className="h-3 w-3 text-slate-300" />
                                    <span className="text-[11px] font-bold text-slate-500 italic lowercase">{user.email}</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3 text-slate-300" />
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{user.location}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2 px-4 py-2 opacity-100 md:opacity-40 hover:opacity-100 transition-opacity">
                                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:text-primary transition-all border border-transparent shadow-none hover:shadow-sm">
                                    <ExternalLink className="h-4 w-4" />
                                 </Button>
                                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:text-destructive transition-all border border-transparent shadow-none hover:shadow-sm hover:border-destructive/10">
                                    <Ban className="h-4 w-4" />
                                 </Button>
                                 <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white hover:text-destructive transition-all border border-transparent shadow-none hover:shadow-sm hover:border-destructive/20">
                                    <Trash2 className="h-4 w-4" />
                                 </Button>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
               <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
                  Next Sequence (Sequence 02)
               </Button>
            </div>
         </CardContent>
      </Card>
    </div>
  );
}
