import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import  {connect} from 'react-redux'
import userRedux from '../../redux/user';
import LogoutButton from "../../components/elements/NavButtons";
import SideBarTop from "../../components/blocks/SideBarTop";
import BottomButton from "../../components/elements/BottomButton";
import LoadingSpinner from '../../components/elements/LoadingSpinner'


const PrivateRoute = props => {
    const { Component } = props;
    if(props.isLoading) {
        return <LoadingSpinner/>
    }
    if(!props.isAuthenticated && !props.isLoading) {
        console.log("HOC kick : activated");
        return (
        <Redirect to="/"/>
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
            <SideBarTop>
                <form onSubmit={handleFormSubmit}>
                    <LogoutButton primary type="submit">L</LogoutButton>
                    <BottomButton primary >L</BottomButton>
                </form>
            </SideBarTop>
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