import { getToken,getRefresh } from "../../../services";
import {
    authenticateUser,
    setAccessToken,
    setRefreshToken,
    authenticationError,
    authenticationErrorMessage
} from "../actions";
import { isLoading } from "../../global/actions";
import axios from "../../../axios";

export const loginUser = (email, password) => dispatch => {
    dispatch(isLoading(true));
    dispatch(authenticationError(false));
    dispatch(authenticationErrorMessage(''));

    getToken(email, password)
        .then(res => {
            dispatch(isLoading(false));
            dispatch(setAccessToken(res.data.access))
            dispatch(setRefreshToken(res.data.refresh))
            dispatch(authenticateUser(true))
            window.localStorage.setItem('refresh', res.data.refresh);
        })
        .catch(err => {
            console.log("AXIOS ERROR: ", axios);
            if(err.status === 401) {
                refreshToken()
                dispatch(isLoading(false));
            } else {
                dispatch(isLoading(false));
                dispatch(authenticationError(true));
                dispatch(authenticationErrorMessage(err.message));
            }
        })
}

export const refreshToken = () => dispatch => {
    // call refresh token service and set new access and refresh tokens
    dispatch(isLoading(true));
    getRefresh()
        .then(res=>{
            dispatch(isLoading(false));
            dispatch(setAccessToken(res.data.access))
        })
        .catch(err=>{
           console.log(err.message)
        })

}