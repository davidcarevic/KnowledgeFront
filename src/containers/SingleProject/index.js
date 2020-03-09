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
import CreateSection from '../CreateSection';
import CreateCategory from '../CreateCategory';
import sortCategoryElements from "../DragAndDrop/sort";


class SingleProject extends Component {
    state = {
        selected_section: '',
        selected_category: '',
        selected_element: '',
        elements:[],
        items:[]
    }

    componentDidMount() {
        if (!this.props.isLoading && this.state.elements.length<1) {
            this.props.getProject(this.props.match.params.id)
            this.setState({elements:sortCategoryElements(this.props.categories)})
           //this.setState({items:sortCategoryElements(this.props.categories[0])})
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleSectionChange = (e) => {
        e.preventDefault();
        this.setState({
            selected_section: e.target.id
        })
        this.props.getSectionCategories(e.target.id)
        this.props.setSection(e.target)
    }

    render() {
        const { project, sections, categories, category, elements, section, isLoading } = this.props
        const project_id = this.props.match.params.id
        console.log("SINGLE PORJECT STATE", this.state)


        if (isLoading) {
            return <LoadingSpinner/>
        }

        if (sections.length < 1 && !isLoading) {
          return <CreateSection first />
        }

        if (categories.length<1 && !isLoading) {
          return <CreateCategory first />
        }

        else return (
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
                    {categories && category? <DragAndDrop type="categories" array={categories} category={category.id} changeCategory={this.props.changeCategory} setElements={this.props.setElements} section={section}/>:<div>asd</div>}
                </SideHolder>
                <MainHolder>
                    <h1>{category.name?category.name:''}</h1>
                    <div>{category.description?category.description:''}</div><hr />
                    {elements.length>0 && !isLoading?<DragAndDrop  type="elements" array={this.state.elements[category.id]} category={category.id} changeCategory={this.props.changeCategory} setElements={this.props.setElements} section={section}/>
                        :<h3>By clicking plus, create first element.</h3> }
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
    changeCategory: projectRedux.thunks.changeCategoryForElement,
    setElements:projectRedux.actions.setElements
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
