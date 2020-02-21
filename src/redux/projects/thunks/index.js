import { createProject, getProjects, getProjectsByUser, getSingleProject } from "../../../services";
import { setProjectsByTeam, setProjectsByUser, getProject } from "../actions";
import { isLoading } from "../../global/actions";


export const getTeamProjects = (id) => dispatch => {
    dispatch(isLoading(true));
    getProjects(id)
        .then(res => {
            console.log("res projekata,", res.data)
            if(res.data.length === 0) {
                res.data = 0
            }
            dispatch(setProjectsByTeam(res.data));
            dispatch(isLoading(false));
            console.log(res)
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const projectCreation = (name, description, teamId) => dispatch =>{
    dispatch(isLoading(true));
    createProject(name, description, teamId)
        .then(res => {
        return getProjectsByUser()
    })
        .then(res => {
            dispatch(setProjectsByUser(res.data));
            dispatch(isLoading(false));
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const getProjectsForUser = (id) => dispatch => {
    dispatch(isLoading(true));
    getProjectsByUser(id)
        .then(res => {
            if(res.data.length === 0) {
                res.data = 0;
            }
            dispatch(setProjectsByUser(res.data));
            dispatch(isLoading(false));
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const retrieveProject = (id) => dispatch => {
    dispatch(isLoading(false));
    getSingleProject(id)
    .then(res => {
        console.log('Single project: ', res.data)
        dispatch(getProject(res.data))
        dispatch(isLoading(false));
    })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
    })
}