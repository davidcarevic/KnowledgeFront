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
import { Flex } from './styled';

class SingleProject extends Component {
    componentDidMount() {
        if (!this.props.isLoading) {
            this.props.getProject(this.props.match.params.id)
            this.props.getProjectSections(this.props.project.id)
            this.props.setSection(this.props.sections[0])
            console.log("SECTION", this.props.section)
            this.props.setSection(this.props.sections[0])
            this.props.getSectionCategories(this.props.sections[0].id)
            this.props.setCategory(this.props.categories[0])
            console.log("CATEGORY", this.props.category)
            this.props.getCategoryElements(this.props.categories[0].id)
        }
    }

    handleSectionChange = (e) => {
        e.preventDefault();

    }

    render() {
        const { project, sections, categories, elements, section, category, element } = this.props
        const project_id = this.props.match.params.id
        return (
            <div>
                <Header>
                    <LeftHeaderHolder>
                        <Flex>
                        <h3>{project.name}</h3>
                        </Flex>
                        <Flex right>
                            <StyledLink to={"/dashboard/projects/"+this.props.match.params.id+"/invite"}><UserPlusIcon top={'15px'}/></StyledLink>
                        </Flex>
                        
                    </LeftHeaderHolder>
                    <RightHeaderHolder>
                        {!sections ? <div>No sections</div> : sections.map((item) =>
                            <HeaderButtons key={item.id} id={item.id} >{item.name} </HeaderButtons>
                        )}
                        <StyledLink to={"/dashboard/projects/" + project_id + "/section-create"}><PlusIcon top={'18px'}/></StyledLink>
                        
                        
                    </RightHeaderHolder>
                </Header>
                <SideHolder>
                {!categories ? <div>No categories</div> : categories.map((item) =>
                        <Flex><Flex key={item.id} id={item.id} >{item.name}</Flex><Flex right><PlusIcon width={'15px'} height={'15px'}/></Flex></Flex>
                    )}
                    
                </SideHolder>
                <MainHolder>
                <h1>{category.name}</h1>
                <div>{category.description}</div><hr />
                {!elements ? <div>No elements</div> : elements.map((item) =>
                    <div key={item.id} id={item.id} ><h3>{item.title}</h3><p>{item.description}</p><hr /></div>
                    )}
                    <StyledLink to="/dashboard">Back to Dashboard</StyledLink>
                </MainHolder>
            </div>
        )
      } 
      
}

const mapDispatchToProps = {
    getProject: projectRedux.thunks.retrieveProject,
    getProjectSections: projectRedux.thunks.retrieveProjectSections,
    getSectionCategories: projectRedux.thunks.retrieveSectionCategories,
    getCategoryElements: projectRedux.thunks.retrieveCategoryElements,
    setSection: projectRedux.actions.setSection,
    setCategory: projectRedux.actions.setCategory,
    setElement: projectRedux.actions.setElement,
}

const mapStateToProps = state => ({
    project: state.projects.project,
    sections: state.projects.sections,
    categories: state.projects.categories,
    elements: state.projects.elements,
    section: state.projects.section,
    category: state.projects.category,
    element: state.projects.element
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProject))