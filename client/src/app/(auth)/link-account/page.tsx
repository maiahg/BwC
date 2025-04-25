"use client"

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LinkAccount = () => {
  const router = useRouter();

  const handleLinkAccount = () => {
    console.log("Link Account button clicked");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/icons/logo.svg"
        alt="FinEase Logo"
        width={150}
        height={150}
        className="mb-8"
      />
      <h1 className="text-2xl font-bold mb-4">Link Your Account</h1>
      <p className="mb-6 text-center">
        Signed up successfully. Link your account to start banking with confidence.
      </p>
      <button
        onClick={handleLinkAccount}
        className="px-6 py-3 form-btn"
      >
        Link Account
      </button>
    </div>
  );
};

export default LinkAccount;