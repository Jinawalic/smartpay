"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { mockOrders, mockProducts } from "@/lib/data";
import { ShoppingCart, Package, Truck, CheckCircle2, User, MapPin, Search, Filter, Eye, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function SellerOrdersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<"all" | "pending" | "shipped" | "delivered">("all");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null);

  const sellerOrders = mockOrders.filter(o => o.sellerId === "seller-1");

  const filteredOrders = sellerOrders.filter(o => {
    const matchesTab = activeTab === "all" || o.status === activeTab;
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.trackingCode.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-50 text-amber-600 border-amber-100";
      case "shipped": return "bg-primary/5 text-primary border-primary/20";
      case "delivered":
      case "completed": return "bg-success/5 text-success border-success/10";
      default: return "bg-slate-100 text-slate-500 border-slate-200";
    }
  };

  const getProduct = (id: string) => mockProducts.find(p => p.id === id);
  const selectedOrder = mockOrders.find(o => o.id === selectedOrderId);
  const selectedProduct = selectedOrder ? getProduct(selectedOrder.productId) : null;

  const handleConfirmOrder = (orderId: string) => {
    // In a real app, we'd update status here
    router.push(`/seller/riders?orderId=${orderId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">Order Management</h2>
          <p className="text-muted-foreground italic text-sm font-medium tracking-tight">Monitor your sales and coordinate deliveries.</p>
        </div>
        <div className="flex items-center bg-white border border-slate-100 p-1.5 rounded-2xl shadow-sm">
          {[
            { id: "all", label: "All", icon: Package },
            { id: "pending", label: "Pending", icon: ShoppingCart },
            { id: "shipped", label: "Shipping", icon: Truck },
            { id: "delivered", label: "Done", icon: CheckCircle2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id
                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-105"
                : "text-slate-400 hover:text-slate-600"
                }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${selectedOrderId ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-4 transition-all duration-500`}>
          <Card className="border-slate-100 shadow-sm rounded-[2rem] overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4 px-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-300" />
                <Input
                  placeholder="Search by Order ID or Buyer Name..."
                  className="pl-10 h-10 bg-white border-slate-100 rounded-xl focus-visible:ring-primary shadow-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/30 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-50">
                    <tr>
                      <th className="px-6 py-4">Order Details</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4 text-center">Status</th>
                      <th className="px-6 py-4 text-right">Revenue</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-slate-600">
                    {filteredOrders.map((order) => {
                      const product = getProduct(order.productId);
                      return (
                        <tr key={order.id} className={`hover:bg-primary/5 transition-colors group ${selectedOrderId === order.id ? 'bg-primary/5' : ''}`}>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-black text-slate-800 text-sm uppercase">{order.id}</span>
                              <span className="text-[10px] font-bold text-slate-400 mt-0.5">{product?.name || 'Unknown Item'}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-500 text-xs">Jane Doe</td>
                          <td className="px-6 py-4 text-center">
                            <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest border-none ${getStatusColor(order.status)}`}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right font-black text-slate-800">₦ {order.amount.toLocaleString()}</td>
                          <td className="px-6 py-4 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`h-9 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedOrderId === order.id ? 'bg-primary text-white' : 'text-primary hover:bg-primary/10'
                                }`}
                              onClick={() => setSelectedOrderId(order.id)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-2" />
                              View
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedOrderId && (
          <Card className="lg:col-span-1 border-primary/20 rounded-xl overflow-hidden bg-white h-fit animate-in slide-in-from-right-4 duration-500">
            <CardHeader className="bg-primary/5 border-b border-primary/10 py-6 px-8 relative">
              <button
                onClick={() => setSelectedOrderId(null)}
                className="absolute top-4 right-4 h-8 w-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all"
              >
                <X className="h-4 w-4" />
              </button>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Order Summary</p>
              <CardTitle className="text-sm font-black text-slate-800">{selectedOrder?.id}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Buyer Information</h4>
                <div className="flex items-center gap-4 p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-inner">
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary shadow-sm">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800 uppercase">Jane Doe</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Verified SmartPay Buyer</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-2 rounded-xl bg-white border border-slate-100">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-slate-500 italic leading-relaxed">{selectedOrder?.deliveryAddress}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Item Purchased</h4>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-2xl bg-slate-50 border border-slate-50 p-2 overflow-hidden shadow-sm shrink-0">
                    <img src={selectedProduct?.image} className="h-full w-full object-contain mix-blend-multiply" alt="" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm line-clamp-2">{selectedProduct?.name}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-black text-primary">₦ {selectedOrder?.amount.toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-black">X 1</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-50 space-y-3">
                {selectedOrder?.status === "pending" ? (
                  <Button
                    className="w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest bg-primary border-none flex items-center justify-center gap-2 transition-all active:scale-95"
                    onClick={() => handleConfirmOrder(selectedOrder.id)}
                  >
                    Confirm Order & Assign Rider
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full h-12 rounded-xl font-black text-xs uppercase tracking-widest border-slate-200 text-slate-400 italic bg-slate-50 cursor-not-allowed">
                    Order Handled
                  </Button>
                )}
                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest italic font-medium px-4">
                  Confirming this order will authorize the shipment process and release the first phase of escrow.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
