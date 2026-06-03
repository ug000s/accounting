import { createSlice } from "@reduxjs/toolkit";
import { registerUser, fetchUser, changePassword } from "../api/accountingApi";

const initialState = ''

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken: (_, action) => action.payload,
        clearToken: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (_, action) => action.payload.token)
            .addCase(fetchUser.fulfilled, (_, action) => action.payload.token)
            .addCase(changePassword.fulfilled, (_, action) => action.payload)
            
    }
}); 

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
