import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!sessionStorage.getItem('token'), 
  token: sessionStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      sessionStorage.setItem('token', action.payload);
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      sessionStorage.removeItem('token');
      state.isAuthenticated = false;
      state.token = null;
    },
    setToken: (state, action) => {  
      sessionStorage.setItem('token', action.payload);
      state.token = action.payload;
    },
    token: (state, action) => {  
      sessionStorage.setItem('token', action.payload);
      state.token = action.payload;
    },

    
  },
});

export const { login, logout, setToken,token } = authSlice.actions; 
export default authSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: !!sessionStorage.getItem('token'), 
//   token: sessionStorage.getItem('token') || null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action) => {
//       sessionStorage.setItem('token', action.payload);
//       state.isAuthenticated = true;
//       state.token = action.payload;
//     },
//     logout: (state) => {
//       sessionStorage.removeItem('token');
//       state.isAuthenticated = false;
//       state.token = null;
//     },
//     setToken: (state, action) => {  
//       sessionStorage.setItem('token', action.payload);
//       state.token = action.payload;
//     },
//   },
// });

// export const { login, logout, setToken } = authSlice.actions;
// export const selectToken = (state) => state.auth.token; // Exporting token selector

// export default authSlice.reducer;
