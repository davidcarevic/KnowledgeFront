import styled from "styled-components";
import { LogOut, Bell } from 'styled-icons/boxicons-solid';
import { Settings } from 'styled-icons/material';
import { Plus, NetworkWired } from 'styled-icons/fa-solid';
import { Search } from 'styled-icons/evil';
import { ThSmall } from 'styled-icons/typicons';
import { UserPlus } from 'styled-icons/icomoon';

export const LogOutIcon = styled(LogOut)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
`

export const SettingsIcon = styled(Settings)`
  color: white;
  width: 24px;
  height: 24px;
  padding-left: 7px;
  margin-bottom: 15px;
`

export const BellIcon = styled(Bell)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 7px;
`

export const PlusIcon = styled(Plus)`
  color: ${props => props.color || "black"}
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 7px;
`
export const NetworkWiredIcon = styled(NetworkWired)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 7px;
`
export const SearchIcon = styled(Search)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 7px;
`
export const ThSmallIcon = styled(ThSmall)`
  color: white;
  width: 24px;
  height: 24px;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-left: 7px;
`
export const UserPlusIcon = styled(UserPlus)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 7px;
`