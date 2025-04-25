"use client";

import { useGetAuthUserQuery } from "@/state/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (authUser) {
        router.push("/dashboard");
    }
  }, [authUser, router, pathname]);


  return (
    <div className="h-full w-full">
        {children}
    </div>
  );
};

export default Layout;