import { createSlice } from '@reduxjs/toolkit';

const resourcesSlice = createSlice({
    name: 'resources',
    initialState: {
        data: null,
        loading: false,
        error: null
    },
    reducers: {
        setResourcesData: (state, action) => {
            state.data = action.payload;
        }
    }
});

export const { setResourcesData } = resourcesSlice.actions;
export default resourcesSlice.reducer; 