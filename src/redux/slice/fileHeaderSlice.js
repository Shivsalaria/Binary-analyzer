import { createSlice } from '@reduxjs/toolkit';

const fileHeaderSlice = createSlice({
    name: 'fileHeader',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {
        setFileHeaderData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setFileHeaderData } = fileHeaderSlice.actions;
export default fileHeaderSlice.reducer; 