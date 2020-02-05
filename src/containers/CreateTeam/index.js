import React, { Component } from 'react';
import {createTeam} from '../../services';

var jwtDecode = require('jwt-decode');

class CreateTeam extends Component {
    state = {
        name: '',
        description:'',
    }
    componentDidMount() {
        // let token=window.localStorage.getItem('accessToken')
        // console.log(token)
        // let decoded=jwtDecode(token)
        // console.log(decoded)
        // this.setState({userId:decoded.user_id})
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const {name,description,userId} = this.state;
        console.log(this.state)
            createTeam(name,description)
                .then(res => console.log(res))
                .catch(err => console.log(err.message))
        }
    render(){
        const {name,description} = this.state;
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>Create your team!</h1>
                    <p>Team name : <input id="name" type="text" value={name} onChange={this.handleInputChange} /></p>
                    <p>Description : <input id="description" type="text" value={description} onChange={this.handleInputChange} /></p>
                    <p><button  type="submit">Create</button></p>
                </form>
            </div>
        )
    }
}
export default CreateTeam