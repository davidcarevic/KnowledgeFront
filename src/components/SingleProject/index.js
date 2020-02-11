import React from 'react'
import {Link} from "react-router-dom";

const SingleProject = props => (
    <div>
        <p>ID = {props.id}</p>
        <p><Link to={`/teams/${props.teamId}/projects/`+props.id}>{props.name}</Link></p>
        <p>Description: : {props.description}</p>
        <br/>
    </div>
)

export default SingleProject