import { createSlice } from '@reduxjs/toolkit';

const dosHeaderSlice = createSlice({
    name: 'dosHeader',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {
        setDosHeaderData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setDosHeaderData } = dosHeaderSlice.actions;
export default dosHeaderSlice.reducer; 