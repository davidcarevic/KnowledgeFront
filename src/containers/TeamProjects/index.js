import React, { Component } from 'react'
import { connect } from 'react-redux';
import SingleTeam from "../../components/SingleTeam";
import {Link} from "react-router-dom";
import teamsRedux from '../../redux/teams';

class TeamProjects extends Component {
    state={
        id:''
    }
    componentDidMount() {
        console.log("PARAMS ID : ",this.props.computedMatch.params.id)
        this.setState({id:this.props.computedMatch.params.id})
        console.log("id tima ",this.state)
        var len=this.props.teams.teams.length
        console.log("duzina",len)
        if(len<1) {
            this.props.getTeams()
        }
    }
    render(){
        let teams=this.props.teams.teams  //getting the array so the map function doesn't have a bunch of props
        console.log("TEAMS: ", this.props.teams.teams);
        if(this.props.isLoading) {
            return <div>Loading...</div>
        }
        if(teams===0){
            return(
                <div>
                    <h2>No teams</h2>
                    <Link to="/teams/create">Create a team</Link>
                </div>
            )
        }
        return (
            <div>
                {teams.map((item)=>
                    <SingleTeam  key={item.team.id} id={item.team.id} name={item.team.name} description={item.team.description}/>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(TeamProjects)