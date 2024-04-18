import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addItemlike: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addItemlike, removeItem } = likeSlice.actions;
export default likeSlice.reducer;
