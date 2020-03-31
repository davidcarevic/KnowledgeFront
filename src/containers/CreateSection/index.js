import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Title from '../../components/elements/Title';
import Form from '../../components/elements/Form';
import Input from '../../components/elements/Input';
import { PlusIcon } from '../../components/elements/Icons';
import AutosizeInput from 'react-input-autosize';

class CreateSection extends Component {
  constructor(props) {
    super(props);
    this.state.first = this.props.first
  }

    state = {
        name: '',
        first: this.props.first,
        description: 'Description',
        newSection: false
    }

    handleChange = (input, event) => {
		const newState = {};
		newState[input] = event.target.value;
		this.setState(newState);
	};

    handleInputChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    createNewSection = (e) => {
      e.preventDefault();
      if (this.state.newSection) {
        this.setState({
          newSection: false,
          title: '',
          description: 'Description',
        })
      } else {
        console.log("NEW SECTION: ", this.state.newSection)
        this.setState({
          newSection: true,
        })
      }
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { project } = this.props
        const { name, description } = this.state;
        const project_id = project.id
        this.props.createSection(name, description, project_id);
    }

    render() {
        const { name, newSection, first } = this.state;
        if (first) {
          return (
            <div>
            <h1>To start your project create first section.</h1>
              <Form onSubmit={this.handleFormSubmit}>
                <Input id="name" placeholder="SECTION NAME" type="text" value={name} onChange={this.handleInputChange} /><br/><br/>
                <Button width={'315px'} type="submit">CREATE</Button>
              </Form>
            </div>
          )
        }
        if (newSection) {
          return (
            <Form onSubmit={this.handleFormSubmit}>
              <AutosizeInput
                placeholder="SECTION NAME"
                placeholderIsMinWidth
                name="form-field-name"
                value={name}
                onChange={this.handleChange.bind(this, 'name')}
                style={{ border: 'none' }}
                inputStyle={{ background: '#F0F0F0', border: 'none', padding: 5, fontSize: '1em', fontWeight: 'bold' }}
              /><br /><br />
              <Button width={'157px'} type="submit">CREATE</Button>
              <Button width={'157px'} onClick={this.createNewSection}>CANCEL</Button>
            </Form>
          )
      } else {
        return (
          <PlusIcon onClick={this.createNewSection} background={'lightgrey'} top={'18px'} width={'15px'} height={'15px'} right={'5px'}/>
        )
      }
    }
}

const mapDispatchToProps = {
    createSection: projectRedux.thunks.sectionCreation
}

const mapStateToProps = state => ({
    isLoading: state.global.isLoading,
    project: state.projects.project,
    section: state.projects.section
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateSection))
