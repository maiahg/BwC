import React from 'react';
import { Amplify } from 'aws-amplify';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

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

const formFields = {
    signIn: {
        email: {
            placeholder: "Enter your email",
            label: "Email",
            isRequired: true,
        },
        password: {
            placeholder: "Enter your password",
            label: "Password",
            isRequired: true,
        },
    },
    signUp: {
        firstName: {
            order: 1,
            placeholder: "Enter your first name",
            label: "First Name",
            isRequired: true,
        },
        lastName: {
            order: 2,
            placeholder: "Enter your last name",
            label: "Last Name",
            isRequired: true,
        },
        address: {
            order: 3,
            placeholder: "Enter your address",
            label: "Address",
            isRequired: true,
        },
        SIN : {
            order: 4,
            placeholder: "Enter your SIN",
            label: "SIN",
            isRequired: true,
        },
        dob: {
            order: 5,
            placeholder: "Enter your date of birth",
            label: "Date of Birth",
            isRequired: true,
        },
        email: {
            order: 6,
            placeholder: "Enter your email",
            label: "Email",
            isRequired: true,
        },
        password: {
            order: 7,
            placeholder: "Enter your password",
            label: "Password",
            isRequired: true,
        },
        confirm_password: {
            order: 8,
            placeholder: "Confirm your password",
            label: "Confirm Password",
            isRequired: true,
        },
    },
}

const Auth = ({ children }: { children: React.ReactNode }) => {
    const {user} = useAuthenticator((context) => [context.user]);
  return (
    <div>
        <Authenticator>
            {() => <>{children}</>}
        </Authenticator>
    </div>
  );
}

export default Auth;