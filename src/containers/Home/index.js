import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';
import Form from '../../components/elements/Form'

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
      const { history } = this.props
      this.props.loginUser(email, password);
      history.push('/dashboard');
    }

    render() {
      const { email, password } = this.state;
      if (this.props.isAuthenticated) {
          return (
              <div>
                  <Title>
                  Logged in
                  </Title>
              </div>
          )
      }
      return (
        <Form>
          <form onSubmit={this.handleFormSubmit}>
            <Title> WELCOME BACK </Title>
            <input id="email" placeholder="EMAIL" type="email" value={email} onChange={this.handleInputChange} />
            <br/>
            <br/>
            <input id="password" placeholder="PASSWORD" type="password" value={password} onChange={this.handleInputChange} />
            <br/>
            <br/>
              <Link to="/register"><Title>Sign up</Title></Link>
            <br/>
            <Button primary  type="submit">LOGIN</Button>
          </form>
        </Form>
      )
    }
  }

  const mapDispatchToProps = {
    loginUser: userRedux.thunks.loginUser,
  }

  const mapStateToProps = state => ({
          isAuthenticated: state.user.isAuthenticated,
      }
  )

  export default connect(mapStateToProps, mapDispatchToProps)(Home)