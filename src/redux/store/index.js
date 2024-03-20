import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slice/usersSlice';
import basketReducer from '../slice/BasketSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        basket: basketReducer,
    },
});