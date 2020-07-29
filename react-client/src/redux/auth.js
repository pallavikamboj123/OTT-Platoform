import * as ActionTypes from './actionTypes';

export const Auth = (state = {
    isAuthenticated: localStorage.getItem('token')?  true: false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null,
    errMess: null
}, action )=>{
    switch (action.type){
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                user: action.creds
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {...state,
            isAuthenticated: true,
            errMess: '',
            token: action.token
            };
        case ActionTypes.LOGIN_FAILURE:
            return {...state,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            }
        default:
            return state;
    }
}