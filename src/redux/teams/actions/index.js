import * as types from './types';
export const setTeamsByUser = teams =>{
    return{
        type:types.SET_TEAMS_BY_USER,
        payload:teams
    }
}