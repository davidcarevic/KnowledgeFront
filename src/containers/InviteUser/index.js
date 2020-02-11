import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';

class InviteUser extends Component {
    state = {
        email: '',
        team:'',
        project:''
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { email,team,project } = this.state;
        var data={
            team:team
        }
        //const {history } = this.props
            console.log(" email i data : ",email,data)
            this.props.inviteUser(email,data)
    }
    render() {
        const { email,team } = this.state;
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <h1> Invite a person to join a team or the app.</h1>
                    <p>Email : <input id="email" type="text" value={email} onChange={this.handleInputChange} /></p>
                    <p>Team : <input id="team" type="text" value={team} onChange={this.handleInputChange}/></p>
                    <p><button  type="submit">Invite this email</button></p>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps={
    inviteUser:userRedux.thunks.userInvite
}
const mapStateToProps=state=>({
    invite:state.invite
})

export default connect(mapStateToProps,mapDispatchToProps)(InviteUser)