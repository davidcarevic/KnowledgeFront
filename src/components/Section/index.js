import React, { Component } from 'react';
import { connect } from 'react-redux';
import projectRedux from '../../redux/projects'
import { withRouter } from 'react-router-dom';

class Section extends Component {
    constructor(props) {
        super(props)
    }

    state = {
      editing: false,
      buttonText: 'Edit',
      content: this.props.content
    }

    handleEditingMode = (e) => {
      e.preventDefault();
      if (this.state.editing) {
        this.setState({
          editing: false,
          buttonText: 'Edit',
        })
      }
      else {
        this.setState({
          editing: true,
          buttonText: 'Cancel',
        })
      }
    }

    handleSectionChange = (e) => {
        this.setState({
            selected_section: e.target.id
        })
        this.props.getSectionCategories(e.target.id)
        this.props.getCategoryElements(this.props.category.id)
    }

    handleUpdateMode = (e) => {
      e.preventDefault()
      
    }


    render() {
        return (
          <div key={this.props.key} id={this.props.id} onClick={this.handleSectionChange}>{this.props.name}</div>
        )
    }
}

const mapDispatchToProps = {
    getSectionCategories: projectRedux.thunks.retrieveSectionCategories,
    setSection: projectRedux.actions.setSection,
    getCategoryElements: projectRedux.thunks.retrieveCategoryElements,
}

const mapStateToProps = state => ({
    element: state.projects.element,
    category: state.projects.category
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Section))
