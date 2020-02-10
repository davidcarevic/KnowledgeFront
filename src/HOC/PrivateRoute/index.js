import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import  {connect} from 'react-redux'
import userRedux from '../../redux/user';


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
            console.log('DDDDDDD',props)
           //  console.log(routerprops)
           //  window.localStorage.removeItem('refreshToken');
             props.logout()
            // routerprops.history.push('/')
        }
       return(    
        <div>
            <form  onSubmit={handleFormSubmit}>
                <input type="submit" value="Logout" className='le-btn'/>    
            </form>
            <Component {...props}/>
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