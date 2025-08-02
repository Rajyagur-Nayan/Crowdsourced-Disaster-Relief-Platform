"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "./auth/Login";
import { RegisterDialog } from "./auth/Register";

const Navbar = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Star className="text-blue-600 h-6 w-6" />
          <span className="text-xl font-semibold text-gray-900">logo</span>
        </div>

        {/* Desktop Nav */}
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
          <Link
            href="/admin-panel"
            className="hover:text-blue-600 transition-colors"
          >
            Admin Panel
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
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
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link
            href="/"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/live-map"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Live Map
          </Link>
          <Link
            href="/admin-panel"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Admin Panel
          </Link>
        </div>
      )}

      {/* Dialogs */}
      {isLoginDialogOpen && (
        <LoginDialog onClose={() => setIsLoginDialogOpen(false)} />
      )}
      {isRegisterDialogOpen && (
        <RegisterDialog onClose={() => setIsRegisterDialogOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;
