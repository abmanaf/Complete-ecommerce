import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  count: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.count < product.availableProduct) {
          existingItem.count += 1;
          state.count += 1;
        }
      } else {
        state.items.push({ ...product, count: 1 });
        state.count += 1;
      }
    },
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item.id === productId);

      if (product && product.count < product.availableProduct) {
        product.count += 1;
        state.count += 1;
      }
    },
    reduceQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item.id === productId);

      if (product && product.count > 1) {
        product.count -= 1;
        state.count -= 1;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        state.count -= existingItem.count;
        state.items = state.items.filter((item) => item.id !== productId);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    clearCartCount: (state) => {
      state.count = 0;
    },

    updateCartItemCount: (state, action) => {
      const { productId, count } = action.payload;
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem) {
        if (count >= 1 && count <= existingItem.availableProduct) {
          state.count += count - existingItem.count;
          existingItem.count = count;
        }
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemCount,
  increaseQuantity,
  reduceQuantity,
  clearCart,
  clearCartCount,
} = cartSlice.actions;
export default cartSlice.reducer;
