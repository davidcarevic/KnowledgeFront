import React, { Component } from "react";
import { Flex } from './styled';
import { PlusIcon } from '../../components/elements/Icons';

class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}
  
	render() {
		var { title, children } = this.props;
		const { opened } = this.state;

		if (opened) {
			title = this.props.title;
		} else {
			title = this.props.title;
		}

		return (
			<div>
				<h3 onClick={this.toggleBox}>
					<Flex>
                    <Flex>{title}</Flex>
                    <Flex right><PlusIcon /></Flex>
                    </Flex>
				</h3>
				{opened && (					
					<div>
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;