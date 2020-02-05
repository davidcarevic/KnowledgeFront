import { combineReducers } from "redux";
import userRedux from './user';
import globalRedux from './global';

export default combineReducers({
    user: userRedux.reducer,
    global: globalRedux.reducer
})