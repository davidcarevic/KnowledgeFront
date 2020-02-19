import React from 'react'
import StyledLink from '../../components/elements/Link';
import { Info, Image, Item, H4, ProjectImage, Style} from "./styled";


//<p>ID = {props.id}</p>
//test image hardcoded!!!
const SingleProject = props => (
    <Item>
        <Style>
            <ProjectImage>
                <Image src="https://cdn.pixabay.com/photo/2016/08/25/19/17/boat-1620452_960_720.jpg"/>
            </ProjectImage>
            <Info>
        <StyledLink to={`/dashboard/projects/`+props.id}>{props.name}</StyledLink>
        {/* <H4>{props.description}</H4> */}
            </Info>
        </Style>
    </Item>
)

SingleProject.Info = Info
SingleProject.Image = Image

export default SingleProject