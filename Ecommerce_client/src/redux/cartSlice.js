import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const initialState = {

    cart: [],

    cartItem: null,

    cartCount: 0,

    cartTotal: 0,

    loading: false,

    error: null

};

// ==========================================
// ADD TO CART
// ==========================================

export const addToCart = createAsyncThunk(

    "cart/addToCart",

    async (data, thunkAPI) => {

        try {

            const response = await axiosInstance.post(

                "/cart/addToCart",

                data

            );

            toast.success(response.data.msg);

            return response.data.cart;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Unable to add product";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// GET MY CART
// ==========================================

export const getMyCart = createAsyncThunk(

    "cart/getMyCart",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                "/cart/getMyCart"

            );

            return response.data.cart;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to fetch cart"

            );

        }

    }

);

// ==========================================
// UPDATE QUANTITY
// ==========================================

export const updateQuantity = createAsyncThunk(

    "cart/updateQuantity",

    async ({ id, quantity }, thunkAPI) => {

        try {

            const response = await axiosInstance.patch(

                `/cart/updateQuantity/${id}`,

                { quantity }

            );

            toast.success(response.data.msg);

            return response.data.cart;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Unable to update quantity";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// REMOVE ITEM
// ==========================================

export const removeFromCart = createAsyncThunk(

    "cart/removeFromCart",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.delete(

                `/cart/removeFromCart/${id}`

            );

            toast.success(response.data.msg);

            return id;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Unable to remove product";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// CLEAR CART
// ==========================================

export const clearCart = createAsyncThunk(

    "cart/clearCart",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.delete(

                "/cart/clearCart"

            );

            toast.success(response.data.msg);

            return true;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to clear cart"

            );

        }

    }

);

// ==========================================
// CART COUNT
// ==========================================

export const getCartCount = createAsyncThunk(

    "cart/getCartCount",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                "/cart/getCartCount"

            );

            return response.data.count;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to fetch cart count"

            );

        }

    }

);

// ==========================================
// CART TOTAL
// ==========================================

export const getCartTotal = createAsyncThunk(

    "cart/getCartTotal",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                "/cart/getCartTotal"

            );

            return response.data.total;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to fetch total"

            );

        }

    }

);

// ==========================================
// CHECK PRODUCT
// ==========================================

export const isProductInCart = createAsyncThunk(

    "cart/isProductInCart",

    async (productId, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                `/cart/isInCart/${productId}`

            );

            return response.data.exists;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg

            );

        }

    }

);

// ==========================================
// GET SINGLE CART ITEM
// ==========================================

export const getCartItem = createAsyncThunk(

    "cart/getCartItem",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                `/cart/item/${id}`

            );

            return response.data.cart;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg

            );

        }

    }

);

// ==========================================
// CHECKOUT
// ==========================================

export const checkoutCart = createAsyncThunk(

    "cart/checkoutCart",

    async (data, thunkAPI) => {

        try {

            const response = await axiosInstance.post(

                "/cart/checkout",

                data

            );

            toast.success(response.data.msg);

            return response.data;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Checkout failed";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);
const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        clearCartError: (state) => {

            state.error = null;

        },

        clearCartItem: (state) => {

            state.cartItem = null;

        }

    },

    extraReducers: (builder) => {

        builder

        // =====================================
        // ADD TO CART
        // =====================================

        .addCase(addToCart.pending, (state) => {

            state.loading = true;

        })

        .addCase(addToCart.fulfilled, (state, action) => {

            state.loading = false;

            state.cart.push(action.payload);

        })

        .addCase(addToCart.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // GET MY CART
        // =====================================

        .addCase(getMyCart.pending, (state) => {

            state.loading = true;

        })

        .addCase(getMyCart.fulfilled, (state, action) => {

            state.loading = false;

            state.cart = action.payload;

        })

        .addCase(getMyCart.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // UPDATE QUANTITY
        // =====================================

        .addCase(updateQuantity.pending, (state) => {

            state.loading = true;

        })

        .addCase(updateQuantity.fulfilled, (state, action) => {

            state.loading = false;

            state.cart = state.cart.map((item) =>

                item._id === action.payload._id

                    ? action.payload

                    : item

            );

        })

        .addCase(updateQuantity.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // REMOVE ITEM
        // =====================================

        .addCase(removeFromCart.pending, (state) => {

            state.loading = true;

        })

        .addCase(removeFromCart.fulfilled, (state, action) => {

            state.loading = false;

            state.cart = state.cart.filter(

                (item) => item._id !== action.payload

            );

        })

        .addCase(removeFromCart.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // CLEAR CART
        // =====================================

        .addCase(clearCart.pending, (state) => {

            state.loading = true;

        })

        .addCase(clearCart.fulfilled, (state) => {

            state.loading = false;

            state.cart = [];

            state.cartCount = 0;

            state.cartTotal = 0;

        })

        .addCase(clearCart.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // CART COUNT
        // =====================================

        .addCase(getCartCount.pending, (state) => {

            state.loading = true;

        })

        .addCase(getCartCount.fulfilled, (state, action) => {

            state.loading = false;

            state.cartCount = action.payload;

        })

        .addCase(getCartCount.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // CART TOTAL
        // =====================================

        .addCase(getCartTotal.pending, (state) => {

            state.loading = true;

        })

        .addCase(getCartTotal.fulfilled, (state, action) => {

            state.loading = false;

            state.cartTotal = action.payload;

        })

        .addCase(getCartTotal.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // GET CART ITEM
        // =====================================

        .addCase(getCartItem.pending, (state) => {

            state.loading = true;

        })

        .addCase(getCartItem.fulfilled, (state, action) => {

            state.loading = false;

            state.cartItem = action.payload;

        })

        .addCase(getCartItem.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // CHECK PRODUCT IN CART
        // =====================================

        .addCase(isProductInCart.pending, (state) => {

            state.loading = true;

        })

        .addCase(isProductInCart.fulfilled, (state) => {

            state.loading = false;

        })

        .addCase(isProductInCart.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // =====================================
        // CHECKOUT
        // =====================================

        .addCase(checkoutCart.pending, (state) => {

            state.loading = true;

        })

        .addCase(checkoutCart.fulfilled, (state) => {

            state.loading = false;

            state.cart = [];

            state.cartCount = 0;

            state.cartTotal = 0;

        })

        .addCase(checkoutCart.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        });

    }

});

export const {

    clearCartError,

    clearCartItem

} = cartSlice.actions;

export default cartSlice.reducer;