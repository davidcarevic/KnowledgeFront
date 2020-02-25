import React, { Component } from 'react';
import StyledLink from '../../components/elements/Link';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';
import Form from '../../components/elements/Form'
import Input from '../../components/elements/Input'
import HomeHolder from '../../components/elements/HomeHolder';

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
        <HomeHolder>
        <Form onSubmit={this.handleFormSubmit}>
          <Title> WELCOME BACK </Title>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris<br />nisi ut aliquip ex ea commodo consequat.
          </div><br />
          <Input id="email" placeholder="EMAIL" type="email" value={email} onChange={this.handleInputChange} /><br/><br/>
          <Input id="password" placeholder="PASSWORD" type="password" value={password} onChange={this.handleInputChange} /><br/><br/>
          <Button type="submit">LOGIN</Button><br/><br/>
        </Form>
          <StyledLink to="/forgot-password">Forgot your password?</StyledLink><br/><br/>
          <StyledLink to="/register">You don't have an account?</StyledLink>
        </HomeHolder>
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