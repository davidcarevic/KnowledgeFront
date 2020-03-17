import React, {useState} from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import StyledLink from "../../elements/Link";
import {ButtonS, UncontrolledPopoverStyled, BodyStyled,HeaderStyled} from "./styled"


const Popover=(props)=> {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const toggle = () => setPopoverOpen(!popoverOpen);
    return (
        <div>
            <ButtonS key={props.element} id={"PopoverFocus" + props.element} type="button" onClick={toggle}>
                Add new item
            </ButtonS>
            <UncontrolledPopoverStyled placement="right" triger="focus" target={"PopoverFocus" + props.element}
                                 isOpen={popoverOpen} toggle={toggle}>
                <HeaderStyled>Select item type</HeaderStyled>
                <BodyStyled>
                    <StyledLink
                        to={"/dashboard/projects/" + props.project + "/section/" + props.section + "/category/" + props.category + "/element/" +
                        props.element + "/item-create/embed"}>Iframe</StyledLink><br/>
                    <StyledLink
                        to={"/dashboard/projects/" + props.project + "/section/" + props.section + "/category/" + props.category + "/element/" +
                        props.element + "/item-create/richText"}>Rich Text</StyledLink>
                </BodyStyled>
            </UncontrolledPopoverStyled>
        </div>
    )
}

export default Popover
