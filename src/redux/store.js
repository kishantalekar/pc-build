import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product/productSlice";
import { apiSlice } from "./api/apiSlice";
import cartSlice from "./cart/cartSlice";
import { authSlice } from "./user/user";
export const store = configureStore({
  reducer: {
    products: productSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    product: cartSlice,
    // user: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
