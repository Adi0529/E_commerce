import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const initialState = {

    categories: [],

    category: null,

    loading: false,

    error: null

};

// ==========================================
// GET ALL CATEGORIES
// ==========================================

export const getCategories = createAsyncThunk(

    "category/getCategories",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get("/category");

            return response.data.categories;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||

                "Unable to fetch categories"

            );

        }

    }

);

// ==========================================
// GET CATEGORY BY ID
// ==========================================

export const getCategoryById = createAsyncThunk(

    "category/getCategoryById",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.get(

                `/category/${id}`

            );

            return response.data.category;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||

                "Category not found"

            );

        }

    }

);

// ==========================================
// CREATE CATEGORY
// ==========================================

export const createCategory = createAsyncThunk(

    "category/createCategory",

    async (formData, thunkAPI) => {

        try {

            const response = await axiosInstance.post(

                "/category/create",

                formData,

                {

                    headers: {

                        "Content-Type":

                        "multipart/form-data"

                    }

                }

            );

            toast.success(response.data.msg);

            return response.data.category;

        }

        catch (error) {

            const message =

                error.response?.data?.msg ||

                "Unable to create category";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// UPDATE CATEGORY
// ==========================================

export const updateCategory = createAsyncThunk(

    "category/updateCategory",

    async ({ id, formData }, thunkAPI) => {

        try {

            const response = await axiosInstance.put(

                `/category/update/${id}`,

                formData,

                {

                    headers: {

                        "Content-Type":

                        "multipart/form-data"

                    }

                }

            );

            toast.success(response.data.msg);

            return response.data.category;

        }

        catch (error) {

            const message =

                error.response?.data?.msg ||

                "Unable to update category";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// DELETE CATEGORY
// ==========================================

export const deleteCategory = createAsyncThunk(

    "category/deleteCategory",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.delete(

                `/category/delete/${id}`

            );

            toast.success(response.data.msg);

            return id;

        }

        catch (error) {

            const message =

                error.response?.data?.msg ||

                "Unable to delete category";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// ==========================================
// CHANGE STATUS
// ==========================================

export const changeCategoryStatus = createAsyncThunk(

    "category/changeCategoryStatus",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.patch(

                `/category/status/${id}`

            );

            toast.success(response.data.msg);

            return response.data.category;

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

const categorySlice = createSlice({

    name: "category",

    initialState,

    reducers: {

        clearCategory: (state) => {

            state.category = null;

        },

        clearCategoryError: (state) => {

            state.error = null;

        }

    },

    extraReducers: (builder) => {

        builder

        // ============================
        // GET ALL
        // ============================

        .addCase(getCategories.pending, (state) => {

            state.loading = true;

        })

        .addCase(getCategories.fulfilled, (state, action) => {

            state.loading = false;

            state.categories = action.payload;

        })

        .addCase(getCategories.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ============================
        // GET BY ID
        // ============================

        .addCase(getCategoryById.pending, (state) => {

            state.loading = true;

        })

        .addCase(getCategoryById.fulfilled, (state, action) => {

            state.loading = false;

            state.category = action.payload;

        })

        .addCase(getCategoryById.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ============================
        // CREATE
        // ============================

        .addCase(createCategory.pending, (state) => {

            state.loading = true;

        })

        .addCase(createCategory.fulfilled, (state, action) => {

            state.loading = false;

            state.categories.unshift(action.payload);

        })

        .addCase(createCategory.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ============================
        // UPDATE
        // ============================

        .addCase(updateCategory.pending, (state) => {

            state.loading = true;

        })

        .addCase(updateCategory.fulfilled, (state, action) => {

            state.loading = false;

            state.categories = state.categories.map((item) =>

                item._id === action.payload._id

                    ? action.payload

                    : item

            );

            state.category = action.payload;

        })

        .addCase(updateCategory.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ============================
        // DELETE
        // ============================

        .addCase(deleteCategory.pending, (state) => {

            state.loading = true;

        })

        .addCase(deleteCategory.fulfilled, (state, action) => {

            state.loading = false;

            state.categories = state.categories.filter(

                (item) => item._id !== action.payload

            );

        })

        .addCase(deleteCategory.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        // ============================
        // STATUS
        // ============================

        .addCase(changeCategoryStatus.pending, (state) => {

            state.loading = true;

        })

        .addCase(changeCategoryStatus.fulfilled, (state, action) => {

            state.loading = false;

            state.categories = state.categories.map((item) =>

                item._id === action.payload._id

                    ? action.payload

                    : item

            );

        })

        .addCase(changeCategoryStatus.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        });

    }

});

export const {

    clearCategory,

    clearCategoryError

} = categorySlice.actions;

export default categorySlice.reducer;