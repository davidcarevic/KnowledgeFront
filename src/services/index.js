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

// export const getRefresh = () =>{
//
// }

export const register = (email, password) => {
  console.log("usao u reg")
  return axios.post('/api/users/',{
     password:password, email:email
  }).catch(err => console.log(err.message))
}

export const getTeamsByUser = () => {
    console.log()
    return axios.get('/api/users-teams/')
        .catch(err=>console.log(err.message))
}

export const createTeam = (name,description) =>{
    return axios.post('/api/teams/',{
        name:name,
        description:description,
        })
        .catch(err=>console.log(err.message))
}