import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './postsSlice';
import usersSlice from './usersSlice';
import globalErrorSlice from './globalErrorSlice';
import errorMiddleware from '../middleware/errorMiddleware';

const store = configureStore({
    reducer: {
        posts: postsSlice,
        users: usersSlice,
        globalError: globalErrorSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(errorMiddleware),
});

export default store;