import React, { Component } from 'react';
import Form from '../elements/Form';
import Button from '../elements/Button';
import Flex from '../elements/Flex';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import AutosizeInput from 'react-input-autosize';
import TextareaAutosize from 'react-autosize-textarea';

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

    handleChange = (input, event) => {
		const newState = {};
		newState[input] = event.target.value;
		this.setState(newState);
	};

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
        const { id } = this.props
        const { name, description } = this.state;
        this.props.updateCategory(id, name, description, this.props.category, this.props.section);
        this.setState({editing: false})
    }

    handleDeleteSubmit = (e) => {
      e.preventDefault();
      const { id } = this.props
      this.props.deleteCategory(id, this.props.section)
    }

    render() {

      const { editing, name, description } = this.state
        if (editing) {
            return (
              <Form onSubmit={this.handleFormSubmit}>
                <AutosizeInput
                  placeholder="CATEGORY NAME"
                  placeholderIsMinWidth
                  name="form-field-name"
                  value={name}
                  onChange={this.handleChange.bind(this, 'name')}
                  style={{ border: 'none' }}
                  inputStyle={{ background: '#F0F0F0', border: 'none', padding: 5, fontSize: '2em', fontWeight: 'bold' }}
                /><br /><br />
                <TextareaAutosize
                  rows={5}
                  columns={10}
                  placeholder='DESCRIPTION'
                  value={description}
                  onChange={this.handleChange.bind(this, 'description')}
                  style={{ width: '700px',background: '#F0F0F0', border: 'none', fontSize: '1.2em'}}
                /><br /><br />
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleCategory)
