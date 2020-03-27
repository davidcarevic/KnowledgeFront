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
import ReactHtmlParser from 'react-html-parser';
import { PlusIcon } from '../../components/elements/Icons';
// import onClickOutside from "react-onclickoutside";

class CreateElement extends Component {
    state = {
        title: '',
        description: '',
        newElement: false
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props
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
                <Input id="title" placeholder="ELEMENT TITLE" type="text" value={title} onChange={this.handleInputChange} /><br/><br/>
                <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateElement))
