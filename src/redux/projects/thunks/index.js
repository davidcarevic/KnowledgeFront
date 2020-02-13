import {createProject, getProjects, getProjectsByUser} from "../../../services";
import {setProjectsByTeam,setProjectsByUser} from "../actions";
import {isLoading} from "../../global/actions";


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

export const getProjectsForUser = () => dispatch => {
    dispatch(isLoading(true));
    getProjectsByUser()
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