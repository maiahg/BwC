"use client";

import StoreProvider from "@/state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./(auth)/authProvider";
import { usePathname } from "next/navigation";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const publicRoutes = ["/", "/technical-error"];
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <StoreProvider>
      <Authenticator.Provider>
        {isPublicRoute ? children : <Auth>{children}</Auth>}
      </Authenticator.Provider>
    </StoreProvider>
  );
};

export default Providers;