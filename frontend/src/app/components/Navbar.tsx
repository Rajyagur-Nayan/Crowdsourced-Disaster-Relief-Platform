"use client";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { LoginDialog } from "./auth/Login";
import { RegisterDialog } from "./auth/Register";

const Navbar = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  return (
    <div>
      <header className="bg-white shadow-sm py-4 px-8 border-b border-purple-200 flex justify-between ">
        <div className="flex items-center space-x-2">
          <Star className="text-blue-600 h-6 w-6" />
          <span className="text-xl font-semibold text-gray-900">logo</span>
        </div>
        <nav className="hidden md:flex space-x-8 text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link
            href="live-map"
            className="hover:text-blue-600 transition-colors"
          >
            Live Map
          </Link>
          <Link href="tasks" className="hover:text-blue-600 transition-colors">
            My Tasks
          </Link>
        </nav>

        {/*  auth component */}
        <div className="flex items-center space-x-4">
          <Button
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-8 py-3 rounded-md text-base font-semibold transition-colors duration-300"
            onClick={() => setIsLoginDialogOpen(true)}
          >
            Login
          </Button>
          {isLoginDialogOpen && (
            <LoginDialog onClose={() => setIsLoginDialogOpen(false)} />
          )}
          <Button
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-8 py-3 rounded-md text-base font-semibold transition-colors duration-300"
            onClick={() => setIsRegisterDialogOpen(true)}
          >
            Register
          </Button>
          {isRegisterDialogOpen && (
            <RegisterDialog onClose={() => setIsRegisterDialogOpen(false)} />
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
