// BasketSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBasketProducts = createAsyncThunk(
    'basket/fetchBasketProducts',
    async () => {
        const response = await axios.get('http://localhost:5000/basket');
        return response.data;
    }
);

export const addProduct = createAsyncThunk(
    'basket/addProduct',
    async (product) => {
        const response = await axios.post('http://localhost:5000/basket', product);
        return response.data;
    }
);

export const deleteProduct = createAsyncThunk(
    'basket/deleteProduct',
    async (productId) => {
        await axios.delete(`http://localhost:5000/basket/${productId}`);
        return productId;
    }
);

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        products: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBasketProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBasketProducts.fulfilled, (state, action) => {
                state.status = 'success';
                state.products = action.payload;
            })
            .addCase(fetchBasketProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.status = 'success';
                state.products.push(action.payload);
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'success';
                state.products = state.products.filter(product => product.id !== action.payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default basketSlice.reducer;
