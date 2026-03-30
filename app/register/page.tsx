"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UserRole } from "@/lib/data";
import { Tabs } from "@/components/ui/Tabs";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = React.useState<"buyer" | "seller" | "rider">("buyer");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // After registration, send them to login using absolute navigation for mobile reliability
      window.location.href = "/login";
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/50 p-4 py-12">
      <div className="w-full max-w-lg relative z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Join SmartPay
          </h1>
          <p className="text-muted-foreground mt-2">Create your account to start</p>
        </div>

        <Card className="border-border shadow-xl shadow-primary/5">
          <CardHeader className="space-y-4 text-center pb-2">
            <Tabs 
              tabs={["Buyer", "Seller", "Rider"]} 
              activeTab={role.charAt(0).toUpperCase() + role.slice(1)} 
              onTabChange={(tab) => setRole(tab.toLowerCase() as any)} 
              className="w-full flex" 
            />
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input type="text" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input type="text" placeholder="Doe" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input type="email" placeholder="john@example.com" required />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <Input type="tel" placeholder="+1 (555) 000-0000" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" required />
              </div>

              {/* Role specific fields */}
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                {role === "seller" && (
                  <div className="space-y-4 mt-6 p-4 rounded-xl border border-border bg-muted/50">
                    <h3 className="text-sm font-semibold text-primary">Bank Details (For Withdrawals)</h3>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Bank Name</label>
                      <select className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                        <option>Guaranty Trust Bank</option>
                        <option>Access Bank</option>
                        <option>Zenith Bank</option>
                        <option>First Bank</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Account Number</label>
                      <Input type="text" placeholder="0123456789" required minLength={10} maxLength={10} className="h-10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Account Name</label>
                      <Input type="text" placeholder="John Doe" required className="h-10" />
                    </div>
                  </div>
                )}

                {role === "rider" && (
                  <div className="space-y-4 mt-6 p-4 rounded-xl border border-border bg-muted/50">
                    <h3 className="text-sm font-semibold text-primary">Verification</h3>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Upload ID (Driver's License / NIN)</label>
                      <Input type="file" required className="py-1.5 cursor-pointer file:cursor-pointer" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Vehicle Plate Number (Optional)</label>
                      <Input type="text" placeholder="ABC-123XY" className="h-10" />
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full mt-6" size="lg" isLoading={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center border-t border-border pt-6 pb-6">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
