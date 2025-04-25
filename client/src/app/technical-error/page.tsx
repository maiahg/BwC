import React from 'react'
import Image from 'next/image';

const Error = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-25 to-blue-100 overflow-hidden">
        <div className="flex flex-col items-center justify-center h-full">
            <Image src="/icons/technical-error.svg" alt="Error" width={500} height={500} className="mb-4" />
            <h1 className="text-4xl font-bold text-blue-900">Technical Error</h1>
            <p className="mt-4 text-lg text-blue-800">We're experiencing a technical issue. Please try again later.</p>
        </div>
    </div>
  );
};

export default Error