import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import  {connect} from 'react-redux'
import userRedux from '../../redux/user';
import LogoutButton from "../../components/elements/NavButtons"
import SideBar from "../../components/blocks/SideBar"

const PrivateRoute = props => {
    const { Component } = props;
    if(props.isLoading) {
        return <div>Loading...</div>
    }
    if(!props.isAuthenticated && !props.isLoading) {
        console.log("OVDE");
        return (
        <Redirect to="/" />
        )
    }
    return (
    <Route exact={props.exact} path={props.path} render={(...routerprops)  =>{
        const handleFormSubmit = (e) => {
            e.preventDefault();
             props.logout()
            // routerprops.history.push('/')
        }
       return(    
        <div>
            <Component {...props}/>
            <SideBar>
                <form  onSubmit={handleFormSubmit}>
                    <LogoutButton primary type="submit">L</LogoutButton>
                </form>
            </SideBar>
        </div>
        )
    }
    }
    />
    )
}

const mapStateToProps = state => {
    return {
        teams:state.teams,
        user:state.user,
        isLoading: state.global.isLoading,
        isAuthenticated: state.user.isAuthenticated,
        authenticationError: state.user.authenticationError,
        authenticationErrorMessage: state.user.authenticationErrorMessage,
    }
}

const mapDispatchToProps={
    logout:userRedux.thunks.logout
}
        

export default connect(mapStateToProps,mapDispatchToProps)(PrivateRoute);