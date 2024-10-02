import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, fetchOrder, fetchOrders } from "../../controller/order";
import { checkoutCart } from "../cartSlice/cartSlice";
import { Order } from "../../types";

const initialState = {
  orders: [
    {
      id: 0,
      total: 0,
      status: "",
      items: [],
      createdat: new Date().toISOString(),
      modifiedat: new Date().toISOString(),
    },
  ] as Order[],
};

export const loadOrder = createAsyncThunk(
  "order/loadOrder",
  async (orderId: number, thunkAPI) => {
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
export const createOrders = createAsyncThunk(
  "order/createOrders",
  async (paymentIntentId: string, thunkAPI) => {
    try {
      const response = await createOrder(paymentIntentId);
      return {
        order: response,
      };
    } catch (error) {
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrders.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.orders.push(order);
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.orders[order.id] = order;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        state.orders = orders;
      });
  },
});

export default orderSlice.reducer;
