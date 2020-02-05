import {getTeamsByUser as getTeamsAxios} from "../../../services";
import axios from "../../../axios";
import {isLoading} from "../../global/actions";
import {getTeamsByUser as getTeams} from "../actions"


export const getTeamsByUser= () => dispatch =>{


    console.log('Usao u getTeamsByUser')
    dispatch(isLoading(true));
    getTeamsAxios() ()
        .then(res=>{
            dispatch(getTeams(res.data.teams))
        })
        .catch(err=> console.log(err))
}