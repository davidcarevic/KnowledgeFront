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

class CreateSection extends Component {
    state = {
        title: '',
        description: '',
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props
        const { title, description } = this.state;
        const project_id = this.props.match.params.id
        const category_id = this.props.match.params.c_id
        this.props.createElement(title, description, category_id);
        history.push("/dashboard/projects/" + project_id);
    }

    render() {
        const { title, description } = this.state;
        const project_id = this.props.match.params.id
        return (
        <Form onSubmit={this.handleFormSubmit}>
            <Title>CREATE YOUR ELEMENT!</Title>
            <Input id="title" placeholder="ELEMENT TITLE" type="text" value={title} onChange={this.handleInputChange} /><br/><br/>
            <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
            <Button type="submit">CREATE</Button><hr/>
            <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink>
        </Form>
        )
    }
}

const mapDispatchToProps = {
    createElement: projectRedux.thunks.elementCreation
}

const mapStateToProps = state => ({
    element: state.projects.element
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateSection))