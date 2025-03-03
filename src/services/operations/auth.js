import { apiConnecter } from '../ApiConnecter';
import { User } from '../Api';

const { TOKEN_VERIFICATION } = User;

export async function verifyToken(token) {
    try {
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
        
        const response = await apiConnecter('GET', TOKEN_VERIFICATION, null, headers);
        
        // console.log('Full API Response:', {
        //     status: response?.status,
        //     data: response?.data,
        //     headers: response?.headers
        // });
            
        const isValid = response?.data?.success === true;
        
        // console.log('Token validation details:', { 
        //     responseStatus: response?.data?.status,
        //     responseSuccess: response?.data?.success,
        //     isValid 
        // });
        
        return isValid;
        
    } catch (error) {
        // console.error("Token verification failed:", error);
        // console.log("Error details:", {
        //     message: error.message,
        //     response: error.response,
        //     data: error.response?.data
        // });
        return false;
    }
}