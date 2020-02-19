import React, { Component } from 'react';
import { connect } from 'react-redux';
import teamRedux from '../../redux/teams'
import { withRouter } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';
import StyledLink from '../../components/elements/Link';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import TextArea from '../../components/elements/TextArea';

class CreateTeam extends Component {
    state = {
        name: '',
        description: '',
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props
        console.log(history)
        const { name, description } = this.state;
        this.props.createTeam(name, description);
        history.push("/dashboard");
        }

    render() {
        const { name, description } = this.state;
        return (
        <Form onSubmit={this.handleFormSubmit}>
            <Title>CREATE YOUR TEAM!</Title>
            <Input id="name" placeholder="TEAM NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
            <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
            <Button type="submit">CREATE</Button><hr/>
            <StyledLink to="/dashboard">Back to Dashboard</StyledLink>
        </Form>
        )
    }
}

const mapDispatchToProps = {
    createTeam: teamRedux.thunks.teamCreation
}

const mapStateToProps = state => ({
    teams: state.teams,
    team: state.team
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTeam))