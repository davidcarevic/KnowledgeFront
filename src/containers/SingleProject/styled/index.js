import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  margin-top: ${props => props.top || '3px'};
  margin-right: 15px;
  flex-direction: row;
`
