"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { mockStats } from "@/lib/data";
import { Wallet, Info, LockKeyhole, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

export default function WalletPage() {
  const stats = mockStats.seller;
  const [withdrawAmount, setWithdrawAmount] = React.useState<number | "">("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const amountToWithdraw = Number(withdrawAmount) || 0;
  const taxAmount = amountToWithdraw * 0.10; // 10% tax deduction
  const finalAmount = amountToWithdraw - taxAmount;
  const canWithdraw = amountToWithdraw > 0 && amountToWithdraw <= stats.walletBalance;

  const handleWithdrawalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canWithdraw) setIsModalOpen(true);
  };

  const confirmWithdrawal = () => {
    alert(`Success! withdrawal of $${finalAmount.toFixed(2)} processed to your bank.`);
    setIsModalOpen(false);
    setWithdrawAmount("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wallet & Withdrawals</h2>
          <p className="text-muted-foreground mt-1">Manage your funds and process withdrawals.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-primary to-indigo-700 text-white shadow-lg border-none">
          <CardHeader>
             <CardTitle className="text-primary-foreground/80 font-medium">Available Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="text-4xl font-bold">${stats.walletBalance.toLocaleString()}</div>
             
             <div className="flex items-center gap-3 pt-4 border-t border-primary-foreground/20">
                <div className="bg-white/20 p-2 rounded-full"><LockKeyhole className="h-4 w-4" /></div>
                <div>
                   <p className="text-xs text-primary-foreground/80 font-medium">Escrow Hold</p>
                   <p className="text-sm font-semibold">$3,450.00</p>
                </div>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle>Withdraw Funds</CardTitle>
             <CardDescription>Withdraw to your linked bank account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleWithdrawalSubmit} className="space-y-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Amount ($)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">$</span>
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="pl-8"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value === "" ? "" : Number(e.target.value))}
                      max={stats.walletBalance}
                      min={10}
                    />
                  </div>
                  {amountToWithdraw > stats.walletBalance && (
                    <p className="text-xs text-destructive">Amount exceeds available balance.</p>
                  )}
               </div>

               {amountToWithdraw > 0 && amountToWithdraw <= stats.walletBalance && (
                 <div className="p-4 rounded-xl border border-border bg-muted/30 animate-in fade-in zoom-in-95 mt-4 space-y-2">
                   <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Withdrawal Amount:</span>
                      <span>${amountToWithdraw.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-sm text-destructive">
                      <span className="font-medium">Platform Tax (10%):</span>
                      <span>-${taxAmount.toFixed(2)}</span>
                   </div>
                   <div className="pt-2 mt-2 border-t border-border flex justify-between font-bold">
                      <span>You Receive:</span>
                      <span className="text-success">${finalAmount.toFixed(2)}</span>
                   </div>
                 </div>
               )}

               <Button type="submit" className="w-full mt-6" disabled={!canWithdraw}>
                  Preview Withdrawal
               </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
           <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <CardTitle>Linked Bank Account</CardTitle>
           </div>
           <CardDescription>Your funds will be sent to this account seamlessly.</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center justify-between p-4 border border-border rounded-xl">
               <div className="space-y-1">
                  <p className="font-semibold text-lg">Guaranty Trust Bank</p>
                  <p className="text-sm text-muted-foreground font-medium tracking-widest bg-muted px-2 py-0.5 rounded inline-block">0123 •••• 5678</p>
                  <p className="text-sm">John Doe</p>
               </div>
               <Button variant="outline">Edit Bank</Button>
           </div>
        </CardContent>
      </Card>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Confirm Withdrawal"
        footer={
           <>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button onClick={confirmWithdrawal} className="flex gap-2">Confirm & Send <ArrowRight className="h-4 w-4" /></Button>
           </>
        }
      >
        <div className="space-y-4">
           <p className="text-sm text-muted-foreground">Please review your withdrawal details carefully before confirming. Funds will be deposited in 1-2 business days.</p>
           
           <div className="p-4 bg-muted/30 border border-border rounded-xl space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-medium">Bank</span>
                <span className="text-sm font-semibold">GTBank ••••5678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground font-medium">To Receive</span>
                <span className="text-sm font-bold text-success">${finalAmount.toFixed(2)}</span>
              </div>
           </div>
        </div>
      </Modal>

    </div>
  );
}
