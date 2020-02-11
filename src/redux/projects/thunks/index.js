import { createProject,getProjects} from "../../../services";
import {setProject, setProjectsByTeam} from "../actions";
import {isLoading} from "../../global/actions";
import {setTeam, setTeamsByUser} from "../../teams/actions";

export const getTeamProjects =(id) => dispatch =>{
    dispatch(isLoading(true));
    getProjects(id)
        .then(res=>{
            console.log("res projekata,",res.data)
            if(res.data.length===0){res.data=0}
            dispatch(setProjectsByTeam(res.data));
            dispatch(isLoading(false));
            console.log(res)
        })
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const projectCreation = (name,description,teamId) => dispatch =>{
    dispatch(isLoading(true));
    createProject(name,description,teamId)
        .then(res=>{
            console.log("project created : ",res.data)
            dispatch(setProject(res.data))
            dispatch(isLoading(false));
        })
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
        })

}