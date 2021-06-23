import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGOUT
} from '../actions/types'
const initialState = {
    user:            JSON.parse(localStorage.getItem('user')) || null,
    token:           localStorage.getItem('token') || null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
}

export default function auth (state=initialState,action){
    const { type,payload } = action;
    switch(type){
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.access)
            localStorage.setItem('user',JSON.stringify(payload.user))
            return{
                ...state,
                token: payload.access,
                isAuthenticated:true,
                user:payload.user
            }
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated:false,
                user:null
            }
            
        default:
            return state;
    }
}