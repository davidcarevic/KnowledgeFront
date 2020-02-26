import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import { withRouter } from 'react-router-dom';
import Button from '../../components/elements/Button'
import Title from '../../components/elements/Title'
import Form from '../../components/elements/Form'
import Input from '../../components/elements/Input'
import HomeHolder from '../../components/elements/HomeHolder';
import LoadingSpinner from "../../components/elements/LoadingSpinner";

class Register extends Component {
    state = {
      guid: '',
      email: '',
      password: '',
      password2: '',
      data: {},
    }

    componentDidMount() {
        console.log("GUID : ", this.props.match.params.guid)
        var guid = this.props.match.params.guid
        try {
            if (guid) {
                this.setState({guid: guid})
                if (!this.props.isLoading && this.props.user.invited) {
                    this.props.getUser(guid)
                }
            }
        } catch (e) {

        }
    }

    handleInputChange = (e) => {
      this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
      e.preventDefault();
      const { email, password, password2, guid} = this.state;
      const { history } = this.props;
      const{notMember} = this.props.user.invited.data.not_member
      if(notMember===false){
          if (this.props.user.invited.email) {
              let email = this.props.user.invited.email
              let data = {
                  team: this.props.user.invited.data.team,
                  project: this.props.user.invited.data.project,
                  guid: guid,
                  not_member:notMember
              }
              this.props.createUser(email,'', data)
              history.push("/")
              return
          }
      }
      if (password === password2) {
          let data={}
          if (this.props.user.invited.email) {
              let email = this.props.user.invited.email
               data = {
                  team: this.props.user.invited.data.team,
                  project: this.props.user.invited.data.project,
                  guid: guid,
                  not_member:notMember
              }
               this.props.createUser(email, password, data)
               history.push("/")
              return
          }
          data={not_member:true}
          console.log(this.state)
          this.props.createUser(email, password, data)
          history.push("/")
      }
    }
    render() {
      const { email, password, password2, guid, notMember } = this.state;
        if (this.props.isLoading) {
            return <LoadingSpinner/>
        }
      if (guid && this.props.user.invited.data && !this.props.isLoading) {
          if(this.props.user.invited.data.not_member) {
              return (
                  <HomeHolder>
                      <Form onSubmit={this.handleFormSubmit}>
                          <Title> WELCOME </Title>
                          <h2>{this.props.user.invited.email ? this.props.user.invited.email : ''}</h2>
                          <Input id="password" placeholder="PASSWORD" type="password" value={password}
                                 onChange={this.handleInputChange}/><br/><br/>
                          <Input id="password2" placeholder="CONFIRM PASSWORD" type="password" value={password2}
                                 onChange={this.handleInputChange}/><br/><br/>
                          <Button primary type="submit">REGISTER</Button>
                      </Form>
                  </HomeHolder>
              )
          }
          else{
              return (
                  <HomeHolder>
                      <Form onSubmit={this.handleFormSubmit}>
                          <Title> You've been invited to join a Project </Title>
                          <h2>{this.props.user.invited.email?this.props.user.invited.email:''}</h2>
                          <Button primary type="submit">Join</Button>
                      </Form>
                  </HomeHolder>
              )
          }
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
})

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))