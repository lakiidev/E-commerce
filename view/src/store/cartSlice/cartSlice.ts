import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  checkout,
  fetchCart,
  removeFromCart,
} from "../../controller/cart";
import { checkLoginStatus } from "../userSlice/userSlice";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  cartItemId: any;
  qty: number;
};

const initialState = {
  cart: {
    items: [] as CartItem[],
    total: 0,
  },
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
      product: {
        id: number;
        name: string;
        price: number;
        image_url: string;
      };
      qty: number;
    },
    thunkAPI
  ) => {
    try {
      const response = await addToCart(product.id, qty);
      const item = {
        ...product,
        cartItemId: response.id,
        qty,
      };
      return { item };
    } catch (error) {
      throw error;
    }
  }
);

// export const checkoutCart = createAsyncThunk(
//   "cart/checkoutCart",
//   async ({ total: number }, thunkAPI) => {
//     try {
//       const response = await checkout(total);
//       return {
//         order: response,
//       };
//     } catch (err) {
//       throw err;
//     }
//   }
// );

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

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (cartItemId: string, thunkAPI) => {
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItem.fulfilled, (state, action) => {
        const { item } = action.payload;
        state.cart.items.push(item as CartItem);
        state.isLoadingCart = false;
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
        state.cart.items = state.cart.items.filter(
          (product) => product.cartItemId !== item
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
