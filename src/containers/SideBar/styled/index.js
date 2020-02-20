import styled from "styled-components";
import { LogOut, Bell } from 'styled-icons/boxicons-solid';
import { Settings } from 'styled-icons/material';
import { Plus, NetworkWired } from 'styled-icons/fa-solid';
import { Search } from 'styled-icons/evil';
import { ThSmall } from 'styled-icons/typicons';
import { UserPlus } from 'styled-icons/icomoon';

export const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 100%;
  background-color: black;
`;

export const LogOutIcon = styled(LogOut)`
  color: white;
  width: 24px;
  height: 24px;
  bottom: 10px;
  left: 7px;
  position: absolute;
`

export const SettingsIcon = styled(Settings)`
  color: white;
  width: 24px;
  height: 24px;
  bottom: 45px;
  left: 7px;
  position: absolute;
`

export const BellIcon = styled(Bell)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 5px;
`

export const PlusIcon = styled(Plus)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 5px;
`
export const NetworkWiredIcon = styled(NetworkWired)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 5px;
`
export const SearchIcon = styled(Search)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 5px;
`
export const ThSmallIcon = styled(ThSmall)`
  color: white;
  width: 24px;
  height: 24px;
  margin-top: 10px;
  margin-bottom: 15px;
  padding-left: 5px;
`
export const UserPlusIcon = styled(UserPlus)`
  color: white;
  width: 24px;
  height: 24px;
  margin-bottom: 15px;
  padding-left: 5px;
`
