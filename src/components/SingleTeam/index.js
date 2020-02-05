import React from 'react'

const SingleTeam = props => (
    <div>
        <p>ID = {props.id}</p>
        <p>{props.name} : {props.description}</p>
        <br/>
    </div>
)

export default SingleTeam