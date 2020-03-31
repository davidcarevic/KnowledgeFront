import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects';
import Button from '../../components/elements/Button';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import TextArea from '../../components/elements/TextArea';
import ReactHtmlParser from 'react-html-parser';
import { PlusIcon } from '../../components/elements/Icons';
import AutosizeInput from 'react-input-autosize';
import TextareaAutosize from 'react-autosize-textarea';
// import onClickOutside from "react-onclickoutside";

class CreateElement extends Component {
  constructor(props) {
    super(props);
  }

    state = {
        title: '',
        description: '',
        newElement: false
    }

    handleChange = (input, event) => {
		const newState = {};
		newState[input] = event.target.value;
		this.setState(newState);
	};

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { title, description } = this.state;
        const category_id = this.props.category.id
        const category = this.props.category
        this.props.createElement(title, description, category_id, category);
        this.setState({
          newElement: false,
          title: '',
          description: ''
        })
    }

    createNewElement = (e) => {
      e.preventDefault();
      if (this.state.newElement) {
        this.setState({
          newElement: false,
          title: '',
          description: '',
        })
      } else {
        this.setState({
          newElement: true,
        })
      }
    }

    render() {
        const { title, description, newElement } = this.state;
        if (newElement) {
          return (
            <Form onSubmit={this.handleFormSubmit}>
                <h3>CREATE YOUR ELEMENT!</h3>
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
                <Button type="submit" width={'150px'}>CREATE</Button>
                <Button onClick={this.createNewElement} width={'150px'}>Cancel</Button>
            </Form>
          )
        } else {
            return (
              <PlusIcon onClick={this.createNewElement} background={'lightgrey'} top={'18px'} width={'15px'} height={'15px'} right={'5px'} />
            )
        }
    }
}

const mapDispatchToProps = {
    createElement: projectRedux.thunks.elementCreation
}

const mapStateToProps = state => ({
    element: state.projects.element,
    category: state.projects.category
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateElement)
