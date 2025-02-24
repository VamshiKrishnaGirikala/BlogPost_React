import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    errorMessage: null,
};

const globalErrorSlice = createSlice({
    name: 'globalError',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearError: (state) => {
            state.errorMessage = null;
        },
    },
});

export const { setError, clearError } = globalErrorSlice.actions;

export default globalErrorSlice.reducer;