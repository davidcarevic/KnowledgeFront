import styled from "styled-components";

export default styled.button`
  /* Adapt the colors based on primary prop */
  background-color: black;
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 5px;
  width: ${props => props.width || '315px'};
  height: 35px;

  margin-top: ${props => props.top || ''};
`;
