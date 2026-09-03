import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const initialState = {

    orders: [],

    vendorOrders: [],

    order: null,

    loading: false,

    error: null

};

// ===========================================
// PLACE ORDER
// ===========================================

export const placeOrder = createAsyncThunk(

    "order/placeOrder",

    async (data, thunkAPI) => {

        try {

            const response = await axiosInstance.post(

                "/order/placeOrder",

                data

            );

            toast.success(response.data.msg);

            return response.data.order;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Order Failed";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ===========================================
// GET MY ORDERS
// ===========================================

export const getMyOrders = createAsyncThunk(

    "order/getMyOrders",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                "/order/getMyOrders"

            );

            return response.data.orders;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to fetch orders"

            );

        }

    }

);

// ===========================================
// GET ORDER BY ID
// ===========================================

export const getOrderById = createAsyncThunk(

    "order/getOrderById",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                `/order/getOrder/${id}`

            );

            return response.data.order;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to fetch order"

            );

        }

    }

);

// ===========================================
// CANCEL ORDER
// ===========================================

export const cancelOrder = createAsyncThunk(

    "order/cancelOrder",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.patch(

                `/order/cancelOrder/${id}`

            );

            toast.success(response.data.msg);

            return response.data.order;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Unable to cancel order";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ===========================================
// VENDOR ORDERS
// ===========================================

export const getVendorOrders = createAsyncThunk(

    "order/getVendorOrders",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                "/order/vendorOrders"

            );

            return response.data.orders;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to fetch vendor orders"

            );

        }

    }

);

// ===========================================
// VENDOR UPDATE STATUS
// ===========================================

export const updateOrderStatus = createAsyncThunk(

    "order/updateOrderStatus",

    async ({ id, status }, thunkAPI) => {

        try {

            const response = await axiosInstance.patch(

                `/order/updateOrderStatus/${id}`,

                { status }

            );

            toast.success(response.data.msg);

            return response.data.order;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Unable to update status";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ===========================================
// ADMIN GET ALL ORDERS
// ===========================================

export const getAllOrders = createAsyncThunk(

    "order/getAllOrders",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                "/order/getAllOrders"

            );

            return response.data.orders;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to fetch orders"

            );

        }

    }

);

// ===========================================
// ADMIN GET ORDER
// ===========================================

export const adminGetOrder = createAsyncThunk(

    "order/adminGetOrder",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                `/order/getOrderDetails/${id}`

            );

            return response.data.order;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Unable to fetch order"

            );

        }

    }

);

// ===========================================
// ADMIN UPDATE STATUS
// ===========================================

export const adminUpdateStatus = createAsyncThunk(

    "order/adminUpdateStatus",

    async ({ id, status }, thunkAPI) => {

        try {

            const response = await axiosInstance.patch(

                `/order/adminUpdateStatus/${id}`,

                { status }

            );

            toast.success(response.data.msg);

            return response.data.order;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Unable to update order";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ===========================================
// DELETE ORDER
// ===========================================

export const deleteOrder = createAsyncThunk(

    "order/deleteOrder",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.delete(

                `/order/deleteOrder/${id}`

            );

            toast.success(response.data.msg);

            return id;

        }

        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Unable to delete order";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);
const orderSlice = createSlice({

    name: "order",

    initialState,

    reducers: {

        clearOrderError: (state) => {

            state.error = null;

        },

        clearOrder: (state) => {

            state.order = null;

        }

    },

    extraReducers: (builder) => {

        builder

        // ==========================================
        // PLACE ORDER
        // ==========================================

        .addCase(placeOrder.pending, (state) => {

            state.loading = true;

        })

        .addCase(placeOrder.fulfilled, (state, action) => {

            state.loading = false;

            state.orders.unshift(action.payload);

        })

        .addCase(placeOrder.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // GET MY ORDERS
        // ==========================================

        .addCase(getMyOrders.pending, (state) => {

            state.loading = true;

        })

        .addCase(getMyOrders.fulfilled, (state, action) => {

            state.loading = false;

            state.orders = action.payload;

        })

        .addCase(getMyOrders.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // GET ORDER BY ID
        // ==========================================

        .addCase(getOrderById.pending, (state) => {

            state.loading = true;

        })

        .addCase(getOrderById.fulfilled, (state, action) => {

            state.loading = false;

            state.order = action.payload;

        })

        .addCase(getOrderById.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // CANCEL ORDER
        // ==========================================

        .addCase(cancelOrder.pending, (state) => {

            state.loading = true;

        })

        .addCase(cancelOrder.fulfilled, (state, action) => {

            state.loading = false;

            state.order = action.payload;

            state.orders = state.orders.map((item) =>

                item._id === action.payload._id

                    ? action.payload

                    : item

            );

        })

        .addCase(cancelOrder.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // VENDOR ORDERS
        // ==========================================

        .addCase(getVendorOrders.pending, (state) => {

            state.loading = true;

        })

        .addCase(getVendorOrders.fulfilled, (state, action) => {

            state.loading = false;

            state.vendorOrders = action.payload;

        })

        .addCase(getVendorOrders.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // VENDOR UPDATE STATUS
        // ==========================================

        .addCase(updateOrderStatus.pending, (state) => {

            state.loading = true;

        })

        .addCase(updateOrderStatus.fulfilled, (state, action) => {

            state.loading = false;

            state.vendorOrders = state.vendorOrders.map((item) =>

                item._id === action.payload._id

                    ? action.payload

                    : item

            );

        })

        .addCase(updateOrderStatus.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // ADMIN GET ALL ORDERS
        // ==========================================

        .addCase(getAllOrders.pending, (state) => {

            state.loading = true;

        })

        .addCase(getAllOrders.fulfilled, (state, action) => {

            state.loading = false;

            state.orders = action.payload;

        })

        .addCase(getAllOrders.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // ADMIN GET ORDER
        // ==========================================

        .addCase(adminGetOrder.pending, (state) => {

            state.loading = true;

        })

        .addCase(adminGetOrder.fulfilled, (state, action) => {

            state.loading = false;

            state.order = action.payload;

        })

        .addCase(adminGetOrder.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // ADMIN UPDATE STATUS
        // ==========================================

        .addCase(adminUpdateStatus.pending, (state) => {

            state.loading = true;

        })

        .addCase(adminUpdateStatus.fulfilled, (state, action) => {

            state.loading = false;

            state.orders = state.orders.map((item) =>

                item._id === action.payload._id

                    ? action.payload

                    : item

            );

        })

        .addCase(adminUpdateStatus.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })



        // ==========================================
        // DELETE ORDER
        // ==========================================

        .addCase(deleteOrder.pending, (state) => {

            state.loading = true;

        })

        .addCase(deleteOrder.fulfilled, (state, action) => {

            state.loading = false;

            state.orders = state.orders.filter(

                (item) => item._id !== action.payload

            );

        })

        .addCase(deleteOrder.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        });

    }

});

export const {

    clearOrderError,

    clearOrder

} = orderSlice.actions;

export default orderSlice.reducer;