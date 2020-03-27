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
import CreateElement from '../CreateElement';
import SingleCategory from '../../components/SingleCategory'
// import sortCategoryElements from "../DragAndDrop/sort";


class SingleProject extends Component {
    state = {
        selected_section: '',
        selected_category: '',
        selected_element: '',
        elements:[],
        items:[]
    }

    componentDidMount() {
        if (!this.props.isLoading) {
            this.props.getProject(this.props.match.params.id, this.props.category)
        }
    }

    handleSectionChange = (e) => {
        e.preventDefault();
        this.setState({
            selected_section: e.target.id
        })
        this.props.getSectionCategories(e.target.id, this.props.category)
        this.props.setSection(e.target)
    }

    render() {
        const { project, sections, categories, category, section, isLoading } = this.props
        const { newElement } = this.state
        const project_id = this.props.match.params.id

        //console.log("CATEGORY U single porject ",this.props.category)


        if (isLoading) {
            return <LoadingSpinner/>
        }

        if (sections.length < 1 && !isLoading) {
          return <CreateSection first />
        }

        if (categories.length<1 && !isLoading) {
          return <CreateCategory first />
        }

        else  return (
            <div>
                <Header>
                    <LeftHeaderHolder>
                        <Flex>
                        <h3>{project.name}</h3>
                        </Flex>
                        <Flex right>
                            <StyledLink to={"/dashboard/projects/" + this.props.match.params.id + "/invite"}>
                              <UserPlusIcon background={'lightgrey'} top={'18px'} width={'15px'} height={'15px'} right={'5px'}/>
                            </StyledLink>
                        </Flex>

                    </LeftHeaderHolder>
                    <RightHeaderHolder>
                        <StyledLink to={"/dashboard/projects/" + project_id + "/section-create"}>
                          <PlusIcon background={'lightgrey'} top={'18px'} width={'15px'} height={'15px'} right={'5px'}/>
                        </StyledLink>
                        <Form>
                        {!sections ? <div>No sections</div> : sections.map((item, index) =>
                            <HeaderButtons key={index} id={item.id} onClick={this.handleSectionChange}>{item.name} </HeaderButtons>
                        )}
                        </Form>
                    </RightHeaderHolder>
                </Header>
                <SideHolder top={'13%'}>
                    <StyledLink to={"/dashboard/projects/" + project_id + "/section/" + this.props.section.id + '/category-create/'}>
                      Add new Category</StyledLink>
                    {categories && category? <DragAndDrop type="categories" reorderElements={this.props.reorderElements}
                        array={categories} hisCat={this.props.categories} changeActiveCategory={this.props.changeActiveCategory}
                        category={category.id} changeCategory={this.props.changeCategory} setElements={this.props.setElements}
                        section={section} categoryObj={category}/>:<div>asd</div>}
                </SideHolder>
                <MainHolder top={'18%'}>
                    <SingleCategory id={category.id} name={category.name} description={category.description} /><hr />
                    {category.elements?<DragAndDrop type="elements" changeElementForItem={this.props.changeElementForItem}
                        reorderItems={this.props.reorderItems}  array={category.elements} project={project.id} section_id={section.id}
                        category={category.id} setElements={this.props.setElements} section={section} catObj={category}/>
                        :<h3>By clicking plus, create first element.</h3> }
                    {(!section || !category) ? '' : <CreateElement />}
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
    setElements:projectRedux.actions.setElements,
    changeActiveCategory: projectRedux.thunks.changeCategory,
    reorderElements: projectRedux.thunks.reorderElements,
    reorderItems: projectRedux.thunks.reorderItems,
    changeElementForItem: projectRedux.thunks.changeElementForItem,
    createElement: projectRedux.thunks.elementCreation,
    createItem: projectRedux.thunks.itemCreation
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
