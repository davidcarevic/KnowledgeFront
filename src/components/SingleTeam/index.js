import React from 'react'
import {Link} from "react-router-dom";
import {Item, Style} from "./styled"

//<p>ID = {props.id}</p>
const SingleTeam = props => (
    <Item>
        <Style>
            <h3><Link to={"/dashboard/"+props.id}>{props.name}</Link></h3>
            {/* <h4>{props.description}</h4> */}
        </Style>
    </Item>
)

SingleTeam.Item = Item;
SingleTeam.Style = Style;

export default SingleTeam