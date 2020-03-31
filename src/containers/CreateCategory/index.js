import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';
import StyledLink from '../../components/elements/Link';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import TextArea from '../../components/elements/TextArea';
import { PlusIcon } from '../../components/elements/Icons';
import AutosizeInput from 'react-input-autosize';
import TextareaAutosize from 'react-autosize-textarea';

class CreateCategory extends Component {
  constructor(props) {
    super(props);
  }

    state = {
        name: '',
        description: '',
        newCategory: false,
        first: this.props.first,
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
        console.log("CAT CREATE PROPS", this.props)
        const { history, project, section, isLoading } = this.props
        const { name, description } = this.state;
        const section_id = section.id
        this.props.createCategory(name, description, section_id, this.props.categories);
        this.setState({newCategory:false})
    }

    createNewCategory = (e) => {
      e.preventDefault();
      if (this.state.newCategory) {
        this.setState({
          newCategory: false,
          name: '',
          description: '',
        })
      } else {
        this.setState({
          newCategory: true,
        })
      }
    }

    render() {
        const { name, description, newCategory, first } = this.state;
        if (first) {
          return (
            <div>
            <h1>Create your first category.</h1>
              <Form onSubmit={this.handleFormSubmit}>
                <Input id="name" placeholder="SECTION NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
                <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
                <Button width={'315px'} type="submit">CREATE</Button>
              </Form>
            </div>
          )
        }
        if (newCategory) {
          return (
            <Form onSubmit={this.handleFormSubmit}>
              <AutosizeInput
                placeholder="CATEGORY NAME"
                placeholderIsMinWidth
                name="form-field-name"
                value={name}
                onChange={this.handleChange.bind(this, 'name')}
                style={{  border: 'none' }}
                inputStyle={{ background: '#F0F0F0', border: 'none', padding: 5, fontSize: '1.17em', fontWeight: 'bold' }}
              /><br /><br />
              <TextareaAutosize
                rows={5}
                columns={10}
                placeholder='DESCRIPTION'
                value={description}
                onChange={this.handleChange.bind(this, 'description')}
                style={{ width: '180px', background: '#F0F0F0', border: 'none', fontSize: '1.2em'}}
              /><br /><br />
              <Button width={'160px'} type="submit">CREATE</Button>
              <Button width={'160px'} onClick={this.createNewCategory}>CANCEL</Button>
            </Form>
          )
      } else {
        return (
          <PlusIcon onClick={this.createNewCategory} background={'lightgrey'} top={'18px'} width={'15px'} height={'15px'} right={'5px'}/>
        )
      }
    }
}

const mapDispatchToProps = {
    createCategory: projectRedux.thunks.categoryCreation
}

const mapStateToProps = state => ({
    isLoading: state.global.isLoading,
    project: state.projects.project,
    section: state.projects.section,
    category: state.projects.category
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCategory))
