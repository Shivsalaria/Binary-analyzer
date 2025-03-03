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

const getSessionData = () => {
    try {
        const encrypted = sessionStorage.getItem('gD');
        if (!encrypted) return null;
        return decryptData(encrypted);
    } catch (error) {
        // console.error('Error reading from sessionStorage:', error);
        return null;
    }
};

const initialState = {
    data: getSessionData(),
    loading: false,
    error: null
};

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        setGeneralData: (state, action) => {
            state.data = action.payload;
            // Save encrypted data to sessionStorage
            try {
                const encrypted = encryptData(action.payload);
                if (encrypted) {
                    sessionStorage.setItem('gD', encrypted);
                }
            } catch (error) {
                // console.error('Error saving to sessionStorage:', error);
                state.error = error.message;
            }
        },
        setGeneralLoading: (state, action) => {
            state.loading = action.payload;
        },
        setGeneralError: (state, action) => {
            state.error = action.payload;
        },
        clearGeneralData: (state) => {
            state.data = null;
            state.error = null;
            try {
                sessionStorage.removeItem('gD');
            } catch (error) {
                // console.error('Error clearing from sessionStorage:', error);
            }
        }
    }
});

export const { setGeneralData, setGeneralLoading, setGeneralError, clearGeneralData } = generalSlice.actions;
export default generalSlice.reducer; 