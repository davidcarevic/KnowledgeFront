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

export const removeToken=()=>{
    return true
}

export const getRefresh = () =>{
    return axios.post('/api/token/refresh/',{
        refresh:window.localStorage.getItem("refreshToken")
    })
}

export const register = (email, password) => {
  console.log("usao u reg")
  return axios.post('/api/users/',{
     email:email, password:password
  })
}

export const getTeamsByUser = () => {
    return axios.get('/api/teams/')
}

export const createTeam = (name,description) =>{
    return axios.post('/api/teams/',{
        name:name,
        description:description,
        })
}

export const getProjects=(id)=>{
    return axios.get('/api/teams/'+id+'/')
}