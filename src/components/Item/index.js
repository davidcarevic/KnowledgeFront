import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props)
        this.state.editing = props.editing || false;
        this.state.content = props.content || '';
    }

    state = {
        content: '',
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


}

export default Item