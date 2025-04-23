'use client';
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from 'next/navigation'

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className={`space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
            Bank with <span className="text-bankGradient">Confidence</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-lg">
            Access & manage your finances with ease. <br />BwC provides a seamless banking experience with powerful tools and features.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="landing-btn" onClick={() => router.push('/sign-up')}>Get Started</Button>
          </div>
        </div>
        <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
          <Image 
            src="/icons/landing.svg" 
            alt="Horizon Banking Dashboard" 
            width={700}
            height={700}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
