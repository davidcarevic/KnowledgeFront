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

class CreateCategory extends Component {
  constructor(props) {
    super(props);
  }

    state = {
        name: '',
        description: '',
        newCategory: false
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history, project, section, isLoading } = this.props
        const { name, description } = this.state;
        console.log(" PROPS U CREATE CAT", this.props)
        if (this.props.first && !isLoading) {
          const section_id = section.id
          this.props.createCategory(name, description, section_id);
        } else {
          const section_id = section.id
          this.props.createCategory(name, description, section_id, this.props.categories);
        }
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
        const { name, description, newCategory } = this.state;
        const { first } = this.props
        if (first) {
          return (
            <Form onSubmit={this.handleFormSubmit}>
                <Title>Create first category.</Title>
                <Input id="name" placeholder="CATEGORY NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
                <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
                <Button type="submit">CREATE</Button><hr/>
            </Form>
          )
        }
        if (newCategory) {
          return (
            <Form onSubmit={this.handleFormSubmit}>
                <Input width={'auto'} id="name" placeholder="CATEGORY NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
                <TextArea width={'auto'} id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
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
