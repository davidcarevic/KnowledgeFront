import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import { withRouter } from 'react-router-dom';

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
              <div>
                  <form onSubmit={this.handleFormSubmit}>
                      <h1> Join!</h1>
                      <p>Password : <input id="password" type="password" value={password} onChange={this.handleInputChange} /></p>
                      <p>Confirm Password: <input id="password2" type="password" value={password2} onChange={this.handleInputChange} /></p>
                      <p><button  type="submit">Register</button></p>
                  </form>
              </div>
          )
      }

      return (
        <div>
          <form onSubmit={this.handleFormSubmit}> 
          <h1> Join!</h1>
            <p>Email : <input id="email" type="text" value={email} onChange={this.handleInputChange} /></p>
            <p>Password : <input id="password" type="password" value={password} onChange={this.handleInputChange} /></p>
            <p>Confirm Password: <input id="password2" type="password" value={password2} onChange={this.handleInputChange} /></p>
            <p><button  type="submit">Register</button></p>
          </form>
        </div>
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