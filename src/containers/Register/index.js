import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';

class Register extends Component {
    state = {
      guid: '',
      email: '',
      password: '',
      password2: '',
      inivtedUser: {}
    }
    componentDidMount() {
        console.log("GUID : ", this.props.match.params.guid)
        var guid = this.props.match.params.guid
        if(guid) {
            this.setState({guid: guid})
            this.setState({invitedUser: this.props.getUser(guid)})
        }
    }

    handleInputChange = (e) => {
      this.setState({ [e.target.id]: e.target.value })
    }
    handleFormSubmit = (e) => {
      e.preventDefault();
      const { email, password, password2 } = this.state;
       console.log("USER MAIL , ",this.props.user.invited.email)
        if(email === '') {
            this.setState({email: this.props.user.invited.email})
        }
      //const {history } = this.props
      if(password === password2) {
          console.log(this.state)
          console.log(" email i pass : ", email, password)
          this.props.createUser(email,password)
      }
    }
    render() {
      const { email, password, password2, guid } = this.state;
      if(guid){
          return(
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

  export default connect(mapStateToProps,mapDispatchToProps)(Register)