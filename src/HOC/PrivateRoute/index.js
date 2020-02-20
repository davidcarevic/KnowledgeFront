import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import  {connect} from 'react-redux'
import userRedux from '../../redux/user';
import SideBar from '../../containers/SideBar';
import LoadingSpinner from '../../components/elements/LoadingSpinner';

const PrivateRoute = props => {
    const { Component } = props;
    if(props.isLoading) {
        return <LoadingSpinner/>
    }
    if(!props.isAuthenticated && !props.isLoading) {
        console.log("Auth ga kikuje");
        return (
        <Redirect to="/" />
        )
    }
    return (
    <Route exact={props.exact} path={props.path} render={(...routerprops)  =>{
    return(
      <div>
          <Component {...props}/>
          <SideBar />
      </div>
      )
    }}
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
