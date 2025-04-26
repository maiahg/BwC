"use client"

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PlaidLink from '@/components/PlaidLink';
import { useGetAuthUserQuery } from '@/state/api'


const LinkAccount = () => {
  const { data: authUser, isLoading, error} = useGetAuthUserQuery();
  const router = useRouter();

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
      <PlaidLink user={authUser?.userInfo} variant="primary" />
    </div>
  );
};

export default LinkAccount;