import { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props)
        this.state.editing = props.editing || false;
        this.state.content = props.content || '';
        this.state.first = props.first || true;
    }

    state = {
        content: '',
        type: '',
        first: true,
        editing: false
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSaveSubmit = (e) => {
        e.preventDefault();
        const { history } = this.props
        const { content, type } = this.state;
        const project_id = this.props.match.params.id
        const element_id = this.props.match.params.e_id
        this.props.createItem(content, type, element_id);
        history.push("/dashboard/projects/" + project_id);
    }

    handleUpdateSubmit = (e) => {
      e.preventDefault();
      const { content } = this.state
      const itemId = this.props.id
      this.props.updateItem(itemId, content)
    }

    handleDeleteSubmit = (e) => {
      e.preventDefault();
      const itemId = this.props.id
      this.props.deleteItem(itemId)
    }

    render() {
      return null
    }
}

export default Item
