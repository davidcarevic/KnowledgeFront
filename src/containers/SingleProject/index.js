import React, { Component } from 'react';
import { connect } from 'react-redux'
import projectRedux from '../../redux/projects';
import { withRouter } from 'react-router-dom';

class SingleProject extends Component {
    state = {
        id: ''
    }

    componentDidMount() {
        let id = this.props.match.params.id
        if (!this.props.isLoading) {
            this.props.getProject(id)
        }
    }

    render() {
        let project = this.props.project
        console.log("Props: ", this.props)
        return (
            <div>
                <p>{project.name}</p>
            </div>
        )
      } 
      
}

const mapDispatchToProps = {
    getProject: projectRedux.thunks.retrieveProject,
}

const mapStateToProps = state => ({
    project: state.projects.project
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProject))