import React, { Component } from 'react';
import { connect } from 'react-redux';
// import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
import Embed from '../../components/itemTypes/Iframe';
import RichText from '../../components/itemTypes/RichText';
import Button from '../../components/elements/Button';
import { StyledPopover } from './styled';

class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.handlePopover = this.handlePopover.bind(this);
  }

  state = {
    type: '',
    opened: false,
    button: 'Add new Item'
  }

  handlePopover = (e) => {
    e.persist()
    if (this.state.opened) {
      this.setState({
        opened: false,
        button: 'Add new Item',
        type: ''
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

  render() {
  const { type, button, opened } = this.state

    if (type === 'embed') {
      return (
        <div>
          <Embed id={this.props.element} category={this.props.category} editing={true}/>
          <Button onClick={this.handlePopover}>CANCEL</Button>
        </div>
      )
    }

    if (type === 'richText') {
      return (
        <div>
          <RichText id={this.props.element} category={this.props.category} editing={true}/>
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

}

const mapStateToProps = state => ({
  category: state.projects.category
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateItem))
