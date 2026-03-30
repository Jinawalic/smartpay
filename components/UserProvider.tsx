"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/lib/data";

interface UserContextType {
  user: User | null;
  login: (role: UserRole) => void;
  logout: () => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check for stored user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("smartpay_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: "user-123",
      name: "Titus",
      email: "jinawatitus@gmail.com",
      role: role,
    };
    setUser(mockUser);
    localStorage.setItem("smartpay_user", JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smartpay_user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
