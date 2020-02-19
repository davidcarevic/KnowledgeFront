import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import TextArea from '../../components/elements/TextArea';
import StyledLink from '../../components/elements/Link';

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
            <Form onSubmit={this.handleFormSubmit}>
                <Title>CREATE YOUR PROJECT!</Title>
                <Input id="name" placeholder="PROJECT NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
                <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
                <Button type="submit">CREATE PROJECT</Button><hr/>
            <StyledLink to="/dashboard">Back to Dashboard</StyledLink>
            </Form>
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