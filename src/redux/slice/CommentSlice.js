// commentsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mahsulotlar uchun alohida commentlarni olish uchun thunk yaratish
export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (productId, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${productId}/comments`);
            if (!response.ok) {
                throw new Error('Server error');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Mahsulotlar uchun alohida comment qo'shish uchun thunk yaratish
export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ productId, comment }, thunkAPI) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${productId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: comment }),
            });
            if (!response.ok) {
                throw new Error('Server error');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // fetchComments muvaffaqiyatli bajarilganda
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.comments = action.payload;
        });
        // addComment muvaffaqiyatli bajarilganda
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.comments.push(action.payload);
        });
        // fetchComments yoki addComment amallari xato bilan tugab qolganida
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(addComment.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});

export default commentsSlice.reducer;
