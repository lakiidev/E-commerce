import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  checkout,
  fetchCart,
  removeFromCart,
  updateCart,
} from "../../controller/cart";
import { checkLoginStatus } from "../userSlice/userSlice";
import { CartItem, Product } from "../../types";

const initialState = {
  cart: {},
  items: [] as CartItem[],
  isLoadingCart: false,
  error: undefined,
};

export const addItem = createAsyncThunk(
  "cart/addItem",
  async (
    {
      product,
      qty,
    }: {
      product: Product;
      qty: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await addToCart(product, qty);
      const item = {
        ...product,
        cartItemId: response.id,
        quantity: qty,
      };
      return { item };
    } catch (error) {
      throw error;
    }
  }
);
export const updateItem = createAsyncThunk(
  "cart/updateItem",
  async ({ product, qty }: { product: CartItem; qty: number }, thunkAPI) => {
    try {
      const response = await updateCart(product.cartitemid, qty);
      return {
        ...product,
        cartItemId: response.id,
        quantity: qty,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (cartItemId: number, thunkAPI) => {
    try {
      await removeFromCart(cartItemId);
      return {
        item: cartItemId,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const checkoutCart = createAsyncThunk(
  "cart/checkoutCart",
  async (
    {
      cartId,
      paymentInfo,
    }: {
      cartId: string;
      paymentInfo: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await checkout(cartId, paymentInfo);
      return {
        order: response,
      };
    } catch (err) {
      throw err;
    }
  }
);

export const loadCart = createAsyncThunk(
  "cart/loadCart",
  async (params, thunkAPI) => {
    try {
      const response = await fetchCart();
      return {
        cart: response,
      };
    } catch (err) {
      throw err;
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items.push(item as unknown as CartItem);
        state.isLoadingCart = false;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const { cartItemId, quantity } = action.payload;
        const itemIndex = state.items.findIndex(
          (item) => item.cartitemid === cartItemId
        );
        if (itemIndex !== -1) {
          state.items[itemIndex].quantity = quantity;
        }
      })
      .addCase(checkLoginStatus.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
        state.isLoadingCart = false;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        const { cart } = action.payload;
        Object.assign(state, cart);
        state.isLoadingCart = false;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.items = state.items.filter(
          (product) => product.cartitemid !== item
        );
        state.isLoadingCart = false;
      })
      .addCase(addItem.pending, (state) => {
        state.isLoadingCart = true;
      })
      .addCase(loadCart.pending, (state) => {
        state.isLoadingCart = true;
      });
  },
});

export default cartSlice.reducer;
