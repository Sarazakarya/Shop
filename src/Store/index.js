import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./Slices/loginSlice";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import cartSlice from "./Slices/cartSlice";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import { productsApi } from "./Serv/ApiSlice";

const persistConfig = {
    key: "root",
    storage,
};

const reducers = {
    login: loginSlice,
    cart: cartSlice,
    [productsApi.reducerPath]: productsApi.reducer
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }).concat(productsApi.middleware)
});

export const persistor = persistStore(store);
