"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { mockStats } from "@/lib/data";
import { Wallet, Info, LockKeyhole, ArrowRight, ShieldCheck, History, CreditCard, Download, TrendingUp, ArrowUpRight, ArrowDownLeft, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ToastProvider";
import { Badge } from "@/components/ui/Badge";

export default function WalletPage() {
  const stats = mockStats.seller;
  const { showToast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = React.useState<number | "">("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const amountToWithdraw = Number(withdrawAmount) || 0;
  const taxAmount = amountToWithdraw * 0.10; // 10% tax deduction
  const finalAmount = amountToWithdraw - taxAmount;
  const canWithdraw = amountToWithdraw >= 1000 && amountToWithdraw <= stats.walletBalance;

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canWithdraw) setIsModalOpen(true);
  };

  const confirmWithdrawal = () => {
    showToast(`Withdrawal of ₦ ${finalAmount.toLocaleString()} processed successfully!`, "success");
    setIsModalOpen(false);
    setWithdrawAmount("");
  };

  const transactions = [
    { id: "TXN-9012", type: "withdrawal", amount: 5000, date: "Oct 24, 2024", status: "completed", note: "Access Bank Settlement" },
    { id: "TXN-8821", type: "sale", amount: 12500, date: "Oct 23, 2024", status: "completed", note: "Sale: Sony PS4 Slim" },
    { id: "TXN-8765", type: "sale", amount: 4260, date: "Oct 22, 2024", status: "pending", note: "Sale: NIVEA MEN Lotion" },
    { id: "TXN-8543", type: "withdrawal", amount: 15000, date: "Oct 20, 2024", status: "completed", note: "Bank Transfer" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Financial Hub</h2>
          <p className="text-muted-foreground text-sm italic font-medium tracking-tight">Real-time revenue monitoring and bank settlements.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="flex items-center gap-2 h-11 px-4 rounded-xl border-slate-200 text-slate-600 bg-white shadow-sm ring-offset-2 transition-all active:scale-95">
              <Download className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Revenue Report</span>
           </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Balance & Progress */}
        <div className="md:col-span-4 space-y-6">
           <Card className="bg-primary shadow-2xl shadow-primary/20 border-none rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between min-h-[280px]">
              <div className="absolute -top-10 -right-10 opacity-10">
                 <Wallet className="h-48 w-48 rotate-12" />
              </div>
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Available for Payout</p>
                    <Badge className="bg-white/20 text-white border-transparent text-[9px] font-black">LIVE</Badge>
                 </div>
                 <div className="space-y-1">
                    <p className="text-5xl font-black tracking-tighter">₦ {stats.walletBalance.toLocaleString()}</p>
                    <div className="flex items-center gap-2 text-white/60">
                       <TrendingUp className="h-4 w-4" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">+12% from last week</span>
                    </div>
                 </div>
              </div>
              
              <div className="relative z-10">
                 <div className="flex items-center justify-between p-5 bg-white/10 rounded-[2rem] border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                       <div className="bg-white/20 p-2.5 rounded-2xl text-white shadow-sm"><LockKeyhole className="h-4 w-4" /></div>
                       <div>
                          <p className="text-[10px] text-white/60 font-black uppercase tracking-tight leading-none mb-1.5">Escrow Locked</p>
                          <p className="text-base font-black">₦ 3,450</p>
                       </div>
                    </div>
                    <Info className="h-4 w-4 text-white/40 cursor-help" />
                 </div>
              </div>
           </Card>

           <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden bg-white p-6">
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-primary">
                    <CreditCard className="h-6 w-6" />
                 </div>
                 <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-slate-800">Linked Account</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">Primary Settlement Bank</p>
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group transition-all hover:bg-white hover:border-primary/20">
                    <p className="text-sm font-black text-slate-700">Access Bank PLC</p>
                    <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-[0.1em]">0123 •••• 5678</p>
                 </div>
                 <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl">
                    Update Bank Details
                 </Button>
              </div>
           </Card>
        </div>

        {/* Withdrawal Section */}
        <div className="md:col-span-8 space-y-6">
           <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8 flex flex-row items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-50 shadow-inner">
                       <ArrowUpRight className="h-6 w-6" />
                    </div>
                    <div>
                       <CardTitle className="text-lg">Initiate Settlement</CardTitle>
                       <CardDescription className="text-xs font-bold text-slate-400">Transfer funds to your verified bank account</CardDescription>
                    </div>
                 </div>
              </CardHeader>
              <CardContent className="p-8">
                 <form onSubmit={handleWithdrawalSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Withdrawal Amount (₦)</label>
                          <div className="relative group">
                            <span className="absolute left-5 top-5 text-slate-800 font-black text-2xl">₦</span>
                            <Input 
                              type="number" 
                              placeholder="0.00" 
                              className="pl-12 h-16 border-slate-100 rounded-2xl focus-visible:ring-primary font-black text-2xl text-slate-800 shadow-sm group-hover:border-primary/20 bg-slate-50/50 transition-all"
                              value={withdrawAmount}
                              onChange={(e) => setWithdrawAmount(e.target.value === "" ? "" : Number(e.target.value))}
                            />
                          </div>
                          <p className="text-[10px] text-slate-400 font-bold italic ml-1">Daily Limit: ₦ 1,000,000</p>
                       </div>
                       
                       <Button type="submit" className="w-full h-14 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all border-none ring-offset-2 hover:ring-2 hover:ring-primary/20" disabled={!canWithdraw}>
                          Confirm Settlement Setup
                       </Button>
                    </div>

                    <div className="bg-slate-50/50 rounded-[2rem] border border-slate-100 p-6 flex flex-col justify-center">
                       {amountToWithdraw > 0 && amountToWithdraw <= stats.walletBalance ? (
                         <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Breakdown</h5>
                            <div className="flex justify-between items-center text-xs">
                               <span className="text-slate-500 font-bold uppercase tracking-widest">Requested Gross</span>
                               <span className="font-black text-slate-800">₦ {amountToWithdraw.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-destructive">
                               <span className="font-bold uppercase tracking-widest">WHT Platform Fee (10%)</span>
                               <span className="font-black">- ₦ {taxAmount.toLocaleString()}</span>
                            </div>
                            <div className="pt-4 border-t border-slate-200">
                               <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-1 block">Expected Payout</span>
                               <span className="text-3xl font-black text-primary">₦ {finalAmount.toLocaleString()}</span>
                            </div>
                         </div>
                       ) : (
                         <div className="text-center space-y-3 py-6">
                            <Info className="h-8 w-8 text-slate-200 mx-auto" />
                            <p className="text-xs text-slate-400 font-medium italic">Enter an amount to see a detailed settlement breakdown.</p>
                         </div>
                       )}
                    </div>
                 </form>
              </CardContent>
           </Card>

           <Card className="border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden bg-white">
              <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-8 flex flex-row items-center justify-between">
                 <div className="flex items-center gap-3">
                    <History className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Transaction Ledger</CardTitle>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="relative">
                       <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-300" />
                       <Input placeholder="Search logs..." className="pl-9 h-9 w-48 text-[10px] rounded-xl border-slate-100 bg-white" />
                    </div>
                    <Button variant="outline" size="sm" className="h-9 px-3 rounded-xl border-slate-100">
                       <Filter className="h-3.5 w-3.5" />
                    </Button>
                 </div>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                       <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                          <tr>
                             <th className="px-8 py-4">Transaction</th>
                             <th className="px-8 py-4">Date</th>
                             <th className="px-8 py-4 text-center">Status</th>
                             <th className="px-8 py-4 text-right">Amount</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {transactions.map((txn, i) => (
                             <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5">
                                   <div className="flex items-center gap-4">
                                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 border ${
                                         txn.type === "withdrawal" ? "bg-amber-50 border-amber-100 text-amber-500" : "bg-success/5 border-success/10 text-success"
                                      }`}>
                                         {txn.type === "withdrawal" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                                      </div>
                                      <div>
                                         <p className="font-bold text-slate-800 text-sm line-clamp-1">{txn.note}</p>
                                         <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">{txn.id}</p>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-8 py-5 text-slate-500 text-xs font-bold">{txn.date}</td>
                                <td className="px-8 py-5 text-center">
                                   <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest border-none ${
                                      txn.status === "completed" ? "bg-success/10 text-success" : "bg-slate-100 text-slate-400"
                                   }`}>
                                      {txn.status}
                                   </Badge>
                                </td>
                                <td className={`px-8 py-5 text-right font-black ${txn.type === "withdrawal" ? "text-slate-800 font-bold" : "text-primary text-base"}`}>
                                   {txn.type === "withdrawal" ? "-" : "+"} ₦ {txn.amount.toLocaleString()}
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 <div className="px-8 py-4 bg-slate-50/30 border-t border-slate-50 text-center">
                    <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary">
                       View Complete Transaction History
                    </Button>
                 </div>
              </CardContent>
           </Card>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Confirm Settlement Authorization"
        footer={
           <div className="flex items-center gap-3 w-full">
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200">Cancel</Button>
              <Button onClick={confirmWithdrawal} className="flex-1 h-12 rounded-xl text-[10px] font-black uppercase tracking-widest bg-primary shadow-lg shadow-primary/20 border-none flex gap-2">Confirm & Initiate <ArrowRight className="h-4 w-4" /></Button>
           </div>
        }
      >
        <div className="space-y-6">
           <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-4 shadow-inner">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/50">
                 <div className="space-y-1">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Settlement Destination</p>
                    <p className="text-sm font-bold text-slate-800">Access Bank · 0123 •••• 5678</p>
                 </div>
                 <ShieldCheck className="h-8 w-8 text-success opacity-50" />
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-primary font-black uppercase tracking-widest">Net Credit Amount</p>
                <div className="flex items-center justify-between">
                   <span className="text-3xl font-black text-primary tracking-tighter">₦ {finalAmount.toLocaleString()}</span>
                   <p className="text-[10px] font-bold text-slate-400 italic">Expected in 24-48 hrs</p>
                </div>
              </div>
           </div>
           <p className="text-xs text-slate-500 font-medium leading-relaxed italic text-center px-4">By confirming, you authorize SmartPay to process a bank settlement for your available balance minus statutory platform fees.</p>
        </div>
      </Modal>
    </div>
  );
}
