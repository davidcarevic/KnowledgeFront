import styled from "styled-components";

export const Style = styled.div`
  font-size: 1em;
  text-align: center;
  color: palevioletred;
  word-wrap: break-word;
`;
export const Item = styled.div`
  padding: 4em;
  background: papayawhip;
  display: inline-block;
`;

export const ProjectImage = styled.div`
    background: ${props => `url(${props.img})`};
    padding: 1em;
    background-color: #DCDCDC;
    width: 250px;
    height: 150px;
    border-radius: 5px 5px 0 0;
`;
export const Image = styled.img`
    width: 250px;
    height: 150px;
`;
export const Info = styled.div`
    background-color: #F5F5F5;
    padding: 0.5em;
    word-wrap: break-word;
    display: block;
    width: 250px;
    padding :1em;
    border-radius: 0 0 5px 5px;
`;

export const H4 = styled.h4`
    word-wrap: break-word;
    display: block;
`;