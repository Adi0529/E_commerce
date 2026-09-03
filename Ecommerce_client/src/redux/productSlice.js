import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "../api/axiosInstance";

import { toast } from "react-toastify";


// ===============================
// GET ALL PRODUCTS
// ===============================

export const getAllProducts = createAsyncThunk(

    "product/getAllProducts",

    async (_, thunkAPI)=>{

        try{

            const response = await axiosInstance.get(
                "/product"
            );

            return response.data.products;

        }
        catch(error){

            return thunkAPI.rejectWithValue(
                error.response?.data?.msg ||
                "Failed to fetch products"
            );

        }

    }

);



// ===============================
// GET SINGLE PRODUCT
// ===============================

export const getProductById = createAsyncThunk(

    "product/getProductById",

    async(id, thunkAPI)=>{


        try{


            const response = await axiosInstance.get(

                `/product/${id}`

            );


            return response.data.product;


        }
        catch(error){

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Product not found"

            );

        }


    }

);



// ===============================
// CREATE PRODUCT (Vendor)
// ===============================

export const createProduct = createAsyncThunk(

    "product/createProduct",

    async(formData, thunkAPI)=>{


        try{


            const response = await axiosInstance.post(

                "/product/create",

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );


            toast.success(response.data.msg);


            return response.data.product;


        }
        catch(error){


            const message =
            error.response?.data?.msg ||
            "Product creation failed";


            toast.error(message);


            return thunkAPI.rejectWithValue(message);


        }


    }

);
// ===============================
// GET VENDOR PRODUCTS
// ===============================

export const getVendorProducts = createAsyncThunk(

    "product/getVendorProducts",

    async (_, thunkAPI)=>{

        try{

            const response = await axiosInstance.get(
                "/product/vendor/my-products"
            );


            return response.data.products;

        }
        catch(error){

            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Failed to fetch vendor products"

            );

        }

    }

);
// ===============================
// UPDATE PRODUCT
// ===============================

export const updateProduct = createAsyncThunk(

    "product/updateProduct",

    async({id, formData}, thunkAPI)=>{


        try{


            const response = await axiosInstance.put(

                `/product/update/${id}`,

                formData,

                {

                    headers:{

                        "Content-Type":
                        "multipart/form-data"

                    }

                }

            );


            toast.success(response.data.msg);


            return response.data.product;


        }
        catch(error){


            const message =
            error.response?.data?.msg ||
            "Product update failed";


            toast.error(message);


            return thunkAPI.rejectWithValue(message);


        }


    }

);
// ===============================
// DELETE PRODUCT
// ===============================

export const deleteProduct = createAsyncThunk(

    "product/deleteProduct",

    async(id, thunkAPI)=>{


        try{


            const response = await axiosInstance.delete(

                `/product/delete/${id}`

            );


            toast.success(response.data.msg);


            return id;


        }
        catch(error){


            const message =
            error.response?.data?.msg ||
            "Delete failed";


            toast.error(message);


            return thunkAPI.rejectWithValue(message);


        }


    }

);
// ===============================
// ADMIN GET ALL PRODUCTS
// ===============================


export const adminGetAllProducts = createAsyncThunk(

    "product/adminGetAllProducts",

    async(_, thunkAPI)=>{


        try{


            const response = await axiosInstance.get(

                "/product/admin/all"

            );


            return response.data.products;


        }
        catch(error){


            return thunkAPI.rejectWithValue(

                error.response?.data?.msg ||
                "Failed to fetch products"

            );


        }


    }

);
// ===============================
// CHANGE PRODUCT STATUS
// ===============================


export const changeProductStatus = createAsyncThunk(

    "product/changeProductStatus",

    async(id, thunkAPI)=>{


        try{


            const response = await axiosInstance.patch(

                `/product/status/${id}`

            );


            toast.success(response.data.msg);


            return response.data.product;


        }
        catch(error){


            const message =
            error.response?.data?.msg ||
            "Status update failed";


            toast.error(message);


            return thunkAPI.rejectWithValue(message);


        }


    }

);
// ===============================
// ADMIN DELETE PRODUCT
// ===============================


export const adminDeleteProduct = createAsyncThunk(

    "product/adminDeleteProduct",

    async(id, thunkAPI)=>{


        try{


            const response = await axiosInstance.delete(

                `/product/admin/delete/${id}`

            );


            toast.success(response.data.msg);


            return id;


        }
        catch(error){


            const message =
            error.response?.data?.msg ||
            "Delete failed";


            toast.error(message);


            return thunkAPI.rejectWithValue(message);


        }


    }

);
const initialState = {

    products: [],

    myProducts: [],

    product: null,

    loading: false,

    error: null,

    success: null

};
const productSlice = createSlice({

    name: "product",

    initialState,


    reducers: {


        clearProductError: (state)=>{

            state.error = null;

        },


        clearProduct: (state)=>{

            state.product = null;

        }

    },


    extraReducers: (builder)=>{


        // ===============================
        // GET ALL PRODUCTS
        // ===============================


        builder

        .addCase(getAllProducts.pending,(state)=>{

            state.loading=true;

        })


        .addCase(getAllProducts.fulfilled,(state,action)=>{

            state.loading=false;

            state.products=action.payload;

        })


        .addCase(getAllProducts.rejected,(state,action)=>{

            state.loading=false;

            state.error=action.payload;

        });





        // ===============================
        // GET SINGLE PRODUCT
        // ===============================


        builder

        .addCase(getProductById.pending,(state)=>{

            state.loading=true;

        })


        .addCase(getProductById.fulfilled,(state,action)=>{

            state.loading=false;

            state.product=action.payload;

        })


        .addCase(getProductById.rejected,(state,action)=>{

            state.loading=false;

            state.error=action.payload;

        });





        // ===============================
        // CREATE PRODUCT
        // ===============================


        builder

        .addCase(createProduct.pending,(state)=>{

            state.loading=true;

        })


        .addCase(createProduct.fulfilled,(state,action)=>{

            state.loading=false;


            state.myProducts.push(
                action.payload
            );


        })


        .addCase(createProduct.rejected,(state,action)=>{

            state.loading=false;

            state.error=action.payload;

        });






        // ===============================
        // GET VENDOR PRODUCTS
        // ===============================


        builder

        .addCase(getVendorProducts.pending,(state)=>{

            state.loading=true;

        })


        .addCase(getVendorProducts.fulfilled,(state,action)=>{

            state.loading=false;

            state.myProducts=action.payload;

        })


        .addCase(getVendorProducts.rejected,(state,action)=>{

            state.loading=false;

            state.error=action.payload;

        });






        // ===============================
        // UPDATE PRODUCT
        // ===============================


        builder

        .addCase(updateProduct.pending,(state)=>{

            state.loading=true;

        })


        .addCase(updateProduct.fulfilled,(state,action)=>{

            state.loading=false;


            state.myProducts = state.myProducts.map(

                (item)=>

                item._id === action.payload._id

                ?

                action.payload

                :

                item

            );


        })


        .addCase(updateProduct.rejected,(state,action)=>{

            state.loading=false;

            state.error=action.payload;

        });







        // ===============================
        // DELETE PRODUCT
        // ===============================


        builder

        .addCase(deleteProduct.fulfilled,(state,action)=>{


            state.myProducts =

            state.myProducts.filter(

                (item)=>

                item._id !== action.payload

            );


        });







        // ===============================
        // ADMIN ALL PRODUCTS
        // ===============================


        builder

        .addCase(adminGetAllProducts.fulfilled,(state,action)=>{


            state.products = action.payload;


        });







        // ===============================
        // CHANGE STATUS
        // ===============================


        builder

        .addCase(changeProductStatus.fulfilled,(state,action)=>{


            state.myProducts =

            state.myProducts.map(

                (item)=>

                item._id === action.payload._id

                ?

                action.payload

                :

                item

            );


        });








        // ===============================
        // ADMIN DELETE
        // ===============================


        builder

        .addCase(adminDeleteProduct.fulfilled,(state,action)=>{


            state.products =

            state.products.filter(

                (item)=>

                item._id !== action.payload

            );


        });


    }

});



export const {

    clearProductError,

    clearProduct

} = productSlice.actions;



export default productSlice.reducer;