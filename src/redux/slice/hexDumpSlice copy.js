import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
    error: null
};

const hexDumpSlice = createSlice({
    name: 'hexDump',
    initialState,
    reducers: {
        setHexDumpData: (state, action) => {
            state.data = action.payload.data;
            state.currentPage = action.payload.page;
            state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
        },
        setHexLoading: (state, action) => {
            state.loading = action.payload;
        },
        setHexError: (state, action) => {
            state.error = action.payload;
        },
        clearHexData: (state) => {
            state.data = [];
            state.currentPage = 1;
            state.totalPages = 1;
            state.error = null;
        }
    }
});

export const {
    setHexDumpData,
    setHexLoading,
    setHexError,
    clearHexData
} = hexDumpSlice.actions;

export default hexDumpSlice.reducer; 
