import { getToken,getRefresh,removeToken } from "../../../services";
import {removeTeamsByUser} from "../../teams/actions";
import {
    authenticateUser,
    setAccessToken,
    setRefreshToken,
    authenticationError,
    authenticationErrorMessage
} from "../actions";
import { isLoading } from "../../global/actions";
import axios from "../../../axios";
import store from "../../configureStore";

export const loginUser = (email, password) => dispatch => {
    console.log("OVO PRVO")
    dispatch(isLoading(true));
    dispatch(authenticationError(false));
    dispatch(authenticationErrorMessage(''));
    getToken(email, password)
        .then(res => {
            console.log("OVO DRUGO");
            dispatch(setAccessToken(res.data.access))
            dispatch(setRefreshToken(res.data.refresh))
            dispatch(authenticateUser(true))
            dispatch(isLoading(false));
            window.localStorage.setItem('refreshToken', res.data.refresh);
        })
        .catch(err => {
            console.log("AXIOS ERROR: ", axios);
            if(err.status === 401) {
                //
            } else {
                dispatch(isLoading(false));
                dispatch(authenticationError(true));
                dispatch(authenticationErrorMessage(err.message));
            }
        })
}
export const refreshToken = () => dispatch => {
    // call refresh token service and set new access and refresh tokens
    console.log('skace na refresh')
    dispatch(isLoading(true));
    dispatch(authenticationError(false));
    dispatch(authenticationErrorMessage(''));
    getRefresh()
        .then(res=>{
            dispatch(isLoading(false));
            dispatch(setAccessToken(res.data.access))
            dispatch(authenticateUser(true))
        })
        .catch(err=>{
            console.log("OVDE: ", err);
            dispatch(isLoading(false));
            dispatch(authenticationError(true));
            dispatch(authenticationErrorMessage(err.message));
           console.log(err.message)
        })
}
export const logout = () => dispatch =>{
    // works, the axios call for blacklisting needs to be added
    dispatch(isLoading(true))
    console.log("usao u logout")
    let res=removeToken()
    console.log("true is remove token ??",res)
    dispatch(setAccessToken(null))
    dispatch(setRefreshToken(null))
    dispatch(authenticateUser(false))
    dispatch(removeTeamsByUser())
    window.localStorage.removeItem('refreshToken')
    dispatch(isLoading(false))
}