import React, { Component } from 'react';
import Iframe from 'react-iframe'
import Form from '../../elements/Form';
import Input from '../../elements/Input';
import Button from '../../elements/Button';
import StyledLink from "../../elements/Link";
import projectRedux from '../../../redux/projects';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Embed extends Component {
    constructor(props) {
        super(props);
        this.state.editing = props.editing || false;
        this.state.url = props.data || '';
    }
    
    state = {
        url: '',
        editing: false
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { history, element, isLoading } = this.props
        const { url } = this.state;
        const project_id = this.props.match.params.id
        const element_id = this.props.match.params.e_id
        this.props.createItem(url, 'embed', element_id);
        history.push("/dashboard/projects/" + project_id);
    }

      render() {
        const { url } = this.state
        const project_id = this.props.match.params.id
            if (this.state.editing)
                return (
                <Form onSubmit={this.handleFormSubmit}>
                    <Input id="url" placeholder="ENTER YOUR URL" type="text" value={url} onChange={this.handleInputChange} /><br/><br/>
                    <Button type="submit">CREATE</Button><hr/>
                    <StyledLink to={"/dashboard/projects/" + project_id}>Back to Project</StyledLink>
                </Form>
            )
            return (
                <Iframe url={this.state.url}/>
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



// save(){
//     let data = convertTob64(this.state.htmlData)
//     this.props.onSave(data)
// }

// saveItem()

// {
//     "itemType": "Embed",
//     "data": "https://kroonstudio.com/"
// }


// <Embed can-edit={true} on-save={saveItem} data={}>