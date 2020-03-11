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
  constructor(props) {
    super(props);
  }

    state = {
        name: '',
        description: '',
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history, project, section, isLoading } = this.props
        const { name, description } = this.state;

        if (this.props.first && !isLoading) {
          const project_id = project.id
          const section_id = section.id
          this.props.createCategory(name, description, section_id);
          history.push("/dashboard/projects/" + project_id);
        } else {
          const project_id = this.props.match.params.id
          const section_id = this.props.match.params.s_id
          this.props.createCategory(name, description, section_id);
          history.push("/dashboard/projects/" + project_id);
        }
    }

    render() {
        const { name, description } = this.state;
        const { first } = this.props
        const project_id = this.props.match.params.id
        return (
        <Form onSubmit={this.handleFormSubmit}>
            <Title>{!first ? 'CREATE YOUR CATEGORY!' : 'Create first category.'}</Title>
            <Input id="name" placeholder="CATEGORY NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
            <TextArea id="description" placeholder="DESCRIPTION" value={description} onChange={this.handleInputChange} /><br/><br/>
            <Button type="submit">CREATE</Button><hr/>
            {!first ? <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink> : ''}
        </Form>
        )
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
