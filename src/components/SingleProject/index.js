import React from 'react'
import StyledLink from '../../components/elements/Link';
import { Info, Image, Item, ProjectImage, Style} from "./styled";

//<p>ID = {props.id}</p>
//test image hardcoded!!!
const SingleProject = props => (
    <Item>
        <Style>
            <ProjectImage img={"https://cdn.pixabay.com/photo/2016/08/25/19/17/boat-1620452_960_720.jpg"} />
            <Info>
                <StyledLink to={`/dashboard/projects/` + props.id}>{props.name}</StyledLink>
            </Info>
        </Style>
    </Item>
)

SingleProject.Info = Info
SingleProject.Image = Image

export default SingleProject