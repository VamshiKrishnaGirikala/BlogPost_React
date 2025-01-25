import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './postsSlice';
import usersSlice from './usersSlice';

const store = configureStore({
    reducer: { posts: postsSlice, users: usersSlice }
});

export default store;