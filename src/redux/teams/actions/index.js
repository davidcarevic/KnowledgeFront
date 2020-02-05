import * as types from './types';
export const getTeamsByUser = teams => {
    return {
        type: types.GET_TEAMS_BY_USER,
        payload: teams
    }
}