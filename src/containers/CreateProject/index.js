import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
var jwtDecode = require('jwt-decode');


class CreateProject extends Component {
    state = {
        name: '',
        description:'',
    }
    componentDidMount() {

        console.log("ID : ",this.props.computedMatch.params.id);
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const {history } = this.props
        console.log(history)
        const {name,description} = this.state;
        this.props.createProject(name,description,this.props.computedMatch.params.id)
        history.push("/teams/"+this.props.computedMatch.params.id)
    }
    render(){
        const {name,description} = this.state;
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h1>Create your project!</h1>
                    <p>Project name : <input id="name" type="text" value={name} onChange={this.handleInputChange} /></p>
                    <p>Description : <textarea id="description" value={description} onChange={this.handleInputChange} /></p>
                    <p><button  type="submit">Create</button></p>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps={
    createProject:projectRedux.thunks.projectCreation
}
const mapStateToProps=state=>({
    teams:state.teams,
    team:state.team,
    projects:state.projects,
    project:state.project
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CreateProject))