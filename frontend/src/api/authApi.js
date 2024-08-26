import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/v1/users",
    credentials:"include"
   }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (newUser) => ({
        url: "/signup",
        method: "POST",
        body: newUser,
       
      }),
    }),
    signin: builder.mutation({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
    }),
    signout: builder.query({
      query: () => "/singout",
    }),
  }),
});

export const { useSigninMutation, useSignoutQuery, useSignupMutation } =
  authApi;
