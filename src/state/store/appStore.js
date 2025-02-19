import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import productsReducer from "../slices/productSlice"
import userReducer from "../slices/useSlice"


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
  },
});