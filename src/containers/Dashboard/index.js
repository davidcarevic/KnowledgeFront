import React, { Component } from 'react'
import { connect } from 'react-redux';
import SingleTeam from "../../components/SingleTeam";
import teamsRedux from '../../redux/teams';
import projectsRedux from '../../redux/projects';
import SingleProject from "../../components/SingleProject";
import Title from '../../components/elements/Title';
import SideHolder from '../../components/blocks/SideHolder';
import MainHolder from '../../components/blocks/MainHolder';
import Team from '../../components/elements/Team';
import Project from '../../components/elements/Project';
import LoadingSpinner from "../../components/elements/LoadingSpinner";
import StyledLink from '../../components/elements/Link';
import { Flex, H2 } from "./styled";
import { PlusIcon, UserPlusIcon } from '../../components/elements/Icons';
import { Header } from "../../components/blocks/HeaderHolder";

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
        this.props.unsetProjectsByTeam([])
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
                <Header>
                <Title>
               No teams and projects
                </Title>
                </Header>
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
                <Header>
                    <H2>Dashboard</H2>
                </Header>
                <SideHolder top={"15%"}>
                    <Flex>
                        <h3>Teams</h3>
                        <Flex right>
                            <StyledLink to="/dashboard/teams/create"><PlusIcon top={'15px'}/></StyledLink>
                            <StyledLink to="/invite"><UserPlusIcon top={'15px'}/></StyledLink>
                        </Flex>
                    </Flex>
                    
                    {!teams ? <div>No teams</div> : teams.map((item, index) =>
                    <Team key={index}>
                    <SingleTeam key={index} id={item.team.id} name={item.team.name} description={item.team.description}/>
                    </Team>
                    )}
                </SideHolder>
                <MainHolder top={"14%"}>
                    <Flex>
                        <h3>Projects</h3>
                        <Flex right>
                            <StyledLink to="/dashboard/projects/create"><PlusIcon top={'15px'}/></StyledLink>
                        </Flex>
                    </Flex>
                    {!projects ? <div>No projects</div> : projects.map((item) =>
                    <Project key={item.project.id}>
                        <SingleProject key={item.project.id} id={item.project.id} name={item.project.name} description={item.project.description} image={item.project.data.image}/>
                    </Project>
                )}
                    
                
                </MainHolder>
            </div>
        )
    }
}
const mapDispatchToProps = {
    getTeams: teamsRedux.thunks.getTeams,
    getProjects: projectsRedux.thunks.getProjectsForUser,
    unsetProjectsByTeam:projectsRedux.actions.setProjectsByTeam
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