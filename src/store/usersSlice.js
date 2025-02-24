import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLocalStorageItem, getSessionStorageItem, removeLocalStorageItem, removeSessionStorageItem, setLocalStorageItem, setSessionStorageItem } from '../utils/sessionStorageUtils';
import { IS_LOGGED_IN, USER_DETAILS } from '../utils/constants';
import axiosInstance from '../utils/axiosInstance';

const initialState = {
    users: {},
    user: null,
    status: null,
    error: null,
    isLoggedIn: false,
    loggedInUserDetails: null
};

export const userLogin = createAsyncThunk('users/userLogin', async (payload) => {
    const url = "https://localhost:7041/api/account/login";
    const response = await axiosInstance.post(url, payload);
    return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (payload) => {
    const url = `https://localhost:7041/api/account/register`;
    const response = await axiosInstance.post(url, payload);
    return response.data;
});

export const getUsers = createAsyncThunk('users/getUsers', async () => {
    const url = "https://localhost:7041/api/Users";
    const response = await axiosInstance.get(url);
    return response.data;
});

export const getUserById = createAsyncThunk('users/getUserById', async (userId, storeUserInfo = false) => {
    const url = `https://localhost:7041/api/Users/${userId}`;
    const response = await axios.get(url);
    if (storeUserInfo) {
        return { ...response.data, storeUserInfo: true }
    }
    return response.data;
});

export const updateUserDetails = createAsyncThunk('users/updateUserDetails', async (userId, payload) => {
    const url = `https://localhost:7041/api/Users/${userId}`;
    const response = await axios.put(url, payload);
    return response.data;
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getLoginStatus: (state) => {
            if (getLocalStorageItem(IS_LOGGED_IN)) {
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
                if (getLocalStorageItem(IS_LOGGED_IN)) {
                    removeLocalStorageItem(IS_LOGGED_IN);
                }
                if (getSessionStorageItem('userInfo')) {
                    removeSessionStorageItem('userInfo');
                }
            }
        },
        getLoggedInUserDetails: (state) => {
            if (getSessionStorageItem(USER_DETAILS)) {
                state.loggedInUserDetails = getSessionStorageItem(USER_DETAILS);
            }
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.loggedInUserDetails = null;
            removeLocalStorageItem(IS_LOGGED_IN);
            removeSessionStorageItem(USER_DETAILS);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.pending, (state) => {
                state.status = 'loading';
            }).addCase(userLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isLoggedIn = true;
                setLocalStorageItem(IS_LOGGED_IN, true);
                state.loggedInUserDetails = action.payload;
                setSessionStorageItem(USER_DETAILS, action.payload);
            }).addCase(userLogin.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
                state.isLoggedIn = false;
                if (getLocalStorageItem(IS_LOGGED_IN)) {
                    removeLocalStorageItem(IS_LOGGED_IN);
                }
                if (getSessionStorageItem(USER_DETAILS)) {
                    removeSessionStorageItem(USER_DETAILS);
                }
            })
            .addCase(createUser.pending, (state) => {
                state.status = 'loading';
            }).addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
            }).addCase(createUser.rejected, (state, action) => {
                console.log("error")
                state.status = 'failed';
                state.error = action.error.message;
            })
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
export const { getAllUsers, getLoginStatus, getLoggedInUserDetails, logout } = usersSlice.actions;

export default usersSlice.reducer