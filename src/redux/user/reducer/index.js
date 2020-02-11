import * as types from '../actions/types'

const initialState = {
    isAuthenticated: false,
    authenticationError: false,
    authenticationErrorMessage: '',
    accessToken: '',
    refreshToken: '',
    user:{},
    invite:{},
    invited:{}

}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.payload
            }
        case types.SET_REFRESH_TOKEN:
            return {
                ...state,
                refreshToken: action.payload
            }
        case types.AUTHENTICATION_ERROR:
            return {
                ...state,
                authenticationError: action.payload
            }
        case types.AUTHENTICATION_ERROR_MESSAGE:
            return {
                ...state,
                authenticationErrorMessage: action.payload
            }
        case types.AUTHENTICATE:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case types.CREATE_USER:
            return{
                ...state,
                user:action.payload
            }
        case types.SET_INVITE:
            return{
                ...state,
                invite:action.payload
            }
        case types.SET_INVITED_USER:
            return{
                ...state,
                invited:action.payload
            }
        default:
            return state
    }
}