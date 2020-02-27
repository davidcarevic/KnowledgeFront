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
import LoadingSpinner from "../../components/elements/LoadingSpinner";
import Form from '../../components/elements/Form';
import DragAndDrop from '../DragAndDrop';

class SingleProject extends Component {
    state = {
        selected_section: '',
        selected_category: '',
        selected_element: ''
    }

    componentDidMount() {
        if (!this.props.isLoading) {
            this.props.getProject(this.props.match.params.id)
        } 
    }

    handleSectionChange = (e) => {
        e.preventDefault();
        this.setState({
            selected_section: e.target.id
        })
        this.props.getSectionCategories(e.target.id)
    }

    render() {
        const { project, sections, categories, elements, category, section } = this.props
        const project_id = this.props.match.params.id

        if (this.props.isLoading) {
            return <LoadingSpinner/>
        }
        return (
            <div>
                <Header>
                    <LeftHeaderHolder>
                        <Flex>
                        <h3>{project.name}</h3>
                        </Flex>
                        <Flex right>
                            <StyledLink to={"/dashboard/projects/" + this.props.match.params.id + "/invite"}><UserPlusIcon top={'15px'}/></StyledLink>
                        </Flex>
                        
                    </LeftHeaderHolder>
                    <RightHeaderHolder>
                        <Form>
                        {!sections ? <div>No sections</div> : sections.map((item, index) =>
                            <HeaderButtons key={index} id={item.id} onClick={this.handleSectionChange}>{item.name} </HeaderButtons>
                        )}
                        </Form>
                        <StyledLink to={"/dashboard/projects/" + project_id + "/section-create"}><PlusIcon top={'18px'}/></StyledLink>
                        
                        
                    </RightHeaderHolder>
                </Header>
                <SideHolder>
                    <DragAndDrop props={categories}/>
                    
                </SideHolder>
                <MainHolder>
                    {!category ? <h1>No Categories</h1> : <h1>{category.name}</h1>}
                    {!category ? '' : <div>{category.description}</div>}<hr />
                    {!elements ? <div>No elements</div> : elements.map((item, index) =>
                        <div key={index} id={item.id} ><h3>{item.title}</h3><p>{item.description}</p></div>
                    )}
                    {(!section || !category) ? '' : <StyledLink to={"/dashboard/projects/" + project_id + "/section/" + this.props.section.id + '/category/' + this.props.category.id + '/element-create'}><PlusIcon /></StyledLink>}
                    <hr /><StyledLink to="/dashboard">Back to Dashboard</StyledLink>
                </MainHolder>
            </div>
        )
      } 
      
}

const mapDispatchToProps = {
    getProject: projectRedux.thunks.retrieveProject,
    getSectionCategories: projectRedux.thunks.retrieveSectionCategories,
    getCategoryElements: projectRedux.thunks.retrieveCategoryElements,
    setSection: projectRedux.actions.setSection,
    setCategory: projectRedux.actions.setCategory,
    setElement: projectRedux.actions.setElement,
}

const mapStateToProps = state => ({
    isLoading: state.global.isLoading,
    project: state.projects.project,
    sections: state.projects.sections,
    categories: state.projects.categories,
    elements: state.projects.elements,
    section: state.projects.section,
    category: state.projects.category,
    element: state.projects.element
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleProject))