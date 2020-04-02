import React, { Component } from 'react';
import { connect } from 'react-redux'
import projectRedux from '../../redux/projects';
import { withRouter } from 'react-router-dom';
import StyledLink from "../../components/elements/Link";
import SideHolder from "../../components/blocks/SideHolder";
import MainHolder from "../../components/blocks/MainHolder";
import { Header, LeftHeaderHolder, RightHeaderHolder } from "../../components/blocks/HeaderHolder";
import { UserPlusIcon } from '../../components/elements/Icons';
import { Flex } from './styled';
import LoadingSpinner from "../../components/elements/LoadingSpinner";
import DragAndDrop from '../DragAndDrop';
import CreateSection from '../CreateSection';
import CreateCategory from '../CreateCategory';
import CreateElement from '../CreateElement';
import SingleCategory from '../../components/SingleCategory';
import Section from '../../components/Section';
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
            this.props.getProject(this.props.match.params.id)
        }

    }

    render() {
        const { project, sections, categories, category, section, isLoading } = this.props
        const project_id = project.id

        if (isLoading) {
            return <LoadingSpinner/>
        }

        if (project['role'] !== 'viewer' && sections.length < 1 && !isLoading) {
          return <CreateSection first={true} />
        }

        if (project['role'] !== 'viewer' && categories.length < 1 && !isLoading) {
          return <CreateCategory first />
        }

        return (
            <div>
                <Header>
                    <LeftHeaderHolder>
                        <Flex>
                        <h3>{project.name}</h3>
                        </Flex>
                        <Flex right>
                        { project['role'] === 'admin' ?
                            <StyledLink to={"/dashboard/projects/" + this.props.match.params.id + "/invite"}>
                              <UserPlusIcon background={'lightgrey'} top={'18px'} width={'15px'} height={'15px'} right={'5px'}/>
                            </StyledLink> : ''
                        }
                        </Flex>

                    </LeftHeaderHolder>
                    <RightHeaderHolder>
                      { (project['role'] === 'admin' || project['role'] === 'editor') ?
                        <CreateSection /> : ''
                      }
                        <Flex top={'15px'}>
                          {!sections ? <div>No sections</div> : sections.map((item, index) =>
                              <Section role={project['role']} section={item} key={index} id={item.id} project={this.props.project} name={item.name}/>
                          )}
                        </Flex>
                    </RightHeaderHolder>
                </Header>
                <SideHolder top={'15%'}>
                  { (project['role'] === 'admin' || project['role'] === 'editor') ?
                    <CreateCategory categories={this.props.categories} /> : ''
                  }
                    {categories && category? <DragAndDrop type="categories" reorderElements={this.props.reorderElements}
                        array={categories} hisCat={this.props.categories} activeCategory={this.props.category} changeActiveCategory={this.props.changeActiveCategory}
                        category={category.id} changeCategory={this.props.changeCategory} setElements={this.props.setElements}
                        section={section} categoryObj={category} role={project['role']} />:<div>asd</div>}
                </SideHolder>
                <MainHolder top={'18%'}>
                    <SingleCategory role={project['role']} id={category.id} name={category.name} description={category.description} /><hr />
                    {category.elements ? <DragAndDrop type="elements" changeElementForItem={this.props.changeElementForItem}
                        reorderItems={this.props.reorderItems}  array={category.elements} project={project_id} section_id={section.id}
                        category={category.id} setElements={this.props.setElements} section={section} catObj={category}
                        role={project['role']} />
                        : '' }
                        { (project['role'] === 'admin' || project['role'] === 'editor') ?
                          <CreateElement /> : ''
                        }
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
