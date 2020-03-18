import styled from "styled-components";
import { Button } from 'reactstrap';


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

export const StyledPopover = styled.div`
    background-color: lightgrey;
    position: fixed;
    top: 10%;
    bottomn: 0;
    right:0;
    height: 100%;
    width: 150px;
    padding: 10px;
`;
