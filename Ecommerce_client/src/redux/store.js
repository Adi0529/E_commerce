// src/app/store.js

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";
import categoryReducer from "./categorySlice";
import brandReducer from "./brandSlice";

export const store = configureStore({

    reducer: {

        auth: authReducer,

        product: productReducer,

        cart: cartReducer,

        order: orderReducer,
        category:categoryReducer,
        brand:brandReducer

    }

});