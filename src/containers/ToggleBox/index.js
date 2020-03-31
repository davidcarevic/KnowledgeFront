import React from "react";
import { Flex } from './styled';
import { connect } from 'react-redux'
import projectRedux from '../../redux/projects';

class ToggleBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			opened: true,
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

	changeActiveCategory = (e) => {
		e.persist();
		e.stopPropagation();
		let current = {}
		for (let i = 0; i < this.props.category.length; i++) {
			if (this.props.id === this.props.category[i].id) {
				current = this.props.category[i]
			}
		}
		if (current.id !== this.props.activeCategory.id) {
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
				<h3>
					<Flex>
            <Flex onClick={this.changeActiveCategory}>{title}</Flex>
            <Flex right onClick={this.toggleBox}>{sign}</Flex>
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

const mapDispatchToProps = {}

const mapStateToProps = state => ({
    activeCategory: state.projects.category,
})

export default connect(mapStateToProps, mapDispatchToProps)(ToggleBox)
