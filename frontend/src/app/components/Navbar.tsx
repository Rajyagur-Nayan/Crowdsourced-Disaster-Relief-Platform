"use client";

import { Button } from "@/components/ui/button";
import { Star, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { LoginDialog } from "./auth/Login";
import { RegisterDialog } from "./auth/Register";
import { useAuth } from "./auth/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-white dark:bg-gray-950 shadow-sm py-4 px-6 md:px-8 border-b border-purple-200 dark:border-gray-800 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Star className="text-blue-600 h-6 w-6" />
        <span className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          logo
        </span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-8 text-gray-700 dark:text-gray-300">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <Link href="/live-map" className="hover:text-blue-600">
          Live Map
        </Link>
        <Link href="/admin-panel" className="hover:text-blue-600">
          Admin Panel
        </Link>
      </nav>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center md:space-x-4 ">
        <div>
          <button
            type="button"
            onClick={toggleTheme}
            className=" p-2  rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        {isAuthenticated ? (
          <Button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm"
          >
            Logout
          </Button>
        ) : (
          <>
            <Button
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm"
              onClick={() => setIsLoginDialogOpen(true)}
            >
              Login
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white text-sm"
              onClick={() => setIsRegisterDialogOpen(true)}
            >
              Register
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex-row space-x-2">
        <button
          type="button"
          onClick={toggleTheme}
          className=" p-2  rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "dark" ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Sun />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Moon />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-t shadow-md md:hidden z-50 px-6 py-4 space-y-4"
          >
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Home
            </Link>
            <Link
              href="/live-map"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Live Map
            </Link>
            <Link
              href="/admin-panel"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              Admin Panel
            </Link>
            {isAuthenticated ? (
              <Button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-red-600"
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => {
                    setIsLoginDialogOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-blue-600"
                >
                  Login
                </Button>
                <Button
                  onClick={() => {
                    setIsRegisterDialogOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-green-600"
                >
                  Register
                </Button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
