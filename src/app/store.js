import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice"
import cartReducer  from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice"
import { shopApi } from "../services/shopService";
import { orderApi } from "../services/orderService";
import { authApi } from "../services/authService";


export const store = configureStore({
    reducer: {
        shopReducer,
        cartReducer,
        authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware).concat(orderApi.middleware).concat(authApi.middleware)
})