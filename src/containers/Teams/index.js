import React, { Component } from 'react'
import { connect } from 'react-redux';
 import SingleTeam from "../../components/SingleTeam";
import {getTeamsByUser} from "../../services"
import {Link} from "react-router-dom";
import teamsRedux from '../../redux/teams';

class Teams extends Component {
    componentDidMount() {
        if(this.props.teams.length < 1) {
            this.props.getTeams()
        }

    }
    render(){
        console.log("TEAMS: ", this.props.teams);
        if(this.props.isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                {this.props.teams.map((item)=><SingleTeam key={item.team.id} id={item.team.id} name={item.team.name} description={item.team.description}/> )}
                <Link to="/teams/create">Create a team</Link>
            </div>
        )
    }
}
const mapDispatchToProps ={
    getTeams:teamsRedux.thunks.getTeams
}
const mapStateToProps = state => ({
    teams:state.teams,
    isLoading: state.global.isLoading,
    isAuthenticated: state.user.isAuthenticated,
    authenticationError: state.user.authenticationError,
    authenticationErrorMessage: state.user.authenticationErrorMessage,

})
export default connect(mapStateToProps, mapDispatchToProps)(Teams)