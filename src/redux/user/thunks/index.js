import { getToken,getRefresh,removeToken,register,inviteUser,getInvitedUser,resetPass, getResetPassForUser, destroyResetAndUpdatePass } from "../../../services";
import {removeTeamsByUser} from "../../teams/actions";
import {
    authenticateUser,
    setAccessToken,
    setRefreshToken,
    authenticationError,
    authenticationErrorMessage,
    createUser,
    createInvite,
    setInvitedUser,
    setResetPassUser,
    passReset
} from "../actions";
import { isLoading } from "../../global/actions";
import axios from "../../../axios";
import {setProjectsByUser} from "../../projects/actions";

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
        .then(res => {
            dispatch(isLoading(false));
            dispatch(setAccessToken(res.data.access))
            dispatch(authenticateUser(true))
        })
        .catch(err => {
            console.log("OVDE: ", err);
            dispatch(isLoading(false));
            dispatch(authenticationError(true));
            dispatch(authenticationErrorMessage(err.message));
           console.log(err.message)
        })
}
export const logout = () => dispatch => {
    // works, the axios call for blacklisting needs to be added
    dispatch(isLoading(true))
    console.log("usao u logout")
    let res = removeToken() // a function that returns true, if we decide to implement some kind of axios call to backend for token removal it will be changed
    console.log("true is remove token ??", res)
    dispatch(setAccessToken(null))
    dispatch(setRefreshToken(null))
    dispatch(authenticateUser(false))
    dispatch(removeTeamsByUser())
    dispatch(setProjectsByUser([]));
    window.localStorage.removeItem('refreshToken')
    dispatch(isLoading(false))
}


export const registerUser = (email, password, data) => dispatch => {
    dispatch(isLoading(true))
    register(email, password, data)
        .then(res => {
            dispatch(createUser(res.data))
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const userInvite = (email, data) => dispatch => {
    dispatch(isLoading(true))
    inviteUser(email, data)
        .then(res => {
            dispatch(createInvite(res.data))
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const getInvited = (guid) => dispatch => {
    dispatch(isLoading(true))
    getInvitedUser(guid)
        .then(res => {
            dispatch(setInvitedUser(res.data))
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const sendResetPassword = (email) => dispatch => {
    dispatch(isLoading(true))
    resetPass(email)  //returns true, needs to be changed to an axios call
        .then(res => {
            console.log(res)
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const getResetPassUser = (guid) => dispatch => {
    dispatch(isLoading(true))
    getResetPassForUser(guid)
        .then(res => {
            dispatch(setResetPassUser(res.data))
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const resetPasswordForUser = (guid, password, data) => dispatch => {
    dispatch(isLoading(true))
    destroyResetAndUpdatePass(guid, password, data)
        .then( res => {
            dispatch(passReset(res.data))
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })

}