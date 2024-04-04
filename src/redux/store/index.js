import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../slice/usersSlice';
import targetProductReducer from '../slice/CardinfoSlice';
import commentsReducer from '../slice/CommentSlice'
import basketReducer from '../slice/BasketSlice'


export const store = configureStore({
    reducer: {
        users: usersReducer,
        targetProduct: targetProductReducer,
        comments: commentsReducer,
        basket: basketReducer,
    },
});