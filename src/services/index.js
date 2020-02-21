import axios from '../axios';

export const getToken = (email, password) => {
      return axios.post('/api/token/', {
          email,
          password
        })
}

export const removeToken = () => {
    return true
}

export const getRefresh = () =>{
    return axios.post('/api/token/refresh/', {
        refresh: window.localStorage.getItem("refreshToken")
    })
}

export const register = (email, password, data) => {
  return axios.post('/api/users/', {
     email: email,
     password: password,
     data: data
  })
}

export const getTeamsByUser = () => {
    return axios.get('/api/teams/')
}

export const createTeam = (name, description) => {
    return axios.post('/api/teams/', {
        name: name,
        description: description,
    })
}

export const getProjects = (id) => {
    return axios.get('/api/teams/' + id + '/')
}

export const getProjectsByUser = () => {
    return axios.get('/api/user-projects/')
}

export const getSingleProject = (id) => {
    return axios.get('/api/projects/' + id + '/')
}

export const createProject = (name, description, teamID) => {
    return axios.post('/api/projects/', {
        name: name,
        description: description,
        teamID: teamID
    })
}

export const inviteUser = (email, data) => {
    return axios.post('/api/email-invitations/', {
        email: email,
        data: data
    })
}

export const getInvitedUser = (guid) => {
    return axios.get('/api/email-invitations/' + guid + '/')
}

export const resetPass = (email) => {
    return axios.post('/api/password-reset/', {
        email:email
    })
}

export const getResetPassForUser = (guid) => {
    return axios.get('/api/password-reset/'+ guid + '/')
}

export const destroyResetAndUpdatePass = (guid, password, data) => {
    return axios.put('/api/password-reset/'+ guid +'/',{
        guid: guid,
        password: password,
        data: data
    })
}

export const getProjectSections = (id) => {
    return axios.get('/api/project-sections/' + id + '/')
}