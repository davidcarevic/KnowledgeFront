import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
import Embed from '../../components/itemTypes/Iframe';
import RichText from '../../components/itemTypes/RichText';
import Button from '../../components/elements/Button';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import { StyledPopover } from './styled';
import SunEditor, { buttonList } from 'suneditor-react';
import { Base64 } from 'js-base64';

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.handlePopover = this.handlePopover.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  state = {
    type: '',
    content: '',
    opened: false,
    button: 'Add new Item'
  }


  handleInputChange = (e) => {
      this.setState({ [e.target.id]: e.target.value })
  }

  handlePopover = (e) => {
    e.persist()
    if (this.state.opened) {
      this.setState({
        opened: false,
        button: 'Add new Item',
        type: '',
        content: ''
      })
    } else {
      this.setState({
        opened: true,
        button: 'Close',
      })
    }
  }

  handleItemCreate(type) {
    this.setState({
      type: type
    })
  }

  handleChange(cont) {
    var encodedData = Base64.encode(cont);
    this.setState({
      content: encodedData
    })
  }

  handleSaveSubmit = (e) => {
      e.preventDefault();
      const { content, type } = this.state;
      const category = this.props.category
      const element_id = this.props.element
      this.props.createItem(content, type, element_id, category);
      this.setState({
          opened: false,
          button: 'Add new Item',
          type: '',
          content: ''
      })
  }

  render() {
  const { type, content, button, opened } = this.state

    if (type === 'embed' && opened) {
      return (
        <div>
        <Form onSubmit={this.handleSaveSubmit}>
            <Input id="content" placeholder="ENTER YOUR URL" type="text" value={content} onChange={this.handleInputChange} /><br/><br/>
            <Button type="submit">CREATE</Button>
        </Form>
          <Button onClick={this.handlePopover}>CANCEL</Button>
        </div>
      )
    }

    if (type === 'richText' && opened) {
      return (
        <div>
        <Form onSubmit={this.handleSaveSubmit}>
            <SunEditor onChange={this.handleChange} editing={true} placeholder="Please type here..." autoFocus={true} enable={true} showToolbar={true}
              setOptions={{
                height: 'auto',
                width: 'auto',
                buttonList: buttonList.complex}}/><br/><br/>
            <Button type="submit">CREATE</Button>
        </Form>
        <Button onClick={this.handlePopover}>CANCEL</Button>
        </div>
      )
    }

    return (
      <div>
        <Button width={'150px'} onClick={this.handlePopover}>{button}</Button>
        {opened && (
					<StyledPopover>
            <h4>Select Item Type</h4>
						<div onClick={() => this.handleItemCreate('embed')}>Iframe</div>
						<div onClick={() => this.handleItemCreate('richText')}>Rich Text</div>
					</StyledPopover>
				)}
      </div>
    )

  }
}

const mapDispatchToProps = {
  createItem: projectRedux.thunks.itemCreation,
}

const mapStateToProps = state => ({
  category: state.projects.category
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateItem))
