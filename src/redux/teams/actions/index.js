import * as types from './types';
export const setTeamsByUser = teams =>{
    return{
        type: types.SET_TEAMS_BY_USER,
        payload: teams
    }
}

export const removeTeamsByUser = () =>{
    console.log("usao u removeteams")
    return{
        type: types.REMOVE_TEAMS_BY_USER,
        payload: []
    }
}