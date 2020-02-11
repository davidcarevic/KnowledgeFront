import React, { Component } from 'react'
import { connect } from 'react-redux';
import SingleProject from "../../components/SingleProject";
import {Link} from "react-router-dom";
import projectsRedux from '../../redux/projects';

class TeamProjects extends Component {
    state={
        id:''
    }
    componentDidMount() {
        console.log("PARAMS ID : ",this.props.computedMatch.params.id)
        var len=this.props.projects.projects.length
        console.log("Projekti", len)
        if(len<1) {
            this.props.getProjects(this.props.computedMatch.params.id)
        }
    }
    render(){
        let projects=this.props.projects.projects  //getting the array so the map function doesn't have a bunch of props
        console.log("TEAMS: ", this.props.teams.teams);
        if(this.props.isLoading) {
            return <div>Loading...</div>
        }
        if(projects===0){
            return(
                <div>
                    <h2>No projects</h2>
                    <Link to={`/teams/${this.props.computedMatch.params.id}/projects/create`}>Create a project</Link>
                </div>
            )
        }
        return (
            <div>
                {projects.map((item)=>
                    <SingleProject  key={item.project.id} teamId={this.props.computedMatch.params.id} id={item.project.id} name={item.project.name} description={item.project.description}/>
                )}
                <Link to={`/teams/${this.props.computedMatch.params.id}/projects/create`}>Create a project</Link>
            </div>
        )
    }
}
const mapDispatchToProps ={
    getProjects:projectsRedux.thunks.getTeamProjects
}
const mapStateToProps = state => ({
    projects:state.projects,
    teams:state.teams,
    isLoading: state.global.isLoading,
    isAuthenticated: state.user.isAuthenticated,
    authenticationError: state.user.authenticationError,
    authenticationErrorMessage: state.user.authenticationErrorMessage,
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamProjects)