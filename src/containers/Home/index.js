import React, { Component } from 'react';
//import { getToken } from '../../services';


class Home extends Component {
    state = {
      email: '',
      password: '',
    }
  
    handleInputChange = (e) => {
      this.setState({ [e.target.id]: e.target.value })
    }
  
    handleFormSubmit = (e) => {
      e.preventDefault();
      const { email, password } = this.state;
      const {history } = this.props
    //   getToken(email, password)
    //     .then(res => {
    //         window.localStorage.setItem('accessToken', res.data.access);
    //         window.localStorage.setItem('refreshToken', res.data.refresh);
    //         history.push('/dashboard')
    //     })
        
      
    }
  
    render() {
      const { email, password } = this.state;
      if(window.localStorage.getItem('accessToken') && window.localStorage.getItem('accessToken')!=='' ){
        return (
          <div>
          <h1>Hello fren</h1>
        </div>
        )
      }
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <h1> Log in </h1>
            <input id="email" placeholder="Email" type="email" value={email} onChange={this.handleInputChange} />
            <br/>
            <br/>
            <input id="password" placeholder="Password" type="password" value={password} onChange={this.handleInputChange} />
            <br/>
            <br/>
            <button  type="submit">Login</button>
          </form>
        </div>
      )
    }
  } 

  export default Home