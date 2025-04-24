"use client";

import React from "react";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import MobileHeader from "./MobileHeader";

const Header = () => {
  const router = useRouter();
  return (
<header className="w-full py-4 px-6 md:px-12 bg-white border-b border-gray-300 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-start">
          <div className="flex items-center">
            <Link href="/" className="flex items-center cursor-pointer hover:opacity-80">
                <div className="mr-2">
                <Image
                    src="/icons/logo.svg"
                    alt="BwC Logo"
                    width={30} height={30}
                />
                </div>
                <span className="text-2xl font-bold">BwC</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            <p className="font-bold">Discover a new way of banking with BwC</p>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:flex form-btn-secondary" onClick={() => router.push('/signin')}> 
              Sign In
            </Button>
            <Button className="hidden md:flex form-btn" onClick={() => router.push('/signup')}>
              Sign Up
            </Button>
            <div className="flex items-center justify-between pr-5 sm:pr-8 md:hidden">
            <MobileHeader />
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header;