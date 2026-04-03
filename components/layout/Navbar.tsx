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

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";

export function Navbar({ role, onMenuClick }: NavbarProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md px-4">
      <div className="flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4 shrink-0">
          {onMenuClick && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
              <Menu className="h-6 w-6 text-slate-600" />
            </Button>
          )}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-black bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent tracking-tighter">
              SmartPay
            </span>
            <Badge variant="outline" className="hidden sm:inline-flex border-primary/20 bg-primary/5 text-primary text-[10px] uppercase font-black tracking-widest px-2">
              {role}
            </Badge>
          </Link>
        </div>

        {/* Global Dashboard Search */}
        <div className="flex-1 max-w-lg hidden md:flex items-center relative group">
           <Search className="absolute left-3 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
           <Input 
             placeholder={`Search products...`} 
             className="pl-10 h-10 bg-slate-50 border-slate-100 focus-visible:ring-primary rounded-xl"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             onKeyDown={handleSearch}
           />
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Button variant="ghost" size="icon" className="relative hover:bg-slate-50 rounded-full">
            <Bell className="h-5 w-5 text-slate-500" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-destructive border-2 border-white" />
          </Button>
          <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden sm:block"></div>
          <Link href={`/${role}/settings`}>
            <Button variant="ghost" className="flex items-center gap-2 p-1 md:px-3 hover:bg-slate-50 rounded-xl">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                {role[0]}
              </div>
              <span className="hidden lg:inline-flex text-xs font-black text-slate-600 uppercase tracking-wider">Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
