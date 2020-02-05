import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux'

import userRedux from '../../redux/user';

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
      this.props.loginUser(email, password);
      history.push('/teams');
    }
    render() {
      const { email, password } = this.state;
      return (
        <div>
          <form onSubmit={this.handleFormSubmit}>
            <h1> Log in </h1>
            <input id="email" placeholder="Email" type="email" value={email} onChange={this.handleInputChange} />
            <br/>
            <br/>
            <input id="password" placeholder="Password" type="password" value={password} onChange={this.handleInputChange} />
            <br/>
            <Link to="/register">Create an account</Link>
            <br/>
            <button  type="submit">Login</button>
          </form>
        </div>
      )
    }
  }

  const mapDispatchToProps = {
    loginUser: userRedux.thunks.loginUser
  }

  export default connect(null, mapDispatchToProps)(Home)