import axios from '../axios';
import { Route } from 'react-router-dom';
import { render } from '@testing-library/react';

export const getToken = (email, password) => {
    console.log("asdasdasds")
      return axios.post('/api/token/', {
          email,
          password
        })
}

export const getRefresh = () =>{
    return axios.post('/api/token/refresh/',{
        refresh:window.localStorage.getItem("refreshToken")
    })
}

export const register = (email, password) => {
  console.log("usao u reg")
  return axios.post('/api/users/',{
     password:password, email:email
  })
}

export const getTeamsByUser = () => {
    return axios.get('/api/users-teams/')
}

export const createTeam = (name,description) =>{
    return axios.post('/api/teams/',{
        name:name,
        description:description,
        })
}