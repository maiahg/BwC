import { createNewUserInDatabase, updateUserInDatabase } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};
      if (idToken) {
        headers.set("Authorization", `Bearer ${idToken}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: [],
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession();
          const { idToken } = session.tokens ?? {};
          const user = await getCurrentUser();

          let userDetailsResponse = await fetchWithBQ(`users/${user.userId}`);

          // if user doesn't exist, create new user
          if (
            userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            userDetailsResponse = await createNewUserInDatabase(
              user,
              idToken,
              fetchWithBQ
            );
          }

          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsResponse.data as UserInfo,
            },
          };
        } catch (error: any) {
          return { error: error.message || "Could not fetch user data" };
        }
      },
    }),

    updateUser: build.mutation<UserInfo, UserInfo>({
      queryFn: async (userInfo, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const user = await getCurrentUser();
          const updateUserResponse = await updateUserInDatabase(
            user.userId,
            userInfo,
            fetchWithBQ
          );

          return { data: updateUserResponse.data as UserInfo };
        } catch (error: any) {
          return { error: error.message || "Could not update user" };
        }
      },
    }),
    

    createLinkToken: build.mutation<{ linkToken: string }, UserInfo>({
      queryFn: async (userInfo, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const plaidLinkTokenResponse = await fetchWithBQ({
            url: "/plaid/create-link-token",
            method: "POST",
            body: {
              cognitoId: userInfo.cognitoId,
            },
          });

          if (plaidLinkTokenResponse.error) {
            return { error: plaidLinkTokenResponse.error };
          }   

          return { data: plaidLinkTokenResponse.data as { linkToken: string } };

        } catch (error: any) {
          return { error: error.message || "Could not fetch plaid link token" };
        }
      }
    }),

    exchangePublicToken: build.mutation<string, { _id: string; public_token: string }>({
      queryFn: async ({_id, public_token}, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const plaidExchangeResponse = await fetchWithBQ({
            url: "/plaid/exchange-public-token",
            method: "POST",
            body: {  
              _id,
              public_token,
            },
          });

          if (plaidExchangeResponse.error) {
            return { error: plaidExchangeResponse.error };
          }

          return { data: plaidExchangeResponse.data as string };
        } catch (error: any) {
          return { error: error.message || "Could not exchange public token" };
        }
      },
    }),
  }),
});

export const {
  useGetAuthUserQuery,
  useUpdateUserMutation, 
  useCreateLinkTokenMutation,
  useExchangePublicTokenMutation,
} = api;
