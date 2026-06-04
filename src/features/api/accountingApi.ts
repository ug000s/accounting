import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserRegister, UserProfile, UserUpdate } from "../../utils/types.d";
import { BASE_URL } from "../../utils/constants";
import type { RootState } from "../../app/store.ts";
const authEndpoints = ['updateUser'];

export const accountingApi = createApi({
    reducerPath: 'accountingApi',
    tagTypes: ['profile'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState, endpoint }) => {
            if (authEndpoints.includes(endpoint)) {
                headers.set('Authorization', (getState() as RootState).token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // register user returns user profile and send type UserRegister
        registerUser: builder.mutation<UserProfile, UserRegister>({
            query: (user: UserRegister) => ({
                url: '/account/register',
                method: 'POST',
                body: user,
            }),
        }),
        fetchUser: builder.query<UserProfile, string>({
            query: token => ({
                url: '/account/login',
                method: 'POST',
                headers: {
                    // можно в кавычки обернуть, но не обязательно для объекта если нет дефисов в ключе и прочих специальных символов (пробелы, точки, запятые и т.д.)
                    Authorization: token,
                },
            }),
            providesTags: ['profile'],
        }),
        updateUser: builder.mutation<UserProfile, { user: UserUpdate, login: string }>({
            query: ({ user, login }) => ({
                url: `account/user/${login}`,
                method: 'PATCH',
                body: user
            }),
            invalidatesTags: ['profile'],
        }),
        changePassword: builder.mutation<void, { newPassword: string, token: string }>({
            query: ({ newPassword, token }) => ({
                url: `account/password`,
                method: 'PATCH',
                headers: {
                    Authorization: token,
                },
                body: { password: newPassword },
            }),
        }),
    }),
});

export const { useRegisterUserMutation, useFetchUserQuery, useLazyFetchUserQuery, useUpdateUserMutation, useChangePasswordMutation } = accountingApi;

// export const registerUser = createAsyncThunk(
//     'user/register',
//     async (user: UserRegister) => {
//         const response = await fetch(`${BASE_URL}/account/register`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(user),
//         });
//         if (response.status === 409) {
//             throw new Error(`User with login ${user.login} already exists`);
//         }
//         if (!response.ok) {
//             throw new Error('Failed to register user');
//         }
//         // data - user object
//         const data = await response.json();
//         // token - basic auth token
//         const token = createToken(user.login, user.password);
//         return {
//             token,
//             user: data
//         };
//     }
// );

// export const fetchUser = createAsyncThunk(
//     'user/fetch',
//     async (token: string) => {
//         const response = await fetch(`${BASE_URL}/account/login`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': token,
//             },
//         });
//         if (response.status === 401) {
//             throw new Error('Invalid credentials');
//         }
//         if (!response.ok) {
//             throw new Error('Something went wrong');
//         }
//         const user = await response.json();
//         return { user, token };
//     }
// );

// export const updateUser = createAsyncThunk<UserUpdate, UserUpdate, { state: RootState }>(
//     'user/update',
//     async (user: UserUpdate, { getState }) => {
//         const response = await fetch(`${BASE_URL}/account/user/${getState().user.login}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: getState().token,
//             },
//             body: JSON.stringify(user),
//         });
//         if (response.status === 401) {
//             throw new Error('Invalid credentials');
//         }
//         if (!response.ok) {
//             throw new Error('Failed to update user');
//         }
//         const data = await response.json();
//         return {firstName: data.firstName, lastName: data.lastName};
//     }
// );

// // createAsyncThunk<string, { newPassword: string; oldPassword: string }, { state: RootState }>
// // первый аргумент в дженерике - тип возвращаемого значения, второй что принимает функция (payload), третий состояние ( RootState )
// export const changePassword = createAsyncThunk<string, { newPassword: string; oldPassword: string }, { state: RootState }>(
//     'user/changePassword',
//     async ({newPassword, oldPassword}, { getState }) => {
//         const response = await fetch(`${BASE_URL}/account/password`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: createToken(getState().user.login, oldPassword),
//             },
//             body: JSON.stringify({password: newPassword}),
//         });
//         if (response.status === 401) {
//             throw new Error('Invalid credentials');
//         }
//         if (!response.ok) {
//             throw new Error('Failed to change password');
//         }
//         return createToken(getState().user.login, newPassword);
//     }
// );