import React, { Component } from 'react'
import { connect } from 'react-redux';
import SingleTeam from "../../components/SingleTeam";
import teamsRedux from '../../redux/teams';
import projectsRedux from '../../redux/projects';
import SingleProject from "../../components/SingleProject";
import Title from '../../components/elements/Title';
import Add from '../../components/elements/AddButton';
import TeamHolder from '../../components/blocks/TeamHolder';
import ProjectHolder from '../../components/blocks/ProjectHolder';
import Team from '../../components/elements/Team';
import Project from '../../components/elements/Project';
import LoadingSpinner from "../../components/elements/LoadingSpinner";
import StyledLink from '../../components/elements/Link';

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
            return <LoadingSpinner/>
        }
        if (teams === 0 && projects === 0) {
            return(
            <div>
                <Title>
               No teams and projects
                </Title>
                <StyledLink to="/dashboard/teams/create">Create a team</StyledLink>
                <br/>
                <StyledLink to="/dashboard/projects/create">Create a project</StyledLink>
                <br/>
                <StyledLink to="/invite">Invite a person</StyledLink>
            </div>
            )
        }
        return (
            <div>
                <TeamHolder>
                    <h3>Teams</h3>
                    {!teams ? <div>No teams</div> : teams.map((item) =>
                    <Team key={item.team.id}>
                    <SingleTeam key={item.team.id} id={item.team.id} name={item.team.name} description={item.team.description}/>
                    </Team>
                    )}
                    <StyledLink to="/dashboard/teams/create"><Add>+</Add></StyledLink>
                </TeamHolder>
                <ProjectHolder>
                    <h3>Projects</h3>
                    {!projects ? <div>No projects</div> : projects.map((item) =>
                    <Project key={item.project.id}>
                        <SingleProject key={item.project.id} id={item.project.id} name={item.project.name} description={item.project.description}/>
                    </Project>
                )}
                    <StyledLink to="/dashboard/projects/create"><Add>+</Add></StyledLink>
                </ProjectHolder>
                <hr/><StyledLink to="/invite">Invite a person</StyledLink>
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