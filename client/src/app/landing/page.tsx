import React from 'react'
import Header from '@/app/landing/Header'
import HeroSection from '@/app/landing/HeroSection'

const Landing = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-25 to-blue-100 overflow-hidden">
      <Header />
      <HeroSection />
    </div>
  )
}

export default Landing