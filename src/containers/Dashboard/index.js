import React, { Component } from 'react'
import { connect } from 'react-redux';
import SingleTeam from "../../components/SingleTeam";
import { Link } from "react-router-dom";
import teamsRedux from '../../redux/teams';
import projectsRedux from '../../redux/projects';
import SingleProject from "../../components/SingleProject";

class Dashboard extends Component {
    componentDidMount() {
        console.log("timovi na ulazu", this.props.teams.teams)
        var len = this.props.teams.teams.length
        if(len < 1 && !this.props.isLoading) {
            this.props.getTeams()
        }
        var len1 = this.props.projects.projects.length
        if(len1 < 1 && !this.props.isLoading){
            this.props.getProjects()
        }
    }
    render(){
        let teams = this.props.teams.teams  //getting the array so the map function doesn't have a bunch of props
        let projects = this.props.projects.projects
        console.log("TEAMS: ", this.props.teams.teams);
        console.log("PROJECTS: ",this.props.projects.projects)
        if (this.props.isLoading) {
            return <div>Loading...</div>
        }
        if (teams === 0 && projects === 0){
            return(
            <div>
               <h2>No teams and projects</h2>
                <Link to="/dashboard/teams/create">Create a team</Link>
                <br/>
                <Link to="/dashboard/projects/create">Create a project</Link>
                <br/>
                <Link to="/invite">Invite a person</Link>
            </div>
            )
        }
        return (
            <div>
                <h2>TEAMS:</h2>
                {!teams?<div>No teams</div>:teams.map((item)=>
                    <div key={item.team.id}>
                    <SingleTeam key={item.team.id} id={item.team.id} name={item.team.name} description={item.team.description}/>
                    </div>
                    )}
                    <h2>PROJECTS:</h2>
                {!projects?<div>No projects</div>:projects.map((item)=>
                    <div key={item.project.id}>
                        <SingleProject key={item.project.id} id={item.project.id} name={item.project.name} description={item.project.description}/>
                    </div>
                )}

                <Link to="/dashboard/teams/create">Create a team</Link>
                <br/>
                <Link to="/dashboard/projects/create">Create a project</Link>
                <br/>
                <Link to="/invite">Invite a person</Link>
            </div>
        )
    }
}
const mapDispatchToProps = {
    getTeams: teamsRedux.thunks.getTeams,
    getProjects: projectsRedux.thunks.getProjectsForUser
}
const mapStateToProps = state => ({
    teams: state.teams,
    projects: state.projects,
    isLoading: state.global.isLoading,
    isAuthenticated: state.user.isAuthenticated,
    authenticationError: state.user.authenticationError,
    authenticationErrorMessage: state.user.authenticationErrorMessage,
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)