import React, { Component } from 'react';
import { connect } from 'react-redux'
import userRedux from '../../redux/user';
import { withRouter } from 'react-router-dom';
import { Bar, BellIcon, LogOutIcon, SettingsIcon, PlusIcon, NetworkWiredIcon, SearchIcon, ThSmallIcon, UserPlusIcon } from './styled';
import { Link } from "react-router-dom";

class SideBar extends Component {
    render() {
      return (
        <Bar>
          <Link to={"#"}><ThSmallIcon /></Link>
          <Link to={"#"}><BellIcon /></Link>
          <Link to={"#"}><PlusIcon /></Link>
          <Link to={"#"}><UserPlusIcon /></Link>
          <Link to={"#"}><NetworkWiredIcon /></Link>
          <Link to={"#"}><SearchIcon /></Link>
          <Link to={"#"}><SettingsIcon /></Link>
          <Link to={"/"}><LogOutIcon /></Link>
        </Bar>
      )
    }
  }

  const mapDispatchToProps = {

  }

const mapStateToProps = state => ({

})

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SideBar))
