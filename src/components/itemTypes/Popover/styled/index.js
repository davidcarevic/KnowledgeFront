import styled from "styled-components";
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';


export const ButtonS = styled(Button)`
  /* Adapt the colors based on primary prop */
  background-color: black;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
  width: 200px;
  height: 35px;
`;

export const UncontrolledPopoverStyled = styled(UncontrolledPopover)`
    background-color: lightgrey;
`;

export const BodyStyled = styled(PopoverBody)`
    padding: 10px;
    background-color: lightgrey;
`;

export const HeaderStyled = styled(PopoverHeader)`
    padding: 10px;
    background-color: lightgrey;
    margin: 0;
`;
