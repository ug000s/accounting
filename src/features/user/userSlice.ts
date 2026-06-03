import { createSlice } from "@reduxjs/toolkit";
import type { UserProfile } from "../../utils/types";
import { registerUser, fetchUser, updateUser } from "../api/accountingApi";

const initialState = {} as UserProfile;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
        clearUser: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.fulfilled, (_, action) => action.payload.user)
            .addCase(registerUser.fulfilled, (_, action) => action.payload.user)
            .addCase(updateUser.fulfilled, (state, action) => {
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
            })
    }
});

export const { setFirstName, setLastName, clearUser } = userSlice.actions;
export default userSlice.reducer;