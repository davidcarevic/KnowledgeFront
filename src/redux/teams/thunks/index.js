import { getTeamsByUser, createTeam } from "../../../services";
import { setTeamsByUser } from "../actions";
import { isLoading } from "../../global/actions";
//notifications
import {teamCreateError, teamCreateSuccess} from "../../../components/elements/Notifications/TeamCreate";
import {generalError} from "../../../components/elements/Notifications/GeneralError";

export const getTeams = () => dispatch => {
    dispatch(isLoading(true));
    getTeamsByUser()
        .then(res => {
            if(res.data.length === 0) {
                res.data = 0;
            }
            dispatch(setTeamsByUser(res.data));
            dispatch(isLoading(false));
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
            generalError()
        })
}

export const teamCreation = (name, description) => dispatch => {
    dispatch(isLoading(true));
    createTeam(name, description)
        .then(res => {
            return getTeamsByUser()
        })
        .then(res => {
            dispatch(setTeamsByUser(res.data));
            dispatch(isLoading(false));
            teamCreateSuccess()
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
            teamCreateError()
        })
}