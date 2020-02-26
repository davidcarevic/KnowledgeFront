import styled from "styled-components";

export default styled.div`
    float: left;
    position: fixed;
    margin: 0 auto;
    width: 25%;
    top: ${props => props.top || "25%"};
    height: 85%;
    overflow-y: auto;
`;