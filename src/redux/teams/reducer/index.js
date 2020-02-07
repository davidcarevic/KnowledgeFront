import * as types from '../actions/types'

const initialState = {
    teams:[],
    team:{}
};

export default (state = initialState,action) =>{
    switch(action.type){
        case types.SET_TEAMS_BY_USER:
            return {
                ...state,
                teams:action.payload
            }
        case types.REMOVE_TEAMS_BY_USER:
            return{
                ...state,
                teams:action.payload
            }
        case types.SET_TEAM:
            return{
                ...state,
                team:action.payload
            }



        default:
            return state;
    }
}