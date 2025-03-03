import { store } from '../redux/store';
import { verifyToken } from '../services/operations/auth';

export const isLoggedIn = async () => {
    const authState = store.getState().auth;
    const token = authState.token || sessionStorage.getItem('token');
    
    if (!token) {
        return false;
    }

    const isValid = await verifyToken(token);
    return isValid;
};



