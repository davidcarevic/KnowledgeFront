import React, { Component } from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import StyledLink from "../../elements/Link";

class Popover extends Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <div>
        <Button id="PopoverFocus" type="button">
          Add new item
        </Button>
        <UncontrolledPopover onClick={this.toggle} placement="right" triger="focus" target="PopoverFocus" isOpen={this.state.popoverOpen} toggle={this.toggle}>
          <PopoverHeader>Select item type</PopoverHeader>
          <PopoverBody>
              <StyledLink to={"/dashboard/projects/" + this.props.project + "/section/" + this.props.section + "/category/" + this.props.category + "/element/" +
                  this.props.element + "/item-create/embed"}>Iframe</StyledLink><br/>
              <StyledLink to={"/dashboard/projects/" + this.props.project + "/section/" + this.props.section + "/category/" + this.props.category + "/element/" +
                  this.props.element + "/item-create/richText"}>Rich Text</StyledLink>
          </PopoverBody>
        </UncontrolledPopover>
      </div>
    );
  }
}

export default Popover