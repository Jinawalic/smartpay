"use client";

import Link from "next/link";
import { ChevronUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    { label: "CHAT WITH US", href: "#" },
    { label: "HELP CENTER", href: "#" },
    { label: "CONTACT US", href: "#" },
    { label: "TERMS & CONDITIONS", href: "#" },
    { label: "PRIVACY NOTICE", href: "#" },
    { label: "COOKIE NOTICE", href: "#" },
    { label: "BECOME A SELLER", href: "/register?role=seller" },
    { label: "REPORT A PRODUCT", href: "#" },
    { label: "BLACK FRIDAY", href: "#" },
    { label: "DISPUTE RESOLUTION POLICY", href: "#" },
    { label: "RETURNS & REFUND TIMELINE", href: "#" },
    { label: "RETURN POLICY", href: "#" },
  ];

  return (
    <footer className="bg-[#333333] text-white flex flex-col font-sans">
      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className="bg-[#4d4d4d] py-3 flex flex-col items-center justify-center gap-1 hover:bg-[#5a5a5a] transition-colors"
      >
        <ChevronUp className="w-5 h-5" />
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Back to Top</span>
      </button>

      {/* Main Footer Links */}
      <div className="px-4 py-8 md:py-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-6 gap-x-4 text-center">
          {footerLinks.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href} 
              className="text-[10px] md:text-xs font-medium hover:underline tracking-wide leading-relaxed"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#4d4d4d] w-full py-6 md:py-8 bg-[#2d2d2d] flex items-center justify-center">
        <span className="text-sm md:text-base text-[#808080] font-medium">All Rights Reserved</span>
      </div>
    </footer>
  );
}
