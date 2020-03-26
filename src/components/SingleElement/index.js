import React, { Component } from 'react';
import Form from '../elements/Form';
import Button from '../elements/Button';
import Input from '../elements/Input';
import TextArea from '../elements/TextArea';
import Title from '../elements/Title';
import Flex from '../elements/Flex';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';

class SingleElement extends Component {
    constructor(props) {
        super(props)
    }

    state = {
      editing: false,
      buttonText: 'Edit',
      id: '',
      title: '',
      description: ''
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleEditingMode = (e) => {
      e.preventDefault();
      if (this.state.editing) {
        this.setState({
          id: '',
          title: '',
          description: '',
          editing: false,
          buttonText: 'Edit',
        })
      }
      else {
        this.setState({
          id: this.props.id,
          title: this.props.title,
          description: this.props.description,
          editing: true,
          buttonText: 'Cancel',
        })
      }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history, project, category, isLoading } = this.props
        const { id, title, description } = this.state;
        this.props.updateElement(id, title, description);
    }

    handleDeleteSubmit = (e) => {
      e.preventDefault();
      const id = this.props.id
      this.props.deleteElement(id)
    }

    render() {
      const { editing, title, description } = this.state
        if (editing) {
            return (
              <Form onSubmit={this.handleFormSubmit}>
                  <Input id="title" placeholder="CATEGORY title" type="text" value={title} onChange={this.handleInputChange} /><br/><br/>
                  <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/>
                  <Button type="submit"  width={'80px'}>Save</Button>
                  <Button onClick={this.handleDeleteSubmit} width={'80px'}  top={'28px'}>Delete</Button>
                  <Button onClick={this.handleEditingMode} width={'80px'}  top={'28px'}>{this.state.buttonText}</Button>
              </Form>
            )
        }
        else {
            return (
              <div>
                <Flex>
                  <h3 onDoubleClick={this.handleEditingMode}>{this.props.title}</h3>
                </Flex>
                <div onDoubleClick={this.handleEditingMode}>{this.props.description}</div>

              </div>
            )
        }
    }
}

const mapDispatchToProps = {
    updateElement: projectRedux.thunks.elementUpdate,
    deleteElement: projectRedux.thunks.elementDelete
}

const mapStateToProps = state => ({
    isLoading: state.global.isLoading,
    section: state.projects.category,
    category: state.projects.element
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleElement))
