import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux'
//import {logout} from '../../services'

// Higher Order Component || HOC
const PrivateRoute = props => {
    const { Component } = props;
    if(window.localStorage.getItem('accessToken') === null || window.localStorage.getItem('accessToken') === '' ) {
        return (
        <Redirect to="/" />
        )
    }
    return (
    <Route exact={props.exact} path={props.path} render={(routerprops) =>{
        const handleFormSubmit = (e) => {
            e.preventDefault();
            console.log('DDDDDDD')
            
            console.log(routerprops)

            window.localStorage.removeItem('accessToken');   
            window.localStorage.removeItem('refreshToken');
            

            routerprops.history.push('/')
             

        }

       return(    
        <div>
            <form  onSubmit={handleFormSubmit}>
                <input type="submit" value="Logout" className='le-btn'/>    
            </form> 
            
            <Component {...props} />
        </div>
        )
    }
    }
    />
    )
}

const mapStateToProps = (state) => {

}
    

        

export default connect()(PrivateRoute);