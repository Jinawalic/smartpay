export type UserRole = "buyer" | "seller" | "rider" | "admin" | "firs";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  stockLeft?: number;
  description: string;
  image: string;
  sellerId: string;
  category?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  riderId?: string;
  productId: string;
  status: "pending" | "shipped" | "out-for-delivery" | "delivered" | "completed";
  trackingCode: string;
  amount: number;
  taxAmount: number;
  createdAt: string;
  deliveryAddress: string;
}

export const mockProducts: Product[] = [
  {
    id: "prod-1",
    name: "NIVEA MEN Deep Body Lotion",
    price: 4260,
    originalPrice: 6870,
    discountPercentage: 38,
    stockLeft: 50,
    description: "Deep moisture body lotion for men.",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=400&q=80",
    sellerId: "seller-1",
    category: "beauty"
  },
  {
    id: "prod-2",
    name: "Skyrun 75 Litres Double Door Fridge",
    price: 208103,
    originalPrice: 250000,
    discountPercentage: 17,
    stockLeft: 1,
    description: "Compact double door refrigerator.",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
    sellerId: "seller-1",
    category: "appliance"
  },
  {
    id: "prod-3",
    name: "Sony PS4 Slim 500GB Console",
    price: 255000,
    originalPrice: 258000,
    discountPercentage: 1,
    stockLeft: 10,
    description: "PlayStation 4 Slim 500GB.",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&q=80",
    sellerId: "seller-2",
    category: "gaming"
  },
  {
    id: "prod-4",
    name: "SILVER CREST 8L Extra Large Air Fryer",
    price: 34999,
    originalPrice: 43748,
    discountPercentage: 20,
    stockLeft: 22,
    description: "Healthy frying with little to no oil.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80",
    sellerId: "seller-2",
    category: "appliance"
  },
  {
    id: "prod-5",
    name: "LP 32 Inches Smart Digital TV",
    price: 105000,
    originalPrice: 238636,
    discountPercentage: 56,
    stockLeft: 5,
    description: "Frameless smart android TV.",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&q=80",
    sellerId: "seller-1",
    category: "tv"
  },
  {
    id: "prod-6",
    name: "ALagzi New Young Fashion Sneakers",
    price: 15645,
    originalPrice: 34010,
    discountPercentage: 54,
    stockLeft: 100,
    description: "Trendy casual breathable sneakers.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    sellerId: "seller-3",
    category: "fashion"
  },
  {
    id: "prod-7",
    name: "Sun King Solar Fan With Panel",
    price: 94500,
    originalPrice: 105000,
    discountPercentage: 10,
    stockLeft: 15,
    description: "Keep cool when the power goes out.",
    image: "https://images.unsplash.com/photo-1618641499596-13a85aa2d13b?w=400&q=80",
    sellerId: "seller-2",
    category: "electronics"
  },
  {
    id: "prod-8",
    name: "Infinix Hot 40i Smart Phone",
    price: 110000,
    originalPrice: 146666,
    discountPercentage: 25,
    stockLeft: 30,
    description: "Modern smartphone with great battery.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
    sellerId: "seller-1",
    category: "phones"
  }
];

export const mockOrders: Order[] = [
  {
    id: "ORD-123456",
    buyerId: "buyer-1",
    sellerId: "seller-1",
    riderId: "rider-1",
    productId: "prod-1",
    status: "shipped",
    trackingCode: "TXN-829312",
    amount: 1999,
    taxAmount: 199.9,
    createdAt: "2024-03-20T10:00:00Z",
    deliveryAddress: "123 Main St, Lagos",
  },
  {
    id: "ORD-789012",
    buyerId: "buyer-1",
    sellerId: "seller-2",
    productId: "prod-3",
    status: "pending",
    trackingCode: "TXN-112233",
    amount: 349,
    taxAmount: 34.9,
    createdAt: "2024-03-21T14:30:00Z",
    deliveryAddress: "45 Lekki Phase 1, Lagos",
  },
];

export const mockStats = {
  admin: {
    totalTransactions: 1250,
    escrowVolume: 250000,
    totalUsers: 850,
  },
  firs: {
    totalTaxCollected: 25000,
    taxableTransactions: 1250,
  },
  seller: {
    totalSales: 15400,
    walletBalance: 12000,
    pendingOrders: 5,
  },
  buyer: {
    totalOrders: 12,
    activeOrders: 2,
    completedOrders: 10,
  },
  rider: {
    assignedDeliveries: 4,
    completedDeliveries: 45,
  },
};
