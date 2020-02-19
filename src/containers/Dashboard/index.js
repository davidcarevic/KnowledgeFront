import React, { Component } from 'react'
import { connect } from 'react-redux';
import SingleTeam from "../../components/SingleTeam";
import { Link } from "react-router-dom";
import teamsRedux from '../../redux/teams';
import projectsRedux from '../../redux/projects';
import SingleProject from "../../components/SingleProject";
import Title from '../../components/elements/Title';
import Add from '../../components/elements/AddButton';
import TeamHolder from '../../components/blocks/TeamHolder';
import ProjectHolder from '../../components/blocks/ProjectHolder';
import Team from '../../components/elements/Team';
import Project from '../../components/elements/Project';

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
        console.log("PROJECTS: ", this.props.projects.projects)
        if (this.props.isLoading) {
            return <div>Loading...</div>
        }
        if (teams === 0 && projects === 0) {
            return(
            <div>
                <Title>
               No teams and projects
                </Title>
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
                <TeamHolder>
                    <Title>
                        TEAMS
                    </Title>
                    {!teams ? <div>No teams</div> : teams.map((item) =>
                    <Team key={item.team.id}>
                    <SingleTeam key={item.team.id} id={item.team.id} name={item.team.name} description={item.team.description}/>
                    </Team>
                    )}
                    <Link to="/dashboard/teams/create"><Add>+</Add></Link>
                </TeamHolder>
                <ProjectHolder>
                    <Title>
                    PROJECTS
                    </Title>
                    {!projects ? <div>No projects</div> : projects.map((item) =>
                    <Project key={item.project.id}>
                        <SingleProject key={item.project.id} id={item.project.id} name={item.project.name} description={item.project.description}/>
                    </Project>
                )}
                    <Link to="/dashboard/projects/create"><Add>+</Add></Link>
                </ProjectHolder>
                <Link to="/invite"><Title>Invite a person</Title></Link>
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