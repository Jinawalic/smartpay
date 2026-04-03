"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Package, Mail, Star, Ticket, Heart, Store, History, ChevronRight, LogOut, Settings, Wallet } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/CartProvider";
import { useUser } from "@/components/UserProvider";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export function PublicNavbar() {
  const { cartCount } = useCart();
  const { user, isLoggedIn, logout } = useUser();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const menuItems = [
    { label: "Orders", icon: Package, href: "/buyer/orders" },
    { label: "Inbox", icon: Mail, href: "/buyer/inbox" },
    { label: "Pending Reviews", icon: Star, href: "/buyer/reviews" },
    { label: "Voucher", icon: Ticket, href: "/buyer/vouchers" },
    { label: "Wishlist", icon: Heart, href: "/buyer/wishlist" },
    { label: "Followed Sellers", icon: Store, href: "/buyer/sellers" },
    { label: "Recently Viewed", icon: History, href: "/buyer/recent" },
  ];

  const settingsItems = [
    { label: "Account Management", icon: Settings, href: "/buyer/settings" },
    { label: "Logout", icon: LogOut, href: "#", onClick: logout },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6 gap-4">
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-lg md:text-xl font-bold text-primary whitespace-nowrap">
              SmartPay Escrow
            </span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:flex items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products, brands and categories" 
            className="pl-10 bg-muted/50 border-none focus-visible:ring-primary h-10 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
          {/* User Account */}
          <div className="relative">
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn("relative rounded-full", isMenuOpen && "bg-muted")}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <User className="h-5 w-5" />
              </Button>
            ) : (
              <div className="hidden md:flex items-center gap-2 border-r border-border pr-4 mr-2">
                <Link href="/login">
                  <Button variant="ghost" className="text-sm font-medium">Log In</Button>
                </Link>
                <Link href="/register">
                  <Button className="text-sm font-medium">Sign Up</Button>
                </Link>
              </div>
            )}

            {!isLoggedIn && (
               <Link href="/login" className="md:hidden">
                  <Button variant="ghost" size="icon">
                     <User className="h-5 w-5" />
                  </Button>
               </Link>
            )}
          </div>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="px-4 pb-3 md:hidden">
        <div className="flex items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search products, brands and categories" 
            className="pl-10 bg-muted/50 border-none focus-visible:ring-primary h-10 w-full rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* User Dropdown / Slide-out Menu (Simulated Mobile Jumia style) */}
      {isMenuOpen && isLoggedIn && (
        <div className="fixed inset-0 z-50 md:absolute md:top-full md:right-4 md:left-auto md:w-80 md:h-auto md:inset-auto">
          {/* Backdrop for mobile */}
          <div className="md:hidden fixed inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          
          <div className="relative h-full md:h-auto w-full bg-white md:bg-white md:rounded-b-2xl md:shadow-2xl overflow-y-auto animate-in slide-in-from-right md:slide-in-from-top-2 duration-300">
            {/* Header */}
            <div className="bg-primary p-4 pb-6 text-white relative">
              <button 
                className="md:hidden absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full"
                onClick={() => setIsMenuOpen(false)}
              >
                 <ChevronRight className="rotate-180" />
              </button>
              <div className="flex flex-col gap-1 mt-4 md:mt-0">
                <span className="text-xl font-bold">Welcome, {user?.name}</span>
                <span className="text-xs opacity-90">{user?.email}</span>
              </div>
            </div>

            {/* Credit Balance */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 shadow-inner">
               <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                     <Wallet className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-600 truncate">SmartPay credit balance</span>
               </div>
               <span className="font-extrabold text-primary">₦ 0</span>
            </div>

            {/* Menu Sections */}
            <div className="py-2">
               <div className="px-4 py-2 text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-50/50">My SmartPay Account</div>
               <div className="divide-y divide-slate-50">
                  {menuItems.map((item) => (
                     <Link 
                        key={item.label} 
                        href={item.href} 
                        className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
                        onClick={() => setIsMenuOpen(false)}
                     >
                        <div className="flex items-center gap-4">
                           <item.icon className="w-5 h-5 text-slate-500 group-hover:text-primary" />
                           <span className="text-sm font-medium text-slate-700">{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                     </Link>
                  ))}
               </div>

               <div className="px-4 py-2 text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-4 bg-slate-50/50">Account Settings</div>
               <div className="divide-y divide-slate-50">
                  {settingsItems.map((item) => (
                     <Link 
                        key={item.label} 
                        href={item.href} 
                        className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group"
                        onClick={() => {
                           if (item.onClick) item.onClick();
                           setIsMenuOpen(false);
                        }}
                     >
                        <div className="flex items-center gap-4">
                           <item.icon className={cn("w-5 h-5", item.label === "Logout" ? "text-red-500" : "text-slate-500")} />
                           <span className={cn("text-sm font-medium", item.label === "Logout" ? "text-red-500" : "text-slate-700")}>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary" />
                     </Link>
                  ))}
               </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
