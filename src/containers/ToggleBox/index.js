import React, { Component } from "react";

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

		if (opened){
			title = this.props.title;
		}else{
			title = this.props.title;
		}

		return (
			<div>
				<h3 onClick={this.toggleBox}>
					{title}
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