import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: {},
    user: null,
    status: null,
    error: null,
    isLoggedIn: false
};

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
});

export const getUserById = createAsyncThunk('users/getUserById', async (userId) => {
    const response = await axios.get(`https://jsonplaceholder.org/users/${userId}`);
    return response.data;
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload.email === 'johndoe@example.com' && action.payload.password === 'jsonplaceholder.org') {
                state.isLoggedIn = true;
                window.localStorage.setItem('isLoggedIn', 'true');
            } else {
                state.isLoggedIn = false;
                if (window.localStorage.getItem('isLoggedIn')) {
                    window.localStorage.removeItem('isLoggedIn');
                }
            }
        },
        getLoginStatus: (state) => {
            if (window.localStorage.getItem('isLoggedIn') === 'true') {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
                if (window.localStorage.getItem('isLoggedIn')) {
                    window.localStorage.removeItem('isLoggedIn');
                }
            }
        },
        logout: (state) => {
            state.isLoggedIn = false;
            window.localStorage.removeItem('isLoggedIn');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'loading';
            }).addCase(getUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                action.payload.forEach(user => {
                    state.users[user.id] = user;
                });
            }).addCase(getUsers.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getUserById.pending, (state) => {
                state.status = 'loading';
            }).addCase(getUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            }).addCase(getUserById.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

// Action creators are generated for each case reducer function
export const { getAllUsers, login, getLoginStatus, logout } = usersSlice.actions

export default usersSlice.reducer