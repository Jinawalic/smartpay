import { Order, mockOrders } from "./data";

const STORAGE_KEY = "smartpay_rider_orders";

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return mockOrders;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mockOrders));
      return mockOrders;
    }

    const parsed = JSON.parse(raw) as Order[];
    if (!Array.isArray(parsed)) throw new Error("Invalid order data");
    return parsed;
  } catch (error) {
    console.error("Failed to read order storage", error);
    return mockOrders;
  }
}

export function persistOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function updateOrder(id: string, patch: Partial<Order>): Order | undefined {
  const orders = getStoredOrders();
  const idx = orders.findIndex((order) => order.id === id);
  if (idx === -1) return undefined;
  orders[idx] = { ...orders[idx], ...patch };
  persistOrders(orders);
  return orders[idx];
}

export function getOrderById(id: string): Order | undefined {
  const orders = getStoredOrders();
  return orders.find((order) => order.id === id);
}
