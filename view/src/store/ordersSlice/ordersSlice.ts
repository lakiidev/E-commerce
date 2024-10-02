import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, fetchOrder, fetchOrders } from "../../controller/order";
import { checkoutCart } from "../cartSlice/cartSlice";

const initialState = {
  orders: [
    {
      id: "",
      userid: "",
      total: 0,
      status: "",
      items: [],
    },
  ],
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
export const createOrders = createAsyncThunk(
  "order/createOrders",
  async (paymentIntentId: string, thunkAPI) => {
    try {
      const response = await createOrder(paymentIntentId);
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
      .addCase(createOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        state.orders.push(orders);
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        const { order } = action.payload;
        state.orders[order.id] = order;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        const { orders } = action.payload;
        console.log(orders);
      });
  },
});

export default orderSlice.reducer;
