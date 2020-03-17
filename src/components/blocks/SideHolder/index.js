import styled from "styled-components";

export default styled.div`
    float: left;
    position: fixed;
    margin: 0 auto;
    width: 15%;
    top: ${props => props.top || "20%"};
    height: 85%;
    overflow-y: auto;
`;
