import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

const initialState = {

    token: localStorage.getItem("token") || null,

    user: JSON.parse(localStorage.getItem("user")) || null,

    users: [],

    vendors: [],

    selectedUser: null,

    isAuthenticated: !!localStorage.getItem("token"),

    loading: false,

    error: null,

    success: null

};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/register",formData,{ headers: { "Content-Type": "multipart/form-data" } });
            toast.success(response.data.msg);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || "Registration Failed";
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (data, thunkAPI) => {
        try {
            const response = await axiosInstance.post("/user/login", data);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            toast.success(response.data.msg);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.msg || "Login Failed";
            toast.error(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// 1. COMPLETED LOGOUT THUNK
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkAPI) => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.success("Logged out successfully");
            return null;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue("Logout failed");
        }
    }
);

export const updateProfile = createAsyncThunk(

    "auth/updateProfile",

    async (formData, thunkAPI) => {

        try {

            const response = await axiosInstance.put(

                "/user/update-profile",

                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            localStorage.setItem(

                "user",

                JSON.stringify(response.data.user)

            );

            toast.success(response.data.msg);

            return response.data.user;

        }
        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Profile Update Failed";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

export const changePassword = createAsyncThunk(

    "auth/changePassword",

    async (data, thunkAPI) => {

        try {

            const response = await axiosInstance.put(

                "/user/change-password",

                data

            );

            toast.success(response.data.msg);

            return response.data.msg;

        }
        catch (error) {

            const message =
                error.response?.data?.msg ||
                "Password Change Failed";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

export const createVendor = createAsyncThunk(

    "auth/createVendor",

    async (formData, thunkAPI) => {

        try {

            const response = await axiosInstance.post(

                "/user/create-vendor",

                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            toast.success(response.data.msg);

            return response.data;

        }
        catch (error) {

            const message =
                error.response?.data?.msg || "Unable to create vendor";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);
export const getAllUsers = createAsyncThunk(
    "auth/getAllUsers",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get("/user/users");

            return response?.data?.users;

        }
        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg || "Unable to fetch users"

            );

        }

    }

);
export const getAllVendors = createAsyncThunk("auth/getAllVendors",

    async (_, thunkAPI) => {

        try {

            const response = await axiosInstance.get("/user/vendors");

            return response.data.vendors;

        }
        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg || "Unable to fetch vendors"

            );

        }

    }

);
export const getUserById = createAsyncThunk(

    "auth/getUserById",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.get(`/user/${id}`);

            return response.data.user;

        }
        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg || "Unable to fetch user"

            );

        }

    }

);
export const updateUser = createAsyncThunk("auth/updateUser",

    async ({ id, formData }, thunkAPI) => {

        try {

            const response = await axiosInstance.put(

                `/user/${id}`,

                formData,

                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }

            );

            toast.success(response.data.msg);

            return response.data.user;

        }
        catch (error) {

            const message =
                error.response?.data?.msg || "Unable to update user";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);
export const deleteUser = createAsyncThunk("auth/deleteUser",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.delete(

                `/user/${id}`

            );

            toast.success(response.data.msg);

            return id;

        }
        catch (error) {

            const message =
                error.response?.data?.msg || "Unable to delete user";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);
export const toggleStatus = createAsyncThunk("auth/toggleStatus",

    async (id, thunkAPI) => {

        try {

            const response = await axiosInstance.patch(

                `/user/toggle-status/${id}`

            );

            toast.success(response.data.msg);

            return response.data.user;

        }
        catch (error) {

            const message =
                error.response?.data?.msg || "Unable to change status";

            toast.error(message);

            return thunkAPI.rejectWithValue(message);

        }

    }

);

// 2. ADDED MISSING SLICE TO HANDLE THE THUNK STATES
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Register Actions
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login Actions
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Logout Action
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
                state.error = null;
            })

            .addCase(updateProfile.pending, (state) => {

                state.loading = true;

            })

            .addCase(updateProfile.fulfilled, (state, action) => {

                state.loading = false;

                state.user = action.payload;

            })

            .addCase(updateProfile.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            .addCase(changePassword.pending, (state) => {

                state.loading = true;

            })

            .addCase(changePassword.fulfilled, (state) => {

                state.loading = false;

            })

            .addCase(changePassword.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            .addCase(createVendor.pending, (state) => {

                state.loading = true;

            })

            .addCase(createVendor.fulfilled, (state) => {

                state.loading = false;

            })

            .addCase(createVendor.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            .addCase(getAllUsers.pending, (state) => {

                state.loading = true;

            })

            .addCase(getAllUsers.fulfilled, (state, action) => {

                state.loading = false;

                state.users = action.payload;

            })

            .addCase(getAllUsers.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            .addCase(getAllVendors.pending, (state) => {

                state.loading = true;

            })

            .addCase(getAllVendors.fulfilled, (state, action) => {

                state.loading = false;

                state.vendors = action.payload;

            })

            .addCase(getAllVendors.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            .addCase(getUserById.pending, (state) => {

                state.loading = true;

            })

            .addCase(getUserById.fulfilled, (state, action) => {

                state.loading = false;

                state.selectedUser = action.payload;

            })

            .addCase(getUserById.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            .addCase(updateUser.pending, (state) => {

                state.loading = true;

            })

            .addCase(updateUser.fulfilled, (state, action) => {

                state.loading = false;

                state.selectedUser = action.payload;

                state.users = state.users.map((user) =>
                    user._id === action.payload._id ? action.payload : user
                );

                state.vendors = state.vendors.map((vendor) =>
                    vendor._id === action.payload._id ? action.payload : vendor
                );

            })

            .addCase(updateUser.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            .addCase(deleteUser.pending, (state) => {

                state.loading = true;

            })

            .addCase(deleteUser.fulfilled, (state, action) => {

                state.loading = false;

                state.users = state.users.filter(

                    (user) => user._id !== action.payload

                );

                state.vendors = state.vendors.filter(

                    (vendor) => vendor._id !== action.payload

                );

            })

            .addCase(deleteUser.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })
            .addCase(toggleStatus.pending, (state) => {

                state.loading = true;

            })

            .addCase(toggleStatus.fulfilled, (state, action) => {

                state.loading = false;

                state.selectedUser = action.payload;

                state.users = state.users.map((user) =>
                    user._id === action.payload._id ? action.payload : user
                );

                state.vendors = state.vendors.map((vendor) =>
                    vendor._id === action.payload._id ? action.payload : vendor
                );

            })

            .addCase(toggleStatus.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });
    }
});

export default authSlice.reducer;
