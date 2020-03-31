import styled from "styled-components";

export default styled.textarea`
width: ${props => props.width || '300px'};
height: ${props => props.height || '100px'};
border: ${props => props.border || ''};
padding-left: 10px;
border-radius: 5px;
background: #F0F0F0;
`;
