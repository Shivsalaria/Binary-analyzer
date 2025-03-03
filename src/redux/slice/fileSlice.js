import { createSlice } from '@reduxjs/toolkit'

const fileSlice = createSlice({
    name: 'file',
    initialState: {
        loading: false,
        fileData: null,
        functions: null,
        error: null,
        serviceData: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setFileData: (state, action) => {
            state.fileData = action.payload
        },
        setFunctions: (state, action) => {
            state.functions = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        setServiceData: (state, action) => {
            state.serviceData = action.payload;
        }
    }
})

export const { setLoading, setFileData, setFunctions, setError, setServiceData } = fileSlice.actions
export default fileSlice.reducer 