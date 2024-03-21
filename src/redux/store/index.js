import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slice/usersSlice';
import targetProductReducer from '../slice/CardinfoSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        targetProduct: targetProductReducer,

    },
});