import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import cartReducer from "./cartSlice/cartSlice";
import productReducer from "./productsSlice/productsSlice";
import pendingProductReducer from "./productsSlice/pendingProductSlice";
import orderReducer from "./ordersSlice/ordersSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
    ordrer: orderReducer,
    pendingProduct: pendingProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
