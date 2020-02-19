import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title'

class CreateProject extends Component {
    state = {
        name: '',
        description: '',
    }
    componentDidMount() {
        console.log("ID : ", this.props.computedMatch.params.id);
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props
        const { name, description } = this.state;
        this.props.createProject(name, description, this.props.computedMatch.params.id)
        history.push("/dashboard")
    }

    render() {
        const { name, description } = this.state;
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <Title>CREATE YOUR PROJECT!</Title>
                    <p> <input id="name" placeholder="PROJECT NAME" type="text" value={name} onChange={this.handleInputChange} /></p>
                    <p><textarea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /></p>
                    <p><Button type="submit">CREATE PROJECT</Button></p>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = {
    createProject: projectRedux.thunks.projectCreation
}

const mapStateToProps = state => ({
    teams: state.teams,
    team: state.team,
    projects: state.projects,
    project: state.project
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateProject))