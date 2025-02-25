import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './postsSlice';
import usersSlice from './usersSlice';
import globalStateSlice from './globalStateSlice';
import apiMiddleware from '../middleware/apiMiddleware';

const store = configureStore({
    reducer: {
        posts: postsSlice,
        users: usersSlice,
        globalError: globalStateSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiMiddleware),
});

export default store;