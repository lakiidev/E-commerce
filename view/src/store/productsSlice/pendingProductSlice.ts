import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../types";

interface PendingPurchaseState {
  cartItem: CartItem | null;
}

const initialState: PendingPurchaseState = {
  cartItem: null,
};

const pendingProductSlice = createSlice({
  name: "pendingProduct",
  initialState,
  reducers: {
    setPendingProduct(state, action: PayloadAction<CartItem>) {
      state.cartItem = action.payload;
    },
    clearPendingPurchase: (state) => {
      state.cartItem = null;
    },
  },
});

export const { setPendingProduct, clearPendingPurchase } =
  pendingProductSlice.actions;
export default pendingProductSlice.reducer;
