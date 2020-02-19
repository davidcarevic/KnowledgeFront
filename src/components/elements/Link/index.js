import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    text-weight: normal;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
`;

export default StyledLink;