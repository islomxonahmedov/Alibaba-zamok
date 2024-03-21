import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    targetProduct: {},
    status: 'idle',
    error: null,
};

const targetProductSlice = createSlice({
    name: 'targetProduct',
    initialState,
    reducers: {
        getProductStart(state) {
            state.status = 'loading';
        },
        getProductSuccess(state, action) {
            state.status = 'succeeded';
            state.targetProduct = action.payload;
        },
        getProductFailure(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const { getProductStart, getProductSuccess, getProductFailure } = targetProductSlice.actions;

export const fetchTargetProduct = (id) => async (dispatch) => {
    try {
        dispatch(getProductStart());
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        dispatch(getProductSuccess(response.data));
    } catch (error) {
        dispatch(getProductFailure(error.message));
    }
};

export default targetProductSlice.reducer;
