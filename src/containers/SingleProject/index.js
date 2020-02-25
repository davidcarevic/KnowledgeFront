import React, { Component } from 'react';
import { connect } from 'react-redux'
import projectRedux from '../../redux/projects';
import { withRouter } from 'react-router-dom';
import StyledLink from "../../components/elements/Link";
import SideHolder from "../../components/blocks/SideHolder";
import MainHolder from "../../components/blocks/MainHolder";
import { Header, LeftHeaderHolder, RightHeaderHolder } from "../../components/blocks/HeaderHolder";
import HeaderButtons from "../../components/blocks/HeaderButtons";
import { PlusIcon, UserPlusIcon } from '../../components/elements/Icons';

class SingleProject extends Component {
    componentDidMount() {
        if (!this.props.isLoading) {
            this.props.getProject(this.props.match.params.id)
            this.props.getProjectSections(this.props.project.id)
        }
    }

    render() {
        const { project, sections} = this.props
        const project_id = this.props.match.params.id
        return (
            <div>
                <Header>
                <LeftHeaderHolder>
                    <h3>{project.name}</h3>
                    <StyledLink to={"/dashboard/projects/"+this.props.match.params.id+"/invite"}><UserPlusIcon /></StyledLink>
                </LeftHeaderHolder>
                <RightHeaderHolder>
                    {!sections ? <div>No sections</div> : sections.map((item) =>
                        <HeaderButtons key={item.id} id={item.id} >{item.name} </HeaderButtons>
                    )}
                    <StyledLink to={"/dashboard/projects/" + project_id + "/section-create"}><PlusIcon /></StyledLink>
                    
                    
                </RightHeaderHolder>
                </Header><hr />
                <SideHolder>
                    categories
                    
                </SideHolder>
                <MainHolder>
                    
                    <hr /><StyledLink to="/dashboard">Back to Dashboard</StyledLink>
                </MainHolder>
            </div>
        )
      } 
      
}

const mapDispatchToProps = {
    getProject: projectRedux.thunks.retrieveProject,
    getProjectSections: projectRedux.thunks.retrieveProjectSections,
    getSectionCategories: projectRedux.thunks.retrieveSectionCategories,
    getCategoryElements: projectRedux.thunks.retrieveCategoryElements
}

const mapStateToProps = state => ({
    project: state.projects.project,
    sections: state.projects.sections,
    categories: state.projects.categories,
    elements: state.projects.elements
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProject))