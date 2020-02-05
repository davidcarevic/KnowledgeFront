import { combineReducers } from "redux";
import userRedux from './user';
import globalRedux from './global';
import teamRedux from './teams'

export default combineReducers({
    user: userRedux.reducer,
    global: globalRedux.reducer,
    teams:teamRedux.reducer
})