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
        const { content, type } = this.state;
        const category = this.props.category
        const element_id = this.props.id
        this.props.createItem(content, type, element_id, category);
        this.setState({
            editing: false
        })
    }

    handleUpdateSubmit = (e) => {
      e.preventDefault();
      const { content } = this.state
      const itemId = this.props.id
      this.props.updateItem(itemId, content, this.props.category)
        this.setState({
            editing: false
        })
    }

    handleDeleteSubmit = (e) => {
      e.preventDefault();
      const itemId = this.props.id
      this.props.deleteItem(itemId, this.props.category)
        this.setState({
            editing: false
        })
    }

    render() {
      return null
    }
}

export default Item
