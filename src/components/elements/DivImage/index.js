import styled from "styled-components";

export default styled.div`
    background: ${props => `url(${props.img})`};
    width: 250px;
    height: 150px;
`;
