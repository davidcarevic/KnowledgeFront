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
        project: '',
        projectId:'',
        teamId:''
    }

    componentDidMount() {
        if(!this.props.isLoading && this.props.computedMatch.params.id) {
            console.log("id projekta", this.props.computedMatch.params.id)
            this.setState({projectId: this.props.computedMatch.params.id})
        }
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { email, team, project, projectId, teamId } = this.state;
        let data={};
        if(projectId){
            data = {
                project: projectId
            }
        }
        else if(teamId){
            data = {
                team: teamId
            }
        }
        else {
            data = {
                team: team,
                project: project
            }
        }
        //const {history } = this.props
            console.log(" email i data : ",email,data)
            this.props.inviteUser(email,data)
    }

    render() {
        const { email, team , project, projectId } = this.state;
        if(projectId){
            return (
                <Form onSubmit={this.handleFormSubmit}>
                    <Title> Invite a person to join this project</Title>
                    <Input id="email" placeholder="EMAIL" type="email" value={email} onChange={this.handleInputChange} /><br/><br/>
                    <Button  type="submit">INVITE THIS EMAIL</Button><hr/>
                    <StyledLink to="/dashboard">Back to Dashboard</StyledLink>
                </Form>
            )

        }
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
    invite: state.invite,
    isLoading:state.isLoading
})

export default connect(mapStateToProps, mapDispatchToProps)(InviteUser)