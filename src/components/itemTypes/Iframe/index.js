import React from 'react';
import Iframe from 'react-iframe'
import Form from '../../elements/Form';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import StyledLink from "../../elements/Link";
import projectRedux from '../../../redux/projects';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Item from '../../Item'

class Embed extends Item {
    state = {
        type: 'embed'
    }
    
      render() {
        const { content } = this.state
        const project_id = this.props.match.params.id
        if (this.props.editing) {
            return (
                <Form onSubmit={this.handleFormSubmit}>
                    <Input id="content" placeholder="ENTER YOUR URL" type="text" value={content} onChange={this.handleInputChange} /><br/><br/>
                    <Button type="submit">CREATE</Button><hr/>
                    <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink>
                </Form>
            )
        }
        return (
            <Iframe url={this.props.content}/>
        )
    }
}

const mapDispatchToProps = {
    createItem: projectRedux.thunks.itemCreation
}

const mapStateToProps = state => ({
    isLoading: state.global.isLoading,
    element: state.projects.element
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Embed))