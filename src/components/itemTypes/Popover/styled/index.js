import styled from "styled-components";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';


export const ButtonS = styled(Button)`
  /* Adapt the colors based on primary prop */
  background-color: black;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
  width: 315px;
  height: 35px;
`;

export const UncontrolledPopoverStyled = styled(UncontrolledPopover)`
    position: absolute;
`;

export const BodyStyled = styled(PopoverBody)`
    padding: 5px;
    background-color:white;
`;

export const HeaderStyled = styled(PopoverHeader)`
    padding: 5px;
    background-color:white
`;