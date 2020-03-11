import React from "react";
import { Flex } from './styled';
import { PlusIcon } from '../../components/elements/Icons';

class ToggleBox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false,
			id:props.id
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox(e) {
		e.persist()
		console.log("OVDE ",this.state.id)
		console.log("PROPOVI U TOGGLE ",this.props)
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
		let current={}
		for(let i=0;i<this.props.category.length;i++){
			if(this.props.id===this.props.category[i].id){
				current=this.props.category[i]
			}
		}
		this.props.changeActiveCategory(current)
	}
  
	render() {
		var { title, children ,id} = this.props;
		const { opened } = this.state;

		if (opened) {
			title = this.props.title;
		} else {
			title = this.props.title;
		}

		return (
			<div id={id}>
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