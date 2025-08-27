import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../api/apiSlice";
import authReducer from "../features/auth/authSlice";
import favoriteReducer from "../features/favorites/favoriteSlice";
import cartSliceReducer from "./cart/cartSlice";
import shopReducer from "./shop/shopSlice";
import { getFavoritesFromLocalStorage } from "../../Utils/localStorage";
const initailFavorites = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
    cart: cartSliceReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initailFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
