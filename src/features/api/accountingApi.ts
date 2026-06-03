import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserRegister, UserUpdate } from "../../utils/types.d";
import { BASE_URL, createToken } from "../../utils/constants";
import type { RootState } from "../../app/store.ts";

export const registerUser = createAsyncThunk(
    'user/register',
    async (user: UserRegister) => {
        const response = await fetch(`${BASE_URL}/account/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (response.status === 409) {
            throw new Error(`User with login ${user.login} already exists`);
        }
        if (!response.ok) {
            throw new Error('Failed to register user');
        }
        // data - user object
        const data = await response.json();
        // token - basic auth token
        const token = createToken(user.login, user.password);
        return {
            token,
            user: data
        };
    }
);

export const fetchUser = createAsyncThunk(
    'user/fetch',
    async (token: string) => {
        const response = await fetch(`${BASE_URL}/account/login`, {
            method: 'POST',
            headers: {
                'Authorization': token,
            },
        });
        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }
        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        const user = await response.json();
        return { user, token };
    }
);

export const updateUser = createAsyncThunk<UserUpdate, UserUpdate, { state: RootState }>(
    'user/update',
    async (user: UserUpdate, { getState }) => {
        const response = await fetch(`${BASE_URL}/account/user/${getState().user.login}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: getState().token,
            },
            body: JSON.stringify(user),
        });
        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        const data = await response.json();
        return {firstName: data.firstName, lastName: data.lastName};
    }
);

// createAsyncThunk<string, { newPassword: string; oldPassword: string }, { state: RootState }>
// первый аргумент в дженерике - тип возвращаемого значения, второй что принимает функция (payload), третий состояние ( RootState )
export const changePassword = createAsyncThunk<string, { newPassword: string; oldPassword: string }, { state: RootState }>(
    'user/changePassword',
    async ({newPassword, oldPassword}, { getState }) => {
        const response = await fetch(`${BASE_URL}/account/password`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: createToken(getState().user.login, oldPassword),
            },
            body: JSON.stringify({password: newPassword}),
        });
        if (response.status === 401) {
            throw new Error('Invalid credentials');
        }
        if (!response.ok) {
            throw new Error('Failed to change password');
        }
        return createToken(getState().user.login, newPassword);
    }
);