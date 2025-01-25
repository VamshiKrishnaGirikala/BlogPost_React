import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: {},
    status: null,
    error: null
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.users = action.payload.map(user => ({ [user.id]: user }));
                action.payload.forEach(user => {
                    state.users[user.id] = user;
                });
                // state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

// Action creators are generated for each case reducer function
export const { getAllUsers } = usersSlice.actions

export default usersSlice.reducer