import { createSlice } from '@reduxjs/toolkit';

const richHeaderSlice = createSlice({
    name: 'richHeader',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {
        setRichHeaderData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setRichHeaderData } = richHeaderSlice.actions;
export default richHeaderSlice.reducer; 