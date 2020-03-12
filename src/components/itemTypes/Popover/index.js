import React, { Component } from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import StyledLink from "../../elements/Link";

const Popover=(props)=>(
    <div>
        <div>{props.element}</div>
        <Button key={props.element} id={"PopoverFocus"+props.element} type="button">
            Add new item
        </Button>
        <UncontrolledPopover  placement="right" triger="focus" target={"PopoverFocus"+props.element}>
            <PopoverHeader>Select item type</PopoverHeader>
            <PopoverBody>
                <StyledLink
                    to={"/dashboard/projects/" + props.project + "/section/" + props.section + "/category/" + props.category + "/element/" +
                    props.element + "/item-create/embed"}>Iframe</StyledLink><br/>
                <StyledLink
                    to={"/dashboard/projects/" + props.project + "/section/" + props.section + "/category/" + props.category + "/element/" +
                    props.element+ "/item-create/richText"}>Rich Text</StyledLink>
            </PopoverBody>
        </UncontrolledPopover>
    </div>
)
export default Popover