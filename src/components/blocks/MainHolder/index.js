import styled from "styled-components";

export default styled.div`
    position: absolute;
    top: ${props => props.top || "20%"};
    float: right;
    left: 30%;
    display: inline-block;
    margin: 0 auto;
    width: 50%;
`;