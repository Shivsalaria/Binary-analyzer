import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    metadata: null
}

const metadataSlice = createSlice({
    name: 'metadata',
    initialState,
    reducers: {
        setMetadataData: (state, action) => {
            state.metadata = action.payload
        }
    }
})

export const { setMetadataData } = metadataSlice.actions
export default metadataSlice.reducer 