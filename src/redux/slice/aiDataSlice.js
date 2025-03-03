import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    aiData: null,
    loading: false,
    error: null
};

const aiDataSlice = createSlice({
    name: 'aiData',
    initialState,
    reducers: {
        setAiData: (state, action) => {
            state.aiData = action.payload;
            state.error = null;
        },
        setAiLoading: (state, action) => {
            state.loading = action.payload;
        },
        setAiError: (state, action) => {
            state.error = action.payload;
            state.aiData = null;
        }
    }
});

export const { setAiData, setAiLoading, setAiError } = aiDataSlice.actions;
export default aiDataSlice.reducer; 