import React, { Component } from 'react';
import { connect } from 'react-redux';

import teamRedux from '../../redux/teams'

var jwtDecode = require('jwt-decode');

class CreateTeam extends Component {
    state = {
        name: '',
        description:'',
    }
    componentDidMount() {
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const {name,description} = this.state;
        this.props.createTeam(name,description)
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


const mapDispatchToProps={
    createTeam:teamRedux.thunks.teamCreation
}
const mapStateToProps=state=>({
    teams:state.teams,
    team:state.team
})
export default connect(mapStateToProps,mapDispatchToProps)(CreateTeam)