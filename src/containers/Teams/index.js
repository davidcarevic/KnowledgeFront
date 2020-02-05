import React, { Component } from 'react'
import { connect } from 'react-redux';
 import SingleTeam from "../../components/SingleTeam";
import {getTeamsByUser} from "../../services"
import {Link} from "react-router-dom";

class Teams extends Component {
    state={
        teams:[],
    };
    componentDidMount() {
        console.log('dashboard did mount')
        if(!this.props.isLoading && this.props.isAuthenticated && !this.props.authenticationError) {
            getTeamsByUser()
                .then((res) => {
                    let teams = res.data;
                    this.setState({ teams: res.data})
                    console.log(teams);
                })
                .catch(err => {
                    console.log(err.message);
                })
        }

    }
    render(){
        if(this.props.isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                {this.state.teams.map((item)=> <SingleTeam key={item.team.id} id={item.team.id}  name={item.team.name} description={item.team.description}/>)}
                <Link to="/teams/create">Create a team</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isLoading: state.global.isLoading,
    isAuthenticated: state.user.isAuthenticated,
    authenticationError: state.user.authenticationError,
    authenticationErrorMessage: state.user.authenticationErrorMessage,
})

export default connect(mapStateToProps, null)(Teams)