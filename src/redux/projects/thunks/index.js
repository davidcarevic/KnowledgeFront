import {getProjects} from "../../../services";
import {setProjectsByTeam} from "../actions";
import {isLoading} from "../../global/actions";
import {setTeamsByUser} from "../../teams/actions";

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