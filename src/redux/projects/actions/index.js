import * as types from './types';

export const setProjectsByTeam = projects => {
    return{
        type:types.SET_PROJECTS_BY_TEAMS,
        payload:projects
    }
}

export const setProject = project => {
    return{
        type: types.SET_PROJECT,
        payload: project
    }
}

export const setProjectsByUser = projects =>{
    return{
        type: types.SET_PROJECTS_BY_USER,
        payload: projects
    }
}