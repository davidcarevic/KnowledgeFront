import React, { Component } from 'react';
//import {register} from '../../services';


class Register extends Component {
    state = {
      email: '',
      password: '',
      password2:''
    }
  
    handleInputChange = (e) => {
      this.setState({ [e.target.id]: e.target.value })
    }
  
    handleFormSubmit = (e) => {
      e.preventDefault();
      const { email, password, password2 } = this.state;
      //const {history } = this.props
      if(password===password2){
          console.log(" email i pass : ",email,password)
        //   register(username,password)
        //   .then(res => console.log(res))
        //   .catch(err => console.log(err.message))
      }
    }
  
    render() {
      const { email, password,password2 } = this.state;
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}> 
          <h1> Join our cult! </h1>
            <p>Email : <input id="email" type="text" value={email} onChange={this.handleInputChange} /></p>
            <p>Password : <input id="password" type="password" value={password} onChange={this.handleInputChange} /></p>
            <p>Confirm Password: <input id="password2" type="password" value={password2} onChange={this.handleInputChange} /></p>
            <p><button  type="submit">Register</button></p>
          </form>
        </div>
      )
    }
  } 

  export default Register