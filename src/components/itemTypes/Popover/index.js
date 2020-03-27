import React, { Component } from 'react';
import StyledLink from "../../elements/Link";
import { ButtonS, StyledPopover} from "./styled"
import CreateItem from '../../../containers/CreateItem';


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
		var { title, id} = this.props;
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
						<div>
							<CreateItem type={'embed'}/>
						</div>
						<div>
							<CreateItem type={'richText'}/>
						</div>
					</StyledPopover>
				)}
			</div>
		);
	}
}

export default Popover;
