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

class SingleCategory extends Component {
    constructor(props) {
        super(props);
    }

    state = {
      editing: false,
      buttonText: 'Edit',
      name: '',
      description: ''
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleEditingMode = (e) => {
      e.preventDefault();
      if (this.state.editing) {
        this.setState({
          editing: false,
          buttonText: 'Edit',
        })
      }
      else {
        this.setState({
          name: this.props.name,
          description: this.props.description,
          editing: true,
          buttonText: 'Cancel',
        })
      }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { id, history } = this.props
        const { name, description } = this.state;
        this.props.updateCategory(id, name, description);
    }

    handleDeleteSubmit = (e) => {
      e.preventDefault();
      const { id } = this.props
      this.props.deleteCategory(id)
    }

    render() {

      const { editing, name, description } = this.state
        if (editing) {
            return (
              <Form onSubmit={this.handleFormSubmit}>
                  <Input id="name" placeholder="CATEGORY NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
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
                  <h1 onDoubleClick={this.handleEditingMode}>{this.props.name}</h1>
                </Flex>
                <div onDoubleClick={this.handleEditingMode}>{this.props.description}</div>

              </div>
            )
        }
    }
}

const mapDispatchToProps = {
    updateCategory: projectRedux.thunks.categoryUpdate,
    deleteCategory: projectRedux.thunks.categoryDelete
}

const mapStateToProps = state => ({
    isLoading: state.global.isLoading,
    section: state.projects.section,
    category: state.projects.category
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleCategory))
