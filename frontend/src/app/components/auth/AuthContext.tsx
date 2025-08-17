"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

interface User {
  id: string;
  name: string;
  role: "admin" | "volunteer" | "normal"; // 👈 define allowed roles
}

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  logout: () => void;
  user: User | null; // 👈 now storing user object
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get("login_token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken); // 👈 fetch user info when token exists
    }
  }, []);

  const fetchUser = async (token: string) => {
    try {
      const res = await axios.get("http://localhost:8080/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      // 👈 backend should return { id, name, role }
    } catch (err) {
      console.error("Failed to fetch user", err);
      setUser(null);
    }
  };

  const logout = () => {
    Cookies.remove("login_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        logout,
        user, // 👈 provided to Navbar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
