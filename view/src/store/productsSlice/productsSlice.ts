import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProduct, fetchProducts } from "../../controller/product";
import { string } from "zod";

export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async (productId: string, thunkAPI) => {
    try {
      const response = await fetchProduct(productId);
      return {
        product: response,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const loadProducts = createAsyncThunk(
  "products/loadProducts",
  async (params, thunkAPI) => {
    try {
      const response = await fetchProducts();
      return {
        products: response,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (productId: string, thunkAPI) => {
    try {
      const response = await fetchProduct(productId);
      return {
        products: response,
      };
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProduct.fulfilled, (state: any, action) => {
        const { product } = action.payload;
        state[product.id] = product;
      })
      .addCase(loadProducts.fulfilled, (state: any, action) => {
        const { products } = action.payload;
        products.forEach((product: any) => {
          const { id } = product;
          state[id] = product;
        });
      });
  },
});

export default productSlice.reducer;
