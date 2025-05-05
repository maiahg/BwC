"use client"

import React from 'react';
import InfoForm from "@/components/InfoForm";
import { useGetAuthUserQuery } from '@/state/api'
import { Skeleton } from '@/components/ui/skeleton'

const AddInfo = () => {
    const { data: authUser, isLoading, error} = useGetAuthUserQuery();
      console.log(authUser);

  if (!isLoading && (!authUser || !authUser.userInfo || error)) {
    window.location.href = '/technical-error';
  }

  if (isLoading) {
    return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-400"/>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] bg-gray-400" />
        <Skeleton className="h-4 w-[200px] bg-gray-400" />
      </div>
    </div>
    )
  };

  return (
    <div className='flex-center size-full max-sm:px-6'>
        <InfoForm />
    </div>
  )
}   

export default AddInfo;