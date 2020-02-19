import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import { withRouter } from 'react-router-dom';
import Button from '../../components/elements/Button'
import Title from '../../components/elements/Title'
import Form from '../../components/elements/Form'
import Input from '../../components/elements/Input'
import HomeHolder from '../../components/elements/HomeHolder';
import Home from '../Home';

class Register extends Component {
    state = {
      guid: '',
      email: '',
      password: '',
      password2: '',
      data: {}
    }

    componentDidMount() {
        console.log("GUID : ", this.props.match.params.guid)
        var guid = this.props.match.params.guid
        if (guid) {
            this.setState({guid: guid})
            if (this.props.user.invited !== {}  && !this.props.isLoading){
                this.props.getUser(guid)
            }
        }
    }

    handleInputChange = (e) => {
      this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
      e.preventDefault();
      const { email, password, password2,data,guid} = this.state;
      const { history } = this.props
      if (password === password2) {
          if (this.props.user.invited.email) {
              let email = this.props.user.invited.email
              let data = {
                  team: this.props.user.invited.data.team,
                  project: this.props.user.invited.data.project,
                  guid: guid
              }
               this.props.createUser(email, password, data)
               history.push("/")
              return
          }
          console.log(this.state)
          this.props.createUser(email, password, data)
          history.push("/")

      }
    }
    render() {
      const { email, password, password2, guid } = this.state;
      if (guid) {
          return (
            <HomeHolder>
              <Form onSubmit={this.handleFormSubmit}>
                  <Title> WELCOME </Title>
                  <Input id="password" placeholder="PASSWORD" type="password" value={password} onChange={this.handleInputChange} /><br/><br/>
                  <Input id="password2" placeholder="CONFIRM PASSWORD" type="password" value={password2} onChange={this.handleInputChange} /><br/><br/>
                  <Button primary type="submit">REGISTER</Button>
              </Form>
            </HomeHolder>
          )
      }

      return (
        <HomeHolder>
          <Form onSubmit={this.handleFormSubmit}>
              <Title> WELCOME </Title>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<br />
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris<br />nisi ut aliquip ex ea commodo consequat.
              </div><br />
              <Input id="email" type="email" placeholder="EMAIL" value={email} onChange={this.handleInputChange} /><br/><br/>
              <Input id="password" placeholder="PASSWORD" type="password" value={password} onChange={this.handleInputChange} /><br/><br/>
              <Input id="password2" placeholder="CONFIRM PASSWORD" type="password" value={password2} onChange={this.handleInputChange} /><br/><br/>
              <Button primary type="submit">REGISTER</Button>
          </Form>
        </HomeHolder>
      )
    }
  }

  const mapDispatchToProps = {
    createUser: userRedux.thunks.registerUser,
      getUser: userRedux.thunks.getInvited
  }

const mapStateToProps = state => ({
    user: state.user,
    invited: state.invited
})

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))