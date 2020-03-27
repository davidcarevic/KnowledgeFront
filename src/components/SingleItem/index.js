import React, { Component } from 'react';
import Embed from '../itemTypes/Iframe';
import RichText from '../itemTypes/RichText';
import Button from '../elements/Button';
import { StyledItem } from './styled';

class SingleItem extends Component {
    constructor(props) {
        super(props)
        this.state.first = this.props.first
        this.state.editing = this.props.editing
    }

    state = {
      editing: false,
      first: true,
      buttonText: 'Edit',
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
              <StyledItem>
                <Embed id={this.props.id} content={this.props.content} category={this.props.category} editing={this.state.editing} first={this.state.first}/>
                <Button onClick={this.handleEditingMode} width={'150px'}>{this.state.buttonText}</Button>
              </StyledItem>
            )
        }
        if (this.props.type === 'richText') {
            return (
              <StyledItem>
                <RichText id={this.props.id} content={this.props.content} category={this.props.category}   editing={this.state.editing} first={this.state.first}/>
                <Button onClick={this.handleEditingMode} width={'150px'}>{this.state.buttonText}</Button>
              </StyledItem>
            )
        }
    }
}

export default SingleItem
