import styled from "styled-components";
import { LogOut, Bell } from 'styled-icons/boxicons-solid';
import { Settings } from 'styled-icons/material';
import { Plus, NetworkWired } from 'styled-icons/fa-solid';
import { Search } from 'styled-icons/evil';
import { ThSmall } from 'styled-icons/typicons';
import { UserPlus } from 'styled-icons/icomoon';
import { DotsVerticalRounded } from 'styled-icons/boxicons-regular';

export const DotsIcon = styled(DotsVerticalRounded)`
  width: 15px;
  height: 15px;
  margin-top: 10px;

  &:hover {
      background-color: #d3d3d3;
      color: white;
    }
`

export const LogOutIcon = styled(LogOut)`
  color: white;
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  margin-bottom: 5px;
  background: ${props => props.background || "black"};
  &:hover {
    color: blue;
  }
`

export const SettingsIcon = styled(Settings)`
  color: white;
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  margin-bottom: 5px;
  padding: 6px;
  background: ${props => props.background || "black"};

  &:hover {
    color: blue;
  }
`

export const BellIcon = styled(Bell)`
  color: white;
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  margin-bottom: 5px;
  padding: 6px;
  background: ${props => props.background || "black"};

  &:hover {
    color: blue;
  }
`

export const PlusIcon = styled(Plus)`
  color: ${props => props.color || "black"}
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  margin-top: ${props => props.top || ''};
  margin-bottom: 5px;
  margin-left: ${props => props.left || ''};
  margin-right: ${props => props.right || ''};
  padding: 6px;
  background: ${props => props.background || "black"};

  &:hover {
    color: blue;
  }
`
export const NetworkWiredIcon = styled(NetworkWired)`
  color: white;
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  margin-bottom: 5px;
  padding: 6px;
  background: ${props => props.background || "black"};

  &:hover {
    color: blue;
  }
`
export const SearchIcon = styled(Search)`
  color: white;
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  margin-bottom: 5px;
  padding: 6px;
  background: ${props => props.background || "black"};

  &:hover {
    color: blue;
  }
`
export const ThSmallIcon = styled(ThSmall)`
  color: white;
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 6px;
  background: ${props => props.background || "black"};

  &:hover {
    color: blue;
  }
`
export const UserPlusIcon = styled(UserPlus)`
  color: ${props => props.color || "black"}
  width: ${props => props.width || '24px'};
  height: ${props => props.height || '24px'};
  margin-top: ${props => props.top || ''};
  margin-bottom: 5px;
  padding: 6px;
  background: ${props => props.background || "black"};

  &:hover {
    color: blue;
  }
`
