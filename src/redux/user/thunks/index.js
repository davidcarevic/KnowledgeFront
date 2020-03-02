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
import {
    setCategories,
    setCategory, setElement, setElements,
    setProject,
    setProjectsByUser,
    setSection,
    setSections
} from "../../projects/actions";
//notifications -->
import {loginSuccess, loginError} from '../../../components/elements/Notifications/Login/';
import {logoutSuccess} from "../../../components/elements/Notifications/Logout";
import {registerSuccess,registerError} from "../../../components/elements/Notifications/Register";
import {inviteSuccess,inviteError} from "../../../components/elements/Notifications/Invite";
import {inviteRetrieveError} from "../../../components/elements/Notifications/InviteRetriveError";
import {generalError} from "../../../components/elements/Notifications/GeneralError";
import {resetPassError,resetPassSuccess} from "../../../components/elements/Notifications/ResetPassword";

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
            loginSuccess();
        })
        .catch(err => {
            console.log("AXIOS ERROR: ", axios);
            if(err.status === 401) {
                //
            } else {
                dispatch(isLoading(false));
                dispatch(authenticationError(true));
                dispatch(authenticationErrorMessage(err.message))
                loginError();
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
    //  axios call for blacklisting needs to be added if it's decided that the tokens will be blacklisted
    dispatch(isLoading(true))
    console.log("usao u logout")
    let res = removeToken() // a function that returns true, if we decide to implement some kind of axios call to backend for token removal, it will be changed
    console.log("true is remove token ??", res)
    dispatch(setAccessToken(null))
    dispatch(setRefreshToken(null))
    dispatch(authenticateUser(false))
    dispatch(removeTeamsByUser())
    /** unsets everything in the state*/
    dispatch(setProjectsByUser([]));
    dispatch(setProject({}))
    dispatch(setSection({}))
    dispatch(setSections([]))
    dispatch(setCategory({}))
    dispatch(setCategories([]))
    dispatch(setElement({}))
    dispatch(setElements({}))
    window.localStorage.removeItem('refreshToken')
    dispatch(isLoading(false))
    logoutSuccess();
}


export const registerUser = (email, password, data) => dispatch => {
    dispatch(isLoading(true))
    register(email, password, data)
        .then(res => {
            dispatch(createUser(res.data))
            dispatch(isLoading(false))
            registerSuccess();
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
            registerError();
        })
}

export const userInvite = (email, data) => dispatch => {
    dispatch(isLoading(true))
    inviteUser(email, data)
        .then(res => {
            dispatch(createInvite(res.data))
            dispatch(isLoading(false))
            inviteSuccess(email);
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
            inviteError();
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
            inviteRetrieveError();
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
            generalError();
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
            generalError();
        })
}

export const resetPasswordForUser = (guid, password, data) => dispatch => {
    dispatch(isLoading(true))
    destroyResetAndUpdatePass(guid, password, data)
        .then( res => {
            dispatch(passReset(res.data))
            dispatch(isLoading(false))
            resetPassSuccess();
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
            resetPassError();
        })

}