import { api } from './index';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (credentials) => ({
        url: `auth/login`,
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `auth/logout`,
      }),
    }),
    getUser: build.mutation({
      query: () => ({
        url: `auth/user`,
      }),
    }),
  }),
});

export const { useLoginMutation, useGetUserMutation, useLogoutMutation } =
  authApi;
