"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useUser } from "@/components/UserProvider";

export default function BuyerLoginPage() {
  const router = useRouter();
  const { login } = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);

    // Call the login context
    login("buyer");

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      const searchParams = new URLSearchParams(window.location.search);
      const redirectUrl = searchParams.get('redirect');

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        window.location.href = `/buyer`;
      }
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary/50 p-4 md:py-12">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 my-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            SmartPay Escrow
          </h1>
          <p className="text-muted-foreground mt-2">Secure payments for buyers</p>
        </div>
        <Card className="border-border shadow-xl shadow-primary/5">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Buyer Login</CardTitle>
            <CardDescription>Enter your email and password to login as a buyer</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <Input type="email" placeholder="m@example.com" defaultValue="demo@smartpay.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                  </label>
                  <Link href="#" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input type="password" defaultValue="password123" required />
              </div>
              <Button type="submit" className="w-full mt-6" size="lg" isLoading={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Create one
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}