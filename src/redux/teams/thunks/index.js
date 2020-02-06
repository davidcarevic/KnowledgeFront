import {getTeamsByUser} from "../../../services";
import {setTeamsByUser} from "../actions";
import {isLoading} from "../../global/actions";

export const getTeams =()=> dispatch =>{
    dispatch(isLoading(true));
    getTeamsByUser()
        .then(res=>{
            dispatch(setTeamsByUser(res.data));
            dispatch(isLoading(false));
            console.log(res)

        })
        .catch(err=>{
            console.log(err.message)
            })


}

