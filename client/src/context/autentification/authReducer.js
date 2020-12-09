
import {
    SUCCESS_REGISTRATION, 
    ERROR_REGISTRATION, 
    GET_USER,
    SUCCESS_LOGIN, 
    ERROR_LOGIN,
    CLOSE_SESSION
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case SUCCESS_REGISTRATION:
        case SUCCESS_LOGIN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }    
        case CLOSE_SESSION:
        case ERROR_LOGIN:
        case ERROR_REGISTRATION:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }
        default:
            return state;
    }
}