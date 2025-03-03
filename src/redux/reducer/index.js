import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'; 
import fileReducer from '../slice/fileSlice';


const rootReducer = combineReducers({
  auth: authReducer, 
  file: fileReducer,
});

export default rootReducer; 


