import styled from "styled-components";

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-left: 60px;
    padding-top: 20px;
    width: 100%;
    background-color: white;
    z-index: 1;
    border-bottom: 1px solid black;
`

export const LeftHeaderHolder = styled.div`
    left: 5%;
    display: flex;
    width: 25%;
    position: fixed;
    top: 0;
    left: 0;
    padding-left: 60px;
    padding-top: 17px;
    background-color: white;
    z-index: 2;
    border-bottom: 1px solid black;
`;

export const RightHeaderHolder = styled.div`
    right: 0;
    display: flex;
    width: 75%;
    justify-content: flex-end;
    position: fixed;
    top: 0;
    padding-left: 60px;
    padding-top: 20px;
    border-bottom: 1px solid black;
    background-color: white;
    z-index: 1;
`;