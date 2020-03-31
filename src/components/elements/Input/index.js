import styled from "styled-components";

export default styled.input`
    min-width: 100px;
    min-height: 35px;
    width: ${props => props.width || ''};
    height: ${props => props.height || ''};
    border: ${props => props.border || ''};
    padding-left: 10px;
    border-radius: 5px;
    background: #F0F0F0;
    size: auto;
`;
