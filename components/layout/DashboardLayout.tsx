"use client";

import * as React from "react";
import { UserRole } from "@/lib/data";
import { Navbar } from "./Navbar";
import { NavItem, Sidebar } from "./Sidebar";
import { ShieldCheck, LayoutDashboard, ShoppingCart, Activity, History, Users, Search, Truck, LogOut, Wallet, FileText, Package, Settings } from "lucide-react";


interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
}

const getNavigationItems = (role: UserRole): NavItem[] => {
  switch (role) {
    case "admin":
      return [
        { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { title: "Transactions", href: "/admin/transactions", icon: History },
        { title: "Users", href: "/admin/users", icon: Users },
        { title: "Disputes", href: "/admin/disputes", icon: ShieldCheck },
        { title: "Settings", href: "/admin/settings", icon: Settings },
      ];
    case "buyer":
      return [
        { title: "Dashboard", href: "/buyer", icon: LayoutDashboard },
        { title: "Products", href: "/buyer/products", icon: Package },
        { title: "Cart", href: "/buyer/cart", icon: ShoppingCart },
        { title: "Track Order", href: "/buyer/track", icon: Search },
        { title: "Order History", href: "/buyer/orders", icon: History },
      ];
    case "seller":
      return [
        { title: "Dashboard", href: "/seller", icon: LayoutDashboard },
        { title: "My Products", href: "/seller/products", icon: Package },
        { title: "Orders", href: "/seller/orders", icon: ShoppingCart },
        { title: "Riders", href: "/seller/riders", icon: Truck },
        { title: "Wallet", href: "/seller/wallet", icon: Wallet },
      ];
    case "rider":
      return [
        { title: "Dashboard", href: "/rider", icon: LayoutDashboard },
        { title: "History", href: "/rider/history", icon: History },
        { title: "Settings", href: "/rider/settings", icon: Settings },
      ];
    case "firs":
      return [
        { title: "Dashboard", href: "/firs", icon: LayoutDashboard },
        { title: "Tax Reports", href: "/firs/reports", icon: FileText },
        { title: "Transactions", href: "/firs/transactions", icon: History },
      ];
    default:
      return [];
  }
};


export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const items = getNavigationItems(role);

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/20">
      <Navbar role={role} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar 
          items={items} 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <main className="flex-1 overflow-y-auto w-full bg-secondary/50 p-4 md:p-8 md:pl-8">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
