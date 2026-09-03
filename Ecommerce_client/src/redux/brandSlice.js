import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const initialState = {

    brands: [],

    brand: null,

    loading: false,

    error: null

};

// ==========================================
// GET ALL BRANDS
// ==========================================

export const getBrands = createAsyncThunk(

    "brand/getBrands",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get("/brand");

            return response.data.brands;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||

                "Unable to fetch brands"

            );

        }

    }

);

// ==========================================
// GET BRAND BY ID
// ==========================================

export const getBrandById = createAsyncThunk(

    "brand/getBrandById",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                `/brand/${id}`

            );

            return response.data.brand;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||

                "Brand not found"

            );

        }

    }

);

// ==========================================
// GET BRANDS BY CATEGORY
// ==========================================

export const getBrandsByCategory = createAsyncThunk(

    "brand/getBrandsByCategory",

    async (categoryId, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                `/brand/category/${categoryId}`

            );

            return response.data.brands;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||

                "Unable to fetch brands"

            );

        }

    }

);

// ==========================================
// CREATE BRAND
// ==========================================

export const createBrand = createAsyncThunk(

    "brand/createBrand",

    async (formData, thunkAPI) => {

        try {

            const response = await axiosInstance.post(

                "/brand/create",

                formData,

                {

                    headers: {

                        "Content-Type":

                        "multipart/form-data"

                    }

                }

            );

            toast.success(response.data.msg);

            return response.data.brand;

        }

        catch (error) {

            const message =

                error.response?.data?.msg ||

                "Unable to create brand";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// UPDATE BRAND
// ==========================================

export const updateBrand = createAsyncThunk(

    "brand/updateBrand",

    async ({ id, formData }, thunkAPI) => {

        try {

            const response = await axiosInstance.put(

                `/brand/update/${id}`,

                formData,

                {

                    headers: {

                        "Content-Type":

                        "multipart/form-data"

                    }

                }

            );

            toast.success(response.data.msg);

            return response.data.brand;

        }

        catch (error) {

            const message =

                error.response?.data?.msg ||

                "Unable to update brand";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// DELETE BRAND
// ==========================================

export const deleteBrand = createAsyncThunk(

    "brand/deleteBrand",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.delete(

                `/brand/delete/${id}`

            );

            toast.success(response.data.msg);

            return id;

        }

        catch (error) {

            const message =

                error.response?.data?.msg ||

                "Unable to delete brand";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// CHANGE STATUS
// ==========================================

export const changeBrandStatus = createAsyncThunk(

    "brand/changeBrandStatus",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.patch(

                `/brand/status/${id}`

            );

            toast.success(response.data.msg);

            return response.data.brand;

        }

        catch (error) {

            const message =

                error.response?.data?.msg ||

                "Unable to change status";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

const brandSlice = createSlice({

    name: "brand",

    initialState,

    reducers: {

        clearBrand: (state) => {

            state.brand = null;

        },

        clearBrandError: (state) => {

            state.error = null;

        }

    },

    extraReducers: (builder) => {

        builder

        // ===========================
        // GET ALL
        // ===========================

        .addCase(getBrands.pending, (state) => {

            state.loading = true;

        })

        .addCase(getBrands.fulfilled, (state, action) => {

            state.loading = false;

            state.brands = action.payload;

        })

        .addCase(getBrands.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ===========================
        // GET BRAND BY ID
        // ===========================

        .addCase(getBrandById.pending, (state) => {

            state.loading = true;

        })

        .addCase(getBrandById.fulfilled, (state, action) => {

            state.loading = false;

            state.brand = action.payload;

        })

        .addCase(getBrandById.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ===========================
        // GET BRANDS BY CATEGORY
        // ===========================

        .addCase(getBrandsByCategory.pending, (state) => {

            state.loading = true;

        })

        .addCase(getBrandsByCategory.fulfilled, (state, action) => {

            state.loading = false;

            state.brands = action.payload;

        })

        .addCase(getBrandsByCategory.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ===========================
        // CREATE
        // ===========================

        .addCase(createBrand.pending, (state) => {

            state.loading = true;

        })

        .addCase(createBrand.fulfilled, (state, action) => {

            state.loading = false;

            state.brands.unshift(action.payload);

        })

        .addCase(createBrand.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ===========================
        // UPDATE
        // ===========================

        .addCase(updateBrand.pending, (state) => {

            state.loading = true;

        })

        .addCase(updateBrand.fulfilled, (state, action) => {

            state.loading = false;

            state.brand = action.payload;

            state.brands = state.brands.map((brand) =>

                brand._id === action.payload._id

                    ? action.payload

                    : brand

            );

        })

        .addCase(updateBrand.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ===========================
        // DELETE
        // ===========================

        .addCase(deleteBrand.pending, (state) => {

            state.loading = true;

        })

        .addCase(deleteBrand.fulfilled, (state, action) => {

            state.loading = false;

            state.brands = state.brands.filter(

                (brand) => brand._id !== action.payload

            );

        })

        .addCase(deleteBrand.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ===========================
        // STATUS
        // ===========================

        .addCase(changeBrandStatus.pending, (state) => {

            state.loading = true;

        })

        .addCase(changeBrandStatus.fulfilled, (state, action) => {

            state.loading = false;

            state.brands = state.brands.map((brand) =>

                brand._id === action.payload._id

                    ? action.payload

                    : brand

            );

        })

        .addCase(changeBrandStatus.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        });

    }

});

export const {

    clearBrand,

    clearBrandError

} = brandSlice.actions;

export default brandSlice.reducer;