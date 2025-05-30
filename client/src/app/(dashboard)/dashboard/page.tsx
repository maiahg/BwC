"use client";

import React, { useEffect } from "react";
import HeaderBox from "@/components/HeaderBox";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import RightSidebar from "@/components/RightSidebar";
import { useGetAuthUserQuery } from "@/state/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: authUser, isLoading, error } = useGetAuthUserQuery();
  const router = useRouter();
  console.log(authUser);

  if (!isLoading && (!authUser || !authUser.userInfo || error)) {
    window.location.href = "/technical-error";
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl bg-gray-400" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-400" />
          <Skeleton className="h-4 w-[200px] bg-gray-400" />
        </div>
      </div>
    );
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={authUser?.userInfo.given_name || "Guest"}
            subtext="Access and manage your account and transactions with ease."
          />
        </header>
        <TotalBalanceBox
          accounts={[]}
          totalBanks={12031}
          totalCurrentBalance={1200}
        />
        RECENT TRANSACTION
      </div>

      <RightSidebar
        user={authUser?.userInfo!}
        transactions={[]}
        banks={[{ currentBalance: 1200 }, { currentBalance: 2000 }]}
      />
    </section>
  );
};

export default Dashboard;
