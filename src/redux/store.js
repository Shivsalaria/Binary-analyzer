import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import fileReducer from './slice/fileSlice'
import decompilerReducer from './slice/decompilerSlice'
import stringsReducer from './slice/stringsSlice'
import dosHeaderReducer from './slice/dosHeaderSlice'
import fileHeaderReducer from './slice/fileHeaderSlice'
import resourcesReducer from './slice/resourcesSlice'
import richHeaderReducer from './slice/richHeaderSlice'
import metadataReducer from './slice/metadataSlice'
import aiDataReducer from './slice/aiDataSlice'
import hexReducer from './slice/hexSlice'
import functionsReducer from './slice/functionsSlice'
import generalReducer from './slice/generalSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        file: fileReducer,
        decompiler: decompilerReducer,
        strings: stringsReducer,
        dosHeader: dosHeaderReducer,
        fileHeader: fileHeaderReducer,
        resources: resourcesReducer,
        richHeader: richHeaderReducer,
        metadata: metadataReducer,
        aiData: aiDataReducer,
        hex: hexReducer,
        functions: functionsReducer,
        general: generalReducer,
    }
}) 