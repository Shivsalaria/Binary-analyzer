import { createSlice } from '@reduxjs/toolkit';

const encryptData = (data) => {
    try {
        const encoded = btoa(JSON.stringify(data));
        return encoded;
    } catch (error) {
        // console.error('Encryption error:', error);
        return null;
    }
};

const decryptData = (encrypted) => {
    try {
        const decoded = JSON.parse(atob(encrypted));
        return decoded;
    } catch (error) {
        // console.error('Decryption error:', error);
        return null;
    }
};

const getSessionFunctionsData = () => {
    try {
        const encrypted = sessionStorage.getItem('fD');
        if (!encrypted) return null;
        return decryptData(encrypted);
    } catch (error) {
        // console.error('Error reading from sessionStorage:', error);
        return null;
    }
};

const initialState = {
    data: getSessionFunctionsData(),
    loading: false,
    error: null
};

const functionsSlice = createSlice({
    name: 'functions',
    initialState,
    reducers: {
        setFunctionsData: (state, action) => {
            state.data = action.payload;
            try {
                const encrypted = encryptData(action.payload);
                if (encrypted) {
                    sessionStorage.setItem('fD', encrypted);
                }
            } catch (error) {
                // console.error('Error saving to sessionStorage:', error);
                state.error = error.message;
            }
        },
        setFunctionsLoading: (state, action) => {
            state.loading = action.payload;
        },
        setFunctionsError: (state, action) => {
            state.error = action.payload;
        },
        clearFunctionsData: (state) => {
            state.data = null;
            state.error = null;
            try {
                sessionStorage.removeItem('fD');
            } catch (error) {
                // console.error('Error clearing from sessionStorage:', error);
            }
        }
    }
});

export const { 
    setFunctionsData, 
    setFunctionsLoading, 
    setFunctionsError,
    clearFunctionsData 
} = functionsSlice.actions;

export default functionsSlice.reducer; 