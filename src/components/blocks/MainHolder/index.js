import styled from "styled-components";

export default styled.div`
    position: absolute;
    top: ${props => props.top || "20%"};
    float: right;
    left: 22%;
    margin: 0 auto;
    width: 77%;
`;
