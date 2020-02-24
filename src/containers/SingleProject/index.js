import React, { Component } from 'react';
import { connect } from 'react-redux'
import projectRedux from '../../redux/projects';
import { withRouter } from 'react-router-dom';

class SingleProject extends Component {
    state = {
        id: ''
    }

    componentDidMount() {
        if (!this.props.isLoading) {
            this.props.getProject(this.props.match.params.id)
            this.props.getProjectSections(this.props.project.id)
        }
    }

    render() {
        let project = this.props.project
        let categories = this.props.categories //ne valja mapiranje sredi!!!
        console.log("Categories: ", categories)
        return (
            <div>
                <p>{project.name}</p>
                <p>
                {!categories ? <div>No categories</div> : categories.map((item) =>

                        <p key={item.project.id} id={item.project.id} >{item.project.name}</p>
                )}
                </p>
            </div>
        )
      } 
      
}

const mapDispatchToProps = {
    getProject: projectRedux.thunks.retrieveProject,
    getProjectSections: projectRedux.thunks.retrieveProjectSections,
    getSectionCategories: projectRedux.thunks.retrieveSectionCategories
}

const mapStateToProps = state => ({
    project: state.projects.project,
    sections: state.projects.sections,
    categories: state.projects.categories
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProject))