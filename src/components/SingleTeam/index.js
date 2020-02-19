import React from 'react'
import {Item, Style} from "./styled"
import StyledLink from '../../components/elements/Link';

//<p>ID = {props.id}</p>
const SingleTeam = props => (
    <Item>
        <Style>
            <StyledLink to={"/dashboard/"+props.id}>{props.name}</StyledLink>
            {/* <h4>{props.description}</h4> */}
        </Style>
    </Item>
)

SingleTeam.Item = Item;
SingleTeam.Style = Style;

export default SingleTeam