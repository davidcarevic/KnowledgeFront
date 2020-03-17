import React, { Component } from 'react';
import Embed from '../itemTypes/Iframe';
import RichText from '../itemTypes/RichText';
import Button from '../elements/Button';

class SingleItem extends Component {
    constructor(props) {
        super(props)
        this.state.first = this.props.first
        this.state.editing = this.props.editing
    }

    state = {
      editing: false,
      first: true,
      buttonText: 'edit',
      content: this.props.content
    }

    handleEditingMode = (e) => {
      e.preventDefault();
      if (this.state.editing) {
        this.setState({
          editing: false,
          buttonText: 'Edit',
          first: true
        })
      }
      else {
        this.setState({
          editing: true,
          buttonText: 'Cancel',
          first: false
        })
      }
    }

    render() {
        if (this.props.type === 'embed') {
            return (
              <div>
                <Embed id={this.props.id} content={this.props.content} editing={this.state.editing} first={this.state.first}/>
                <Button onClick={this.handleEditingMode}>{this.state.buttonText}</Button>
              </div>
            )
        }
        if (this.props.type === 'richText') {
            return (
              <div>
                <RichText id={this.props.id} content={this.props.content}  editing={this.state.editing} first={this.state.first}/>
                <Button onClick={this.handleEditingMode}>{this.state.buttonText}</Button>
              </div>
            )
        }
    }
}

export default SingleItem
