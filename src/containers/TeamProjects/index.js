import React, { Component } from 'react'
import { connect } from 'react-redux';
import SingleProject from "../../components/SingleProject";
import StyledLink from '../../components/elements/Link';
import projectsRedux from '../../redux/projects';
import Title from '../../components/elements/Title';
import LoadingSpinner from '../../components/elements/LoadingSpinner';
import { PlusIcon } from '../../components/elements/Icons';
import { Flex } from './styled';

class TeamProjects extends Component {
    state = {
        id: '',
    }

    componentDidMount() {
        console.log("PARAMS ID : ", this.props.computedMatch.params.id)
        let idTeam = this.props.computedMatch.params.id
        if(this.props.projects.teamProjects.length < 1 && !this.props.isLoading){
            this.props.getProjects(idTeam)
        }

    }

    render() {
        let projects = this.props.projects.teamProjects  //getting the array so the map function doesn't have a bunch of props
        console.log("TEAMS: ", this.props.teams.teams);
        console.log("PROJECTS: ",projects)
        if (this.props.isLoading) {
            return <LoadingSpinner/>
        }

        if (projects === 0) {
            return (
                <div>
                    <h2>No projects</h2>
                    <StyledLink to={`/teams/${this.props.computedMatch.params.id}/projects/create`}>Create a project</StyledLink>
                </div>
            )
        }

        return (
            <div>
                <Flex>
                <Title>TEAM</Title> <StyledLink to={`/teams/${this.props.computedMatch.params.id}/projects/create`}><PlusIcon /></StyledLink>
                </Flex>
                {projects.map((item, index)=>
                    <SingleProject  key={index} teamId={this.props.computedMatch.params.id} id={item.project.id} name={item.project.name} description={item.project.description}/>
                )}
                
                <hr />
                <StyledLink to="/dashboard">Back to Dashboard</StyledLink>
            </div>
        )
    }
}

const mapDispatchToProps = {
    getProjects: projectsRedux.thunks.getTeamProjects,
}

const mapStateToProps = state => ({
    projects: state.projects,
    teams: state.teams,
    isLoading: state.global.isLoading,
    isAuthenticated: state.user.isAuthenticated,
    authenticationError: state.user.authenticationError,
    authenticationErrorMessage: state.user.authenticationErrorMessage,
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamProjects)