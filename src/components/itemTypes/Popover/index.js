import React, { Component } from 'react';
import StyledLink from "../../elements/Link";
import { ButtonS, StyledPopover} from "./styled"


class Popover extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: false,
			id: props.id
		};
		this.toggleBox = this.toggleBox.bind(this);
	}

	toggleBox(e) {
		e.persist()
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}

	render() {
		var sign;
		var { title, children , id} = this.props;
		const { opened } = this.state;

		if (opened) {
			title = 'Close';
		} else {
			title = 'Add new Item';
		}

		return (
			<div id={id}>
        <ButtonS onClick={this.toggleBox}>{title}</ButtonS>
				{opened && (
					<StyledPopover>
            <h4>Select Item Type</h4>
            <StyledLink
                to={"/dashboard/projects/" + this.props.project + "/section/" + this.props.section + "/category/" + this.props.category + "/element/" +
                this.props.element + "/item-create/embed"}>Iframe</StyledLink><br/>
            <StyledLink
                to={"/dashboard/projects/" + this.props.project + "/section/" + this.props.section + "/category/" + this.props.category + "/element/" +
                this.props.element + "/item-create/richText"}>Rich Text</StyledLink>
					</StyledPopover>
				)}
			</div>
		);
	}
}

export default Popover;
