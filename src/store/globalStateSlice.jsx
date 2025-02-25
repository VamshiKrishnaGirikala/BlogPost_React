import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errorMessage: null,
    loading: false
};

const globalStateSlice = createSlice({
    name: 'globalError',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearError: (state) => {
            state.errorMessage = null;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { setError, clearError, startLoading, stopLoading } = globalStateSlice.actions;

export default globalStateSlice.reducer;