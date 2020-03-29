import React, { Component } from 'react';
import Embed from '../itemTypes/Iframe';
import RichText from '../itemTypes/RichText';
import Button from '../elements/Button';
import Form from '../elements/Form'
import { StyledItem } from './styled';

class SingleItem extends Component {
    constructor(props) {
        super(props)
        this.state.editing = this.props.editing
    }

    state = {
      editing: false,
      buttonText: 'Edit',
      content: this.props.content
    }

    handleEditingMode = (e) => {
      e.preventDefault();
      if (this.state.editing) {
        this.setState({
          editing: false,
          buttonText: 'Edit'
        })
      }
      else {
        this.setState({
          editing: true,
          buttonText: 'Cancel'
        })
      }
    }

    handleSubmit = (e) => {
      e.preventDefault()
      this.setState({
        editing: false,
        buttonText: 'Edit'
      })
    }

    render() {
      const { id, content, category, type } = this.props
      const { editing, buttonText } = this.state
        if (type === 'embed') {
            return (
              <Form onSubmit={this.handleSubmit}>
                <StyledItem>
                  <Embed id={id} content={content} category={category} editing={editing} />
                  <Button onClick={this.handleEditingMode} width={'150px'}>{buttonText}</Button>
                </StyledItem>
              </Form>
            )
        }
        if (type === 'richText') {
            return (
              <Form onSubmit={this.handleSubmit}>
                <StyledItem>
                  <RichText id={id} content={content} category={category} editing={editing} />
                  <Button onClick={this.handleEditingMode} width={'150px'}>{buttonText}</Button>
                </StyledItem>
              </Form>
            )
        }
    }
}

export default SingleItem
