import React, { Component } from 'react';
import Embed from '../itemTypes/Iframe';
import RichText from '../itemTypes/RichText';

class SingleItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.type === 'embed') {
            return <Embed content={this.props.content} editing={false}/>
        }
        if (this.props.type === 'richText') {
            return <RichText content={this.props.content} editing={false}/>
        }
    }
}


export default SingleItem