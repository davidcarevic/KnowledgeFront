import * as types from '../actions/types'

const initialState = {
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}