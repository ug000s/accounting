import { configureStore } from "@reduxjs/toolkit";
import token from "../features/token/tokenSlice.ts";
import { accountingApi } from "../features/api/accountingApi.ts";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        token,
        // Add the generated reducer as a specific top-level slice
        [accountingApi.reducerPath]: accountingApi.reducer,
    },
    preloadedState: JSON.parse(localStorage.getItem('state') || '{}') as { token: string },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountingApi.middleware),
})

store.subscribe(() => localStorage.setItem('state', JSON.stringify({ token: store.getState().token })));
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

//Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch