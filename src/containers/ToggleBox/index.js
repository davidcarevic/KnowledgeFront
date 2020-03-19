import React from "react";
import { Flex } from './styled';

class ToggleBox extends React.Component {
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
		let current={}
		for (let i=0; i<this.props.category.length; i++) {
			if (this.props.id === this.props.category[i].id) {
				current=this.props.category[i]
			}
		}
		if (opened === false) {
			this.props.changeActiveCategory(current)
		}
	}

	render() {
		var sign;
		var { title, children , id} = this.props;
		const { opened } = this.state;

		if (opened) {
			title = this.props.title;
			sign = '-';
		} else {
			title = this.props.title;
			sign = '+';
		}

		return (
			<div id={id}>
				<h3 onClick={this.toggleBox}>
					<Flex>
            <Flex>{title}</Flex>
            <Flex right>{sign}</Flex>
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
