"use client";

import React, { useEffect } from "react";
import { Amplify } from 'aws-amplify';
import {
    Authenticator,
    useAuthenticator,
    View,
  } from "@aws-amplify/ui-react";
import '@aws-amplify/ui-react/styles.css';
import { useRouter, usePathname } from "next/navigation";

// https://docs.amplify.aws/gen1/react/tools/libraries/configure-categories/
Amplify.configure({
    Auth: {
        Cognito: {
            userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
            userPoolClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
        },
     },
}
);

const components = {
    // TODO: Add a custom header
    SignIn: {
      Footer() {
        const { toSignUp } = useAuthenticator();
        return (
          <View className="text-center mt-4">
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={toSignUp}
                className="text-blue-800 hover:underline bg-transparent border-none p-0"
              >
                Sign up here
              </button>
            </p>
          </View>
        );
      },
    },
    SignUp: {
      FormFields() {
        const { validationErrors } = useAuthenticator();
  
        return (
            <Authenticator.SignUp.FormFields />
        );
      },
  
      Footer() {
        const { toSignIn } = useAuthenticator();
        return (
          <View className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <button
                onClick={toSignIn}
                className="text-blue-800 hover:underline bg-transparent border-none p-0"
              >
                Sign in
              </button>
            </p>
          </View>
        );
      },
    },
  };

const formFields = {
    signIn: {
        username: {
            order: 1,
            placeholder: "Enter your email",
            label: "Email",
            isRequired: true,
          },
        password: {
            order: 2,
            placeholder: "Enter your password",
            label: "Password",
            isRequired: true,
        },
    },
    signUp: {
        name: {
            order: 1,
            isRequired: true,
        },
        username: {
          order: 2,
          placeholder: "Enter your email address",
          label: "Email",
          isRequired: true,
        },
        address: {
            order: 3,
            placeholder: "Enter your address",
            label: "Address",
            isRequired: true,
        },
        birthdate: {
            order: 4,
            isRequired: true,
        },
        password: {
          order: 5,
          placeholder: "Create a password",
          label: "Password",
          isRequired: true,
        },
        confirm_password: {
          order: 6,
          placeholder: "Confirm your password",
          label: "Confirm Password",
          isRequired: true,
        },
      },
}

const Auth = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthPage = pathname.match(/^\/(signin|signup)$/);

    useEffect(() => {
    if (user && isAuthPage) {
      router.push("/");
    }
  }, [user, isAuthPage, router]);
  
    
  return (
    <div className='min-h-screen flex items-center justify-center '>
        <Authenticator
        initialState={pathname.includes("signup") ? "signUp" : "signIn"}
        components={components}
        formFields={formFields}>
            {() => <>{children}</>}
        </Authenticator>
    </div>
  );
}

export default Auth;