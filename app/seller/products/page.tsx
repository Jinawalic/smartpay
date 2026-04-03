"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { mockProducts } from "@/lib/data";
import { Plus, Search, Edit, Trash2, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ToastProvider";

export default function SellerProductsPage() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [products, setProducts] = React.useState(mockProducts.filter(p => p.sellerId === "seller-1"));
  
  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setProducts(products.filter(p => p.id !== id));
      showToast(`${name} has been removed from your inventory.`, "success");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">My Products</h2>
          <p className="text-muted-foreground italic text-sm font-medium tracking-tight">Manage your inventory and product listings.</p>
        </div>
        <Link href="/seller/products/new">
          <Button className="flex items-center gap-2 h-11 px-6 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-95">
            <Plus className="h-5 w-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Add New Product</span>
          </Button>
        </Link>
      </div>

      <Card className="border-slate-100 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-lg">Product Inventory</CardTitle>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search products..." 
                className="pl-9 h-10 bg-white border-slate-200 rounded-xl focus-visible:ring-primary"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4 text-center">Category</th>
                  <th className="px-6 py-4 text-center">Price</th>
                  <th className="px-6 py-4 text-center">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg border border-slate-100 bg-white p-1 overflow-hidden shrink-0 shadow-sm">
                          <img src={product.image} alt={product.name} className="h-full w-full object-contain mix-blend-multiply transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 line-clamp-1 truncate max-w-[200px]">{product.name}</span>
                          <span className="text-[9px] text-slate-400 font-black tracking-widest mt-0.5">ITEM: {product.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline" className="capitalize border-slate-200 text-slate-400 font-black text-[9px] tracking-widest bg-white">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-black text-slate-900">₦ {product.price.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                         <div className={`h-1 w-8 rounded-full ${product.stockLeft && product.stockLeft > 5 ? "bg-success" : "bg-warning"}`} />
                         <span className="font-black text-slate-500 text-[10px] tracking-tighter">{product.stockLeft ?? 0} UNITS</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/seller/products/edit/${product.id}`}>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-300 hover:text-primary hover:bg-primary/5 transition-all">
                            <Edit className="h-4.5 w-4.5" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-9 w-9 rounded-xl text-slate-300 hover:text-destructive hover:bg-destructive/5 transition-all"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </Button>
                        <Link href={`/product/${product.id}`} target="_blank">
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-300 hover:text-primary hover:bg-primary/5 transition-all">
                            <ExternalLink className="h-4.5 w-4.5" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-slate-300 italic font-medium tracking-tight">
                      No matching products discovered in your inventory.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg border-slate-200 disabled:opacity-30 bg-white"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`h-8 w-8 rounded-lg text-[10px] font-black transition-all ${
                        currentPage === i + 1 
                        ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" 
                        : "bg-white text-slate-400 hover:text-primary"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg border-slate-200 disabled:opacity-30 bg-white"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
