import { createSlice } from "@reduxjs/toolkit";
import { initialProducts } from "../../Data/Database";

const initialState = {
  products: initialProducts,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductCount: (state, action) => {
      const { productId, count } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.count = count;
      }
    },
  },
});

export const { updateProductCount } = productsSlice.actions;
export default productsSlice.reducer;