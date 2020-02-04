import axios from 'axios';
import store from '../redux/configureStore';

const instance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:8000/',
});

instance.interceptors.request.use(config => {
    if(!config.headers.common.Authorization) {
        config.headers.common.Authorization = `Bearer ${store.getState().user.accessToken}`
    }
    return config;
});

export default instance;