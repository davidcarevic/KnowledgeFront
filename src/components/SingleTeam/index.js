import React from 'react'
import {Link} from "react-router-dom";

const SingleTeam = props => (
    <div>
        <p>ID = {props.id}</p>
        <p><Link to={"/teams/"+props.name}>{props.name}</Link></p>
        <p>Description: : {props.description}</p>
        <br/>
    </div>
)

export default SingleTeam