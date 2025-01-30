import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocalStorageItem, getSessionStorageItem, removeLocalStorageItem, removeSessionStorageItem, setLocalStorageItem, setSessionStorageItem } from '../utils/sessionStorageUtils';

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

export const getUserById = createAsyncThunk('users/getUserById', async (userId, storeUserInfo = false) => {
    const response = await axios.get(`https://jsonplaceholder.org/users/${userId}`);
    if (storeUserInfo) {
        return { ...response.data, storeUserInfo: true }
    }
    return response.data;
});

export const updateUserDetails = createAsyncThunk('users/updateUserDetails', async (userId, payload) => {
    const response = await axios.put(`https://jsonplaceholder.org/users/${userId}`, payload);
    return response.data;
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload.email === 'johndoe@example.com' && action.payload.password === 'jsonplaceholder.org') {
                state.isLoggedIn = true;
                setLocalStorageItem('isLoggedIn', true);
            } else {
                state.isLoggedIn = false;
                if (getLocalStorageItem('isLoggedIn')) {
                    removeLocalStorageItem('isLoggedIn');
                }
                if (getSessionStorageItem('userInfo')) {
                    removeSessionStorageItem('userInfo');
                }
            }
        },
        getLoginStatus: (state) => {
            if (getLocalStorageItem('isLoggedIn')) {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
                if (getLocalStorageItem('isLoggedIn')) {
                    removeLocalStorageItem('isLoggedIn');
                }
                if (getSessionStorageItem('userInfo')) {
                    removeSessionStorageItem('userInfo');
                }
            }
        },
        logout: (state) => {
            state.isLoggedIn = false;
            removeLocalStorageItem('isLoggedIn');
            removeSessionStorageItem('userInfo');
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
                if (action.payload.storeUserInfo) {
                    const { login, storeUserInfo, ...userInfo } = action.payload;
                    setSessionStorageItem('userInfo', userInfo);
                }
            }).addCase(getUserById.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.status = 'loading';
            }).addCase(updateUserDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
            }).addCase(updateUserDetails.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

// Action creators are generated for each case reducer function
export const { getAllUsers, login, getLoginStatus, logout } = usersSlice.actions

export default usersSlice.reducer