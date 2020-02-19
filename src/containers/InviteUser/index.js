import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';

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
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <Title> Invite a person to join a team or the app.</Title>
                    <p><input id="email" placeholder="EMAIL" type="email" value={email} onChange={this.handleInputChange} /></p>
                    <p><input id="team" placeholder="Team ID" type="text" value={team} onChange={this.handleInputChange}/></p>
                    <p><input id="project" placeholder="Project ID"  type="text" value={project} onChange={this.handleInputChange}/></p>
                    <p><Button  type="submit">INVITE THIS EMAIL</Button></p>
                </form>
            </div>
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