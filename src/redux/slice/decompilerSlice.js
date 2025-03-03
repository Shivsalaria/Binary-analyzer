import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    decompilerData: null,
    loading: false,
    error: null,
    totalCount: 0
};

const decompilerSlice = createSlice({
    name: 'decompiler',
    initialState,
    reducers: {
        setDecompilerData: (state, action) => {
            state.decompilerData = action.payload.data;
            state.totalCount = action.payload.total || 0;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setDecompilerData, setLoading, setError } = decompilerSlice.actions;
export default decompilerSlice.reducer; 