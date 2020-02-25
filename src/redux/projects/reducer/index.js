import * as types from '../actions/types'
import { SET_PROJECTS_BY_TEAMS } from "../actions/types";

const initialState = {
    projects: [],
    teamProjects: [],
    project: {},
    sections: [],
    categories: [],
    elements: []
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SET_PROJECTS_BY_TEAMS:
            return {
                ...state,
                teamProjects: action.payload
            }
        case types.SET_PROJECT:
            return {
                ...state,
                project: action.payload
            }
        case types.SET_PROJECTS_BY_USER:
            return {
                ...state,
                projects: action.payload
            }
        case types.GET_PROJECT:
            return {
                ...state,
                project: action.payload
            }
        case types.GET_PROJECT_SECTIONS:
            return {
                ...state,
                sections: action.payload
            }
        case types.GET_SECTION_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }
        case types.GET_CATEGORY_ELEMENTS:
            return {
                ...state,
                elements: action.payload
            }
        default:
            return state;
    }
}