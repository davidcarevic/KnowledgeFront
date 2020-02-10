import * as types from '../actions/types'
import {SET_PROJECTS_BY_TEAMS} from "../actions/types";

const initialState = {
    projects:[],

};

export default (state =initialState,action)=>{
    switch(action.type){
        case SET_PROJECTS_BY_TEAMS:{
            return{
                ...state,
                projects:action.payload
            }

        }
        default:
            return state;
    }
}