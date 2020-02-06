import * as types from '../actions/types'

const initialState = {
    teams:[]
};

export default (state = initialState,action) =>{
    switch(action.type){
        case types.SET_TEAMS_BY_USER:
            return {
                ...state,
                teams:action.payload
            }



        default:
            return state;
    }
}