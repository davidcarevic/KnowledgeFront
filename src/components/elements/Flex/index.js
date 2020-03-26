import styled from "styled-components";

export default styled.div`
    width: 100%;
    display: flex;
    justify-content: ${props => props.right ? 'flex-end' : ''};

`;
