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

class CreateCategory extends Component {
    state = {
        name: '',
        description: '',
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props
        const { name, description } = this.state;
        const project_id = this.props.match.params.id
        const section_id = this.props.match.params.s_id
        this.props.createCategory(name, description, section_id);
        history.push("/dashboard/projects/" + project_id);
    }

    render() {
        const { name, description } = this.state;
        const project_id = this.props.match.params.id
        return (
        <Form onSubmit={this.handleFormSubmit}>
            <Title>CREATE YOUR CATEGORY!</Title>
            <Input id="name" placeholder="CATEGORY NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
            <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
            <Button type="submit">CREATE</Button><hr/>
            <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink>
        </Form>
        )
    }
}

const mapDispatchToProps = {
    createCategory: projectRedux.thunks.categoryCreation
}

const mapStateToProps = state => ({
    category: state.projects.category
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCategory))