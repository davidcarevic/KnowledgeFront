import React from 'react'
import StyledLink from '../../components/elements/Link';
import { Info, Image, Item, Style} from "./styled";

//<p>ID = {props.id}</p>
//test image hardcoded!!!
const SingleProject = props => (
    <Style>
        <Image src={props.image ? `data:${props.image.type};base64,${props.image.base64.split(',')[1]}`: "https://cdn.pixabay.com/photo/2016/08/25/19/17/boat-1620452_960_720.jpg"}></Image>
        <Info>
            <StyledLink to={`/dashboard/projects/` + props.id}>{props.name}</StyledLink>
        </Info>
    </Style>
)

export default SingleProject