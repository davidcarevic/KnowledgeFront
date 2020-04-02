import React, { Component } from 'react';
import Form from '../elements/Form';
import Button from '../elements/Button';
import Flex from '../elements/Flex';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import AutosizeInput from 'react-input-autosize';
import TextareaAutosize from 'react-autosize-textarea';

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
      const { role } = this.props
      if (role === 'admin' || role === 'editor') {
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
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { id, title, description } = this.state;
        this.props.updateElement(id, title, description, this.props.category, this.props.section);
        this.setState({editing:false})
    }

    handleDeleteSubmit = (e) => {
      e.preventDefault();
      const id = this.props.id
      this.props.deleteElement(id, this.props.category, this.props.section)
        this.setState({editing:false})
    }

    render() {
      const { editing, title, description } = this.state
      const { role } = this.props
        if (editing && (role === 'admin' || role === 'editor')) {
            return (
              <Form onSubmit={this.handleFormSubmit}>
                <AutosizeInput
                  placeholder="ELEMENT TITLE"
                  placeholderIsMinWidth
                  name="form-field-name"
                  value={title}
                  onChange={this.handleChange.bind(this, 'title')}
                  style={{ border: 'none' }}
                  inputStyle={{ background: '#F0F0F0', border: 'none', padding: 5, fontSize: '1.17em', fontWeight: 'bold' }}
                /><br /><br />
                <TextareaAutosize
                  rows={5}
                  columns={10}
                  placeholder='DESCRIPTION'
                  value={description}
                  onChange={this.handleChange.bind(this, 'description')}
                  style={{ width: '700px', background: '#F0F0F0', border: 'none', fontSize: '1.2em'}}
                /><br /><br />
                <Button type="submit"  width={'80px'}>Save</Button>
                { role === 'admin' ?
                  <Button onClick={this.handleDeleteSubmit} width={'80px'}  top={'28px'}>Delete</Button> : ''
                }
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
    section: state.projects.section,
    category: state.projects.category
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleElement)
