import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [{
        address: '',
        hex: [],
        ascii: ''
    }],
    loading: false,
    error: null
};

const hexSlice = createSlice({
    name: 'hex',
    initialState,
    reducers: {
        setHexData: (state, action) => {
            state.data = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setHexData, setLoading, setError } = hexSlice.actions;
export default hexSlice.reducer; 