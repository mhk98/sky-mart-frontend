import { productCartApi } from "../features/cart/cart";
import { productApi } from "../features/product/product";
import { ProductDetailsDetailsApi } from "../features/productDetails/productDetails";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [ProductDetailsDetailsApi.reducerPath]: ProductDetailsDetailsApi.reducer,
    [productCartApi.reducerPath]: productCartApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      ProductDetailsDetailsApi.middleware,
      productCartApi.middleware
    ),
});

export default store;
