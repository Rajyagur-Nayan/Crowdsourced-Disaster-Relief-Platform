"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LoginDialog } from "./auth/Login";
import { RegisterDialog } from "./auth/Register";
import { useAuth } from "./auth/AuthContext";

const Navbar = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  // Optional: avoid showing UI until client-side token is checked
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div>
      <header className="bg-white shadow-sm py-4 px-8 border-b border-purple-200 flex justify-between">
        <div className="flex items-center space-x-2">
          <Star className="text-blue-600 h-6 w-6" />
          <span className="text-xl font-semibold text-gray-900">logo</span>
        </div>

        <nav className="hidden md:flex space-x-8 text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link
            href="/live-map"
            className="hover:text-blue-600 transition-colors"
          >
            Live Map
          </Link>
          <Link href="/tasks" className="hover:text-blue-600 transition-colors">
            My Tasks
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <Button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsLoginDialogOpen(true)}
              >
                Login
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium"
                onClick={() => setIsRegisterDialogOpen(true)}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Dialogs */}
        {isLoginDialogOpen && (
          <LoginDialog onClose={() => setIsLoginDialogOpen(false)} />
        )}
        {isRegisterDialogOpen && (
          <RegisterDialog onClose={() => setIsRegisterDialogOpen(false)} />
        )}
      </header>
    </div>
  );
};

export default Navbar;
