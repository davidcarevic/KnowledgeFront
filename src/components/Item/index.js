import { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props)
        this.state.editing = props.editing || false;
        this.state.content = props.content || '';
    }

    state = {
        content: '',
        type: '',
        editing: false
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleUpdateSubmit = (e) => {
      e.preventDefault();
      const { content, type } = this.state
      const itemId = this.props.id
      if (type === 'codeSnipet') {
        var codeContent = {}
        codeContent['code'] = content['code']
        codeContent['language'] = content['language']
        this.props.updateItem(itemId, codeContent, this.props.category)
      } else {
        this.props.updateItem(itemId, content, this.props.category)
      }

        this.setState({
            editing: false,
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
