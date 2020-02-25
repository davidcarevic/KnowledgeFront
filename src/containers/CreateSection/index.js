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
        this.props.createSection(name, description, project_id);
        history.push("/dashboard/projects/" + project_id);
    }

    render() {
        const { name, description } = this.state;
        const project_id = this.props.match.params.id;
        return (
        <Form onSubmit={this.handleFormSubmit}>
            <Title>CREATE YOUR SECTION!</Title>
            <Input id="name" placeholder="SECTION NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
            <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
            <Button type="submit">CREATE</Button><hr/>
            <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink>
        </Form>
        )
    }
}

const mapDispatchToProps = {
    createSection: projectRedux.thunks.sectionCreation
}

const mapStateToProps = state => ({
    section: state.projects.section
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateSection))