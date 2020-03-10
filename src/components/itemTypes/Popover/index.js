import React, { useState } from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import { PlusIcon } from '../../elements/Icons';
import StyledLink from "../../elements/Link";

const Popover = (props) => {

  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
    console.log("ELEMENT ID: ", props.element)
  return (
    <div>
      <Button id="PopoverFocus" type="button">
        Add new item
      </Button>
      <UncontrolledPopover placement="right" triger="focus" target="PopoverFocus">
        <PopoverHeader>Select item type</PopoverHeader>
        <PopoverBody>
            <StyledLink to={"/dashboard/projects/" + props.project + "/section/" + props.section + "/category/" + props.category + "/element/" +
                props.element + "/item-create/embed"}>Iframe</StyledLink><br/>
            <StyledLink to={"/dashboard/projects/" + props.project + "/section/" + props.section + "/category/" + props.category + "/element/" +
                props.element + "/item-create/richText"}>Rich Text</StyledLink>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

export default Popover;