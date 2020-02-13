import axios from 'axios';
import store from '../redux/configureStore';
import {getRefresh} from '../services';

const instance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:8000/',
});

instance.interceptors.request.use(config => {
    if(!config.headers.common.Authorization && store.getState().user.accessToken) {
        config.headers.common.Authorization = `Bearer ${store.getState().user.accessToken}`
    }
    return config;
},);
instance.interceptors.response.use( response => {
    return response
},error=>{
    axios.interceptors.response.eject();
    if(window.localStorage.getItem("refreshToken")) {
        getRefresh()
            .then(res => {
                instance.interceptors.request.use(config => {
                    config.headers.common.Authorization = `Bearer ${res.data.access}`
                    return config;
                });
            })
            .catch(err => console.log(err.message))
    }
    return error
})
export default instance;