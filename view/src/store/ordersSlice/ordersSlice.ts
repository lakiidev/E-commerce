import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOrder, fetchOrders } from "../../controller/order";
import { checkoutCart } from "../cartSlice/cartSlice";

const initialState = {
  orders: [],
  order: {
    id: "",
    items: [],
    total: 0,
  },
  isLoadingOrder: false,
  isLoadingOrders: false,
  error: undefined,
};

export const loadOrder = createAsyncThunk(
  "order/loadOrder",
  async (orderId: string, thunkAPI) => {
    try {
      const response = await fetchOrder(orderId);
      return {
        order: response,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const loadOrders = createAsyncThunk(
  "order/loadOrders",
  async (param, thunkAPI) => {
    try {
      const response = await fetchOrders();
      return {
        orders: response,
      };
    } catch (error) {
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.order = order;
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.order = order;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        state.orders = orders;
      });
  },
});

export default orderSlice.reducer;
