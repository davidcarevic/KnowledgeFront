import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input'
import StyledLink from '../../components/elements/Link';

class InviteUser extends Component {
    state = {
        email: '',
        team: '',
        project: ''
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { email, team, project } = this.state;
        var data = {
            team: team,
            project:project
        }
        //const {history } = this.props
            console.log(" email i data : ",email,data)
            this.props.inviteUser(email,data)
    }

    render() {
        const { email, team , project } = this.state;
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <Title> Invite a person to join a team or the app.</Title>
                <Input id="email" placeholder="EMAIL" type="email" value={email} onChange={this.handleInputChange} /><br/><br/>
                <Input id="team" placeholder="Team ID" type="text" value={team} onChange={this.handleInputChange}/><br/><br/>
                <Input id="project" placeholder="Project ID"  type="text" value={project} onChange={this.handleInputChange}/><br/><br/>
                <Button  type="submit">INVITE THIS EMAIL</Button><hr/>
                <StyledLink to="/dashboard">Back to Dashboard</StyledLink>
            </Form>
        )
    }
}

const mapDispatchToProps = {
    inviteUser: userRedux.thunks.userInvite
}

const mapStateToProps = state => ({
    invite: state.invite
})

export default connect(mapStateToProps, mapDispatchToProps)(InviteUser)