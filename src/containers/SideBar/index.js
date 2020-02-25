import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import { withRouter } from 'react-router-dom';
import { Bar, BottomnButtons, ButtonForm } from './styled';
import { BellIcon, LogOutIcon, SettingsIcon, PlusIcon, NetworkWiredIcon, SearchIcon, ThSmallIcon, UserPlusIcon } from '../../components/elements/Icons';
import { Link } from "react-router-dom";

class SideBar extends Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.logout();
  }

    render() {
      return (
        <Bar>
          <Link to={"#"}><ThSmallIcon /></Link>
          <Link to={"#"}><BellIcon /></Link>
          <Link to={"#"}><PlusIcon color={"white"} /></Link>
          <Link to={"#"}><UserPlusIcon /></Link>
          <Link to={"#"}><NetworkWiredIcon /></Link>
          <Link to={"#"}><SearchIcon /></Link>
          <BottomnButtons>
            <Link to={"#"}><SettingsIcon /></Link>
            <form onSubmit={this.handleFormSubmit} >
              <ButtonForm type="submit"><LogOutIcon /></ButtonForm>
            </form>
          </BottomnButtons>
        </Bar>
      )
    }
  }

  const mapDispatchToProps = {
    logout: userRedux.thunks.logout
  }

const mapStateToProps = state => ({

})

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar))
