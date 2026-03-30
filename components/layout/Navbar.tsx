"use client";

import * as React from "react";
import Link from "next/link";
import { UserRole } from "@/lib/data";
import { Bell, Menu, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface NavbarProps {
  role: UserRole;
  onMenuClick?: () => void;
}

export function Navbar({ role, onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              SmartPay Escrow
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex capitalize">
              {role} Portal
            </Badge>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <div className="flex items-center gap-2">
            <Link href="/settings">
              <Button variant="ghost" className="flex items-center gap-2 px-2 md:px-4">
                <UserCircle className="h-6 w-6" />
                <span className="hidden md:inline-flex text-sm font-medium">My Account</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
