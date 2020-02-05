import * as types from '../actions/types'

const initialState = [];

export default (state = initialState,action) =>{
    switch(action.type){
        case types.SET_TEAMS_BY_USER:
            return [
                ...action.payload
            ]
        default:
            return state;
    }
}