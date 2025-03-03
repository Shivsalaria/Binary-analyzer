import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null
};

const stringsSlice = createSlice({
    name: 'strings',
    initialState,
    reducers: {
        setStringsData: (state, action) => {
            state.data = action.payload.data;
            state.currentPage = action.payload.page;
            state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
        },
        setStringsLoading: (state, action) => {
            state.loading = action.payload;
        },
        setStringsError: (state, action) => {
            state.error = action.payload;
        },
        clearStringsData: (state) => {
            state.data = [];
            state.currentPage = 1;
            state.totalPages = 1;
            state.error = null;
        }
    }
});

export const {
    setStringsData,
    setStringsLoading,
    setStringsError,
    clearStringsData
} = stringsSlice.actions;

export default stringsSlice.reducer; 