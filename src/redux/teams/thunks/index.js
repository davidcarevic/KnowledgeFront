import {getTeamsByUser,createTeam} from "../../../services";
import {setTeamsByUser,setTeam} from "../actions";
import {isLoading} from "../../global/actions";

export const getTeams =()=> dispatch =>{
    dispatch(isLoading(true));
    getTeamsByUser()
        .then(res=>{
            console.log("res teamova,",res.data)
            if(res.data.length===0){res.data=0}
            dispatch(setTeamsByUser(res.data));
            dispatch(isLoading(false));
            console.log(res)
        })
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
            })


}

export const teamCreation = (name,description) => dispatch =>{
    dispatch(isLoading(true));
    createTeam(name,description)
        .then(res=>{
            console.log("team created : ",res.data)
            dispatch(setTeam(res.data))
            dispatch(isLoading(false));
        })
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
        })

}

