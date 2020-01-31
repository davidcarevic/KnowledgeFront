import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:8000/'
});

instance.interceptors.request.use(config => {
    if(!config.headers.common.Authorization) {
        if(window.localStorage.getItem('accessToken')) {
            config.headers.common.Authorization = `Bearer ${window.localStorage.getItem('accessToken')}`
        }
    }
    return config;
});

export default instance;