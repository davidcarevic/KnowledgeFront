import * as types from './types';

export const setProjectsByTeam = teamProjects => {
    return {
        type:types.SET_PROJECTS_BY_TEAMS,
        payload: teamProjects
    }
}

export const setProject = project => {
    return {
        type: types.SET_PROJECT,
        payload: project
    }
}

export const setProjectsByUser = projects => {
    return {
        type: types.SET_PROJECTS_BY_USER,
        payload: projects
    }
}

export const getProject = project => {
    return {
        type: types.GET_PROJECT,
        payload: project
    }
}