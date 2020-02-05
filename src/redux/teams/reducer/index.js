import * as types from '../actions/types'
import {GET_TEAMS_BY_USER} from "../actions/types";
const initialState = {
    teams:''
}
export default (state =initialState,action)=>{
    switch(action.type){
        case GET_TEAMS_BY_USER:
            return{
                ...state,
                teams:action.payload
            }
        default:
            return state
    }
}