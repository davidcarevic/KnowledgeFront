import { combineReducers } from "redux";
import userRedux from './user';
import globalRedux from './global';
import teamsRedux from './teams';
import projectsRedux from './projects'


export default combineReducers({
    user: userRedux.reducer,
    global: globalRedux.reducer,
    teams:teamsRedux.reducer,
    projects:projectsRedux.reducer
})