import React, { Component } from 'react'
import { connect } from 'react-redux';
 import SingleTeam from "../../components/SingleTeam";
import {getTeamsByUser} from "../../services"
import {Link} from "react-router-dom";

class Teams extends Component {
    componentDidMount() {
        console.log('dashboard did mount')
        if(!this.props.isLoading && this.props.isAuthenticated && !this.props.authenticationError) {
            console.log(this.props.teams)

        }

    }
    render(){
        if(this.props.isLoading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                {this.props.teams.map((item)=> <SingleTeam key={item.team.id} id={item.team.id}  name={item.team.name} description={item.team.description}/>)}
                <Link to="/teams/create">Create a team</Link>
            </div>
        )
    }
}

const mapDispatchToProps ={

}

const mapStateToProps = state => ({
    teams:'',
    isLoading: state.global.isLoading,
    isAuthenticated: state.user.isAuthenticated,
    authenticationError: state.user.authenticationError,
    authenticationErrorMessage: state.user.authenticationErrorMessage,
})

export default connect(mapStateToProps, null)(Teams)