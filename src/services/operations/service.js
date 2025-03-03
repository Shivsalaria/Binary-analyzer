import { Service } from '../Api'
import { apiConnecter } from '../ApiConnecter'
import { setLoading, setFileData, setError } from '../../redux/slice/fileSlice'
import { setDecompilerData } from '../../redux/slice/decompilerSlice'
import { setStringsData } from '../../redux/slice/stringsSlice'
import { setDosHeaderData } from '../../redux/slice/dosHeaderSlice'
import { setFileHeaderData } from '../../redux/slice/fileHeaderSlice'
import { setResourcesData } from '../../redux/slice/resourcesSlice'
import { setRichHeaderData } from '../../redux/slice/richHeaderSlice'
import { setAiData, setAiLoading, setAiError } from '../../redux/slice/aiDataSlice'
import { setHexData } from '../../redux/slice/hexSlice'
import { setFunctionsData, setFunctionsLoading, setFunctionsError } from '../../redux/slice/functionsSlice'
import { setGeneralData, setGeneralLoading, setGeneralError } from '../../redux/slice/generalSlice'

const { File_ANALYSIS, GET_FUNCTIONS, SERVICE_DATA,FILES_DATA,GET_AI_DATA } = Service;

export const uploadFile = async (file, token, dispatch) => {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        dispatch(setLoading(true));
        dispatch(setFunctionsLoading(true));
        dispatch(setGeneralLoading(true));
        
        // First API call - File Analysis
        const response = await apiConnecter("POST", File_ANALYSIS, 
            formData,
            {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        );

        if (!response?.data) {
            throw new Error('Upload failed');
        }

        dispatch(setFileData(response.data));
        // console.log('File Analysis Response:', response.data);

        // Second API call - Get Functions and General Data
        const [functionsResponse, generalDataResponse] = await Promise.all([
            apiConnecter("GET", GET_FUNCTIONS, null, {
                Authorization: token
            }),
            apiConnecter("GET", `${SERVICE_DATA}?file=metadata`, null, {
                Authorization: token
            })
        ]);

        if (!functionsResponse?.data) {
            dispatch(setFunctionsError('Failed to get functions'));
            throw new Error('Failed to get functions');
        }

        if (!generalDataResponse?.data) {
            dispatch(setGeneralError('Failed to get general data'));
            throw new Error('Failed to get general data');
        }

        dispatch(setFunctionsData(functionsResponse.data));
        dispatch(setGeneralData(generalDataResponse.data));
        
        // console.log('Functions Response:', functionsResponse.data);
        // console.log('General Data Response:', generalDataResponse.data);

        return response.data;
    } catch (error) {
        // console.error('Operation error:', error);
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(setLoading(false));
        dispatch(setFunctionsLoading(false));
        dispatch(setGeneralLoading(false));
    }
};

export async function File_analysis(reqObj, token) {
    const res = await apiConnecter("POST", File_ANALYSIS, reqObj, {
        Authorization: token
    });

    return (res.data)
}

export const fetchDosHeaderData = async (token, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await apiConnecter("GET", `${SERVICE_DATA}?file=dos_header`, null, {
            Authorization: token
        });

        if (!response?.data) {
            throw new Error('Failed to get DOS header data');
        }

        dispatch(setDosHeaderData(response.data));
        // console.group('DOS Header Data Details');
        // console.log('Response Data:', response.data);
        // console.groupEnd();
        
        return response.data;
    } catch (error) {
        // console.error('DOS header error:', error);
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchFileHeaderData = async (token, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await apiConnecter("GET", `${SERVICE_DATA}?file=fileheader`, null, {
            Authorization: token
        });

        if (!response?.data) {
            throw new Error('Failed to get file header data');
        }

        dispatch(setFileHeaderData(response.data));
            // console.group('File Header Data Details');
            // console.log('Response Data:', response.data);
            // console.groupEnd();
        
        return response.data;
    } catch (error) {
        // console.error('File header error:', error);
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchResourcesData = async (token, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await apiConnecter("GET", `${SERVICE_DATA}?file=resources`, null, {
            Authorization: token
        });

        if (!response?.data) {
            throw new Error('Failed to get resources data');
        }

        dispatch(setResourcesData(response.data));
        // console.group('Resources Data Details');
        // console.log('Response Data:', response.data);
        // console.groupEnd();
        
        return response.data;
    } catch (error) {
        // console.error('Resources error:', error);
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchRichHeaderData = async (token, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await apiConnecter("GET", `${SERVICE_DATA}?file=rich_header`, null, {
            Authorization: token
        });

        if (!response?.data) {
            throw new Error('Failed to get rich header data');
        }

        dispatch(setRichHeaderData(response.data));
        // console.group('Rich Header Data Details');
        // console.log('Response Data:', response.data);
        // console.groupEnd();
        
        return response.data;
    } catch (error) {
        // console.error('Rich header error:', error);
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchOptionalHeaderData = async (token, dispatch) => {
    try {
        const response = await apiConnecter.get('/api/optional-header', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setOptionalHeaderData(response.data));
    } catch (error) {
        // console.error('Error fetching optional header data:', error);
        throw error;
    }
};

export const fetchSectionHeaderData = async (token, dispatch) => {
    try {
        const response = await apiConnecter.get('/api/section-headers', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setSectionHeaderData(response.data));
    } catch (error) {
        // console.error('Error fetching section header data:', error);
        throw error;
    }
};

export const fetchImportsData = async (token, dispatch) => {
    try {
        const response = await apiConnecter.get('/api/imports', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setImportsData(response.data));
    } catch (error) {
        // console.error('Error fetching imports data:', error);
        throw error;
    }
};

export const fetchDecompilerData = async (page = 1, limit = 50, token, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await apiConnecter(
            "GET", 
            `${FILES_DATA}?page=${page}&limit=${limit}&file=dis`, 
            null, 
            {
                Authorization: token
            }
        );

        if (!response?.data) {
            throw new Error('Failed to get decompiler data');
        }

        dispatch(setDecompilerData(response.data));
        // console.group('Decompiler Data Details');
        // console.log('Response Data:', response.data);
        // console.groupEnd();
        
        return response.data;
    } catch (error) {
        // console.error('Decompiler data error:', error);
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchStringsData = async (page = 1, limit = 50, token, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await apiConnecter(
            "GET", 
            `${FILES_DATA}?page=${page}&limit=${limit}&file=string`, 
            null, 
            {
                Authorization: token
            }
        );

        if (!response?.data) {
            throw new Error('Failed to get strings data');
        }

        dispatch(setStringsData(response.data));
        // console.group('Strings Data Details');
        // console.log('Response Data:', response.data);
        // console.groupEnd();
        
        return response.data;
    } catch (error) {
        // console.error('Strings data error:', error);
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchHexData = async (page = 1, limit = 50, token, dispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await apiConnecter(
            "GET", 
            `${FILES_DATA}?page=${page}&limit=${limit}&file=hex`, 
            null, 
            {
                Authorization: token
            }
        );

        if (!response?.data?.data) {
            throw new Error('Failed to get hex data');
        }

        dispatch(setHexData(response.data.data));
        // console.group('Hex Data Details');
        // console.log('Response Data:', response.data);
        // console.groupEnd();
        
        return response.data.data;
    } catch (error) {
        // console.error('Hex data error:', error);
        dispatch(setError(error.message));
        throw error;
    } finally {
        dispatch(setLoading(false));
    }
};

export const fetchAiAnalysis = async (code, token, dispatch) => {
    try {
        dispatch(setAiLoading(true));
        const response = await apiConnecter("POST", GET_AI_DATA, 
            { code },
            {
                Authorization: token,
                'Content-Type': 'application/json'
            }
        );

        if (!response?.data) {
            throw new Error('Failed to get AI analysis');
        }

        dispatch(setAiData(response.data));
        return response.data;
        
    } catch (error) {
        // console.error('AI analysis error:', error);
        dispatch(setAiError(error.message));
        throw error;
    } finally {
        dispatch(setAiLoading(false));
    }
};