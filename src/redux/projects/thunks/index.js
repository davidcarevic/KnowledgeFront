import { createProject, getProjects, getProjectsByUser, getSingleProject, getProjectSections, getSectionCategories,
    getCategoryElements, createSection, createCategory, createElement, elementCategoryChange, createItem,
    reorderElementsForCategory, reorderItemsForElement, itemElementChange, updateItem, updateElement,
    updateCategory, updateSection, updateProject, deleteItem, deleteElement, deleteCategory, deleteSection,
    deleteProject} from "../../../services";
import { setProjectsByTeam, setProjectsByUser, setProject, setSections, setCategories, setElements,
    setSection, setCategory, setElement, setItem, editItem, editElement, editCategory, editSection,
    editProject, removeItem, removeElement, removeCategory, removeSection, removeProject } from "../actions";
import { isLoading } from "../../global/actions";
//notifications
import {projectCreateError,projectCreateSuccess} from "../../../components/elements/Notifications/ProjectCreate";
import {generalError} from "../../../components/elements/Notifications/GeneralError";
import {sectionCreateError,sectionCreateSuccess} from "../../../components/elements/Notifications/SectionCreate";
import {categoryCreateError,categoryCreateSuccess} from "../../../components/elements/Notifications/CategoryCreate";
import {categoryUpdateError,categoryUpdateSuccess} from "../../../components/elements/Notifications/CategoryUpdate";
import {categoryDeleteError,categoryDeleteSuccess} from "../../../components/elements/Notifications/CategoryDelete";
import {elementCreateError,elementCreateSuccess} from "../../../components/elements/Notifications/ElementCreate";
import {elementUpdateError, elementUpdateSuccess} from "../../../components/elements/Notifications/ElementUpdate";
import {elementDeleteError,elementDeleteSuccess} from "../../../components/elements/Notifications/ElementDelete";
import {itemCreateError, itemCreateSuccess} from "../../../components/elements/Notifications/ItemCreate";
import {itemUpdateError,itemUpdateSuccess} from "../../../components/elements/Notifications/ItemUpdate";
import {itemDeleteError,itemDeleteSuccess} from "../../../components/elements/Notifications/ItemDelete";
import sortCategoryElements from "../../../containers/DragAndDrop/sort";


export const getTeamProjects = (id) => dispatch => {
    dispatch(isLoading(true));
    getProjects(id)
        .then(res => {
            console.log("res projekata,", res.data)
            if(res.data.length === 0) {
                res.data = 0
            }
            dispatch(setProjectsByTeam(res.data));
            dispatch(isLoading(false));
            console.log(res)
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
            generalError()
        })
}

export const projectCreation = (name, description, teamId) => dispatch =>{
    dispatch(isLoading(true));
    createProject(name, description, teamId)
        .then(res => {
          dispatch(setProject(res.data))
          return getProjectsByUser()
    })
        .then(res => {
            dispatch(setProjectsByUser(res.data));
            dispatch(isLoading(false));
            projectCreateSuccess()
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
            projectCreateError()
        })
}

export const getProjectsForUser = (id) => dispatch => {
    dispatch(isLoading(true));
    getProjectsByUser(id)
        .then(res => {
            if(res.data.length === 0) {
                res.data = 0;
            }
            dispatch(setProjectsByUser(res.data));
            dispatch(isLoading(false));
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
            generalError()
        })
}

export const retrieveProject = (id) => dispatch => {
    dispatch(isLoading(true));
    let currentCat={};
    let categories={};
    let categoriesUnsorted={};
    getSingleProject(id)
    .then(res => {
        dispatch(setProject(res.data))
        //dispatch(isLoading(false))
        return res.data.id
    })
    .then(id => {
        return getProjectSections(id)
    })
    .then(res => {
        dispatch(setSections(res.data))
        dispatch(setSection(res.data[0]))
        return res.data[0].id
    })
    .then(id => {
        return getSectionCategories(id)
    })
    .then(res => {
        let firstId=res.data[0].id
        categoriesUnsorted=res.data
        categories=sortCategoryElements(res.data)
        for(let i=0;i<categoriesUnsorted.length;i++){
            for(let j in categories){
                if(categoriesUnsorted[i].id===parseInt(j)) {
                    categoriesUnsorted[i].elements = categories[j]
                }
            }
        }
        if(currentCat.hasOwnProperty('id')){
            console.log("SETTUJE STARI")
            currentCat=currentCat
        }
        else{
            currentCat=categoriesUnsorted[0]
        }
        return firstId
    })
    .then(id => {
        return getCategoryElements(id)
    })
    .then(res => {
        let items=sortCategoryElements(res.data)
        currentCat.elements.forEach((element,index)=>{
            for(let i in items){
                if(element.id===i){
                    element.items=items[i]
                }
            }
        })
        console.log("CURRENT CATEGORY AFTER CHANGE !!!! ",currentCat)
        dispatch(setCategories(categoriesUnsorted));
        dispatch(setCategory(currentCat));
        dispatch(setElements(items));
        dispatch(isLoading(false))
    })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
    })
        .finally(dispatch(isLoading(false)))
}

export const retrieveSectionCategories = (id) => dispatch => {
    console.log("ID OVAJ", id)
    let categoriesUnsorted=[]
    let categories=[]
    let currentCat={}
    dispatch(setCategories([]))
    dispatch(setCategory([]))
    dispatch(setElements([]))
    dispatch(setElement([]))
    getSectionCategories(id)
        .then(res => {
            console.log("RES SEKCIJE ",res.data)
            let firstId=res.data[0].id
            categoriesUnsorted=res.data
            categories=sortCategoryElements(res.data)
            for(let i=0;i<categoriesUnsorted.length;i++){
                for(let j in categories){
                    if(categoriesUnsorted[i].id===parseInt(j)) {
                        categoriesUnsorted[i].elements = categories[j]
                    }
                }
            }
            if(currentCat.hasOwnProperty('id')){
                console.log("SETTUJE STARI")
                currentCat=currentCat
            }
            else{
                currentCat=categoriesUnsorted[0]
            }
            return firstId
        })
        .then(id => {
            return getCategoryElements(id)
        })
        .then(res => {
            console.log("ovde ?")
            let items=sortCategoryElements(res.data)
            currentCat.elements.forEach((element,index)=>{
                for(let i in items){
                    if(element.id===i){
                        element.items=items[i]
                    }
                }
            })
            console.log("SECTION STUFF  !!!! ",currentCat)
            dispatch(setCategories(categoriesUnsorted));
            dispatch(setCategory(currentCat));
            dispatch(setElements(items));
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
        .finally(
            dispatch(isLoading(false))
        )
}

export const retrieveCategoryElements = (id) => dispatch => {
    dispatch(isLoading(true))
    getCategoryElements(id)
    .then(res => {
        dispatch(setElements(res.data))
        dispatch(isLoading(false))
    })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
        generalError()
    })
    dispatch(isLoading(false))
}

export const sectionCreation = (name, description, project_id) => dispatch => {
    dispatch(isLoading(true))
    createSection(name, description, project_id)
    .then(res => {
        dispatch(setSection(res.data))
        dispatch(isLoading(false))
        sectionCreateSuccess()
    })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
        sectionCreateError()
    })
}

export const categoryCreation = (name, description, section_id, categories) => dispatch => {
    let catsSet=categories
    console.log("CATEGORY CREATE ", section_id)
    dispatch(isLoading(true))
    createCategory(name, description, section_id)
    .then(res => {
        let catCur=res.data
        catCur['elements']=[]
        dispatch(setCategory(catCur))
        console.log("CAT SET jbg", catsSet)
        categoryCreateSuccess()
        dispatch(isLoading(false))
    })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
        categoryCreateError()
    })
}

export const elementCreation = (title, description, category_id, category) => dispatch => {
    let currentCat = category
    let createdEle
    createElement(title, description, category_id)
    .then(res => {
        createdEle=res.data
        dispatch(setElement(res.data))
        elementCreateSuccess()
    })
        .then(res=>{
             return getCategoryElements(category.id)}
             )
        .then(res => {
            let items = sortCategoryElements(res.data)
            currentCat.elements.forEach((element, index) => {
                for (let i in items) {
                    if (element.id === i) {
                        element.items = items[i]
                    }
                }
            })
            let idswap=createdEle.id.toString()
            createdEle.id=idswap
            createdEle.items=[]
            currentCat.elements.push(createdEle)
            dispatch(setCategory(currentCat));
            dispatch(setElements(items));
            dispatch(isLoading(false))
        })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
        elementCreateError()
    })
}

export const changeCategoryForElement = (currentElement, category, section, destination) => dispatch =>{
    let categoriesUnsorted = [];
    let currentCat = destination;
    let newOrder=[]
    for(let i in currentCat.elements){
        newOrder[i]=parseInt(currentCat.elements[i].id)
    }
    currentCat.order = newOrder
    let categories = []
    elementCategoryChange(currentElement, parseInt(category.id), newOrder)
        .then(res => {
        return getSectionCategories(section.id)
    })
        .then(res => {
            let currentId = currentCat.id
            categoriesUnsorted = res.data
            categories = sortCategoryElements(res.data)
            for (let i = 0; i<categoriesUnsorted.length; i++) {
                for (let j in categories) {
                    if (categoriesUnsorted[i].id === parseInt(j)) {
                        categoriesUnsorted[i].elements = categories[j]
                    }
                }
            }
            return currentId
        })
        .then(id => {
            return getCategoryElements(id)
        })
        .then(res => {
            let items = sortCategoryElements(res.data)
            currentCat.elements.forEach((element,index) => {
                for (let i in items) {
                    if (element.id === i) {
                        element.items = items[i]
                    }
                }
            })
            dispatch(setCategories(categoriesUnsorted));
            dispatch(setCategory(currentCat));
            dispatch(setElements(items));
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const itemCreation = (content, type, element, category) => dispatch => {
    let currentCat = category
    createItem(content, type, element)
    .then(res => {
        dispatch(setItem(res.data))
        itemCreateSuccess()
    })
        .then(res=>{
            return getCategoryElements(category.id)}
        )
        .then(res => {
            let items = sortCategoryElements(res.data)
            currentCat.elements.forEach((element, index) => {
                for (let i in items) {
                    if (element.id === i) {
                        element.items = items[i]
                    }
                }
            })
            dispatch(setCategory(currentCat));
            dispatch(setElements(items));
            dispatch(isLoading(false))
        })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
        itemCreateError()
    })
}

export const changeCategory = (category) => dispatch =>{
    let currentCat = category
    dispatch(setElements([]))
    dispatch(setCategory([]))
         getCategoryElements(category.id)
        .then(res => {
            let items = sortCategoryElements(res.data)
            currentCat.elements.forEach((element, index) => {
                for (let i in items) {
                    if (element.id === i) {
                        element.items = items[i]
                    }
                }
            })
            dispatch(setCategory(currentCat));
            dispatch(setElements(items));
            dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const reorderElements = (elementsIdArray, category) => dispatch => {
     let currentCat = category
    reorderElementsForCategory(elementsIdArray, category.id)
        .then(res => {
            return getCategoryElements(category.id)
        })
        .then(res => {
        let items = sortCategoryElements(res.data)
        currentCat.elements.forEach((element, index) => {
            for (let i in items) {
                if (element.id === i) {
                    element.items = items[i]
                }
            }
        })
        dispatch(setCategory(currentCat));
        dispatch(setElements(items));
        dispatch(isLoading(false))
        })
        .catch(err => {
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const reorderItems = (itemsIdArray, element) => dispatch => {
    reorderItemsForElement(itemsIdArray, element.id)
        .then(res => {
        })
        .catch(err => {
            console.log(err.message)
        })
}

export const changeElementForItem = (currentItem, element, category, destination, column) => dispatch =>{
    let currentCat=category
    let currentEle = destination
    let newOrder = []
    for (let i in currentEle.items) {
        newOrder[i] = parseInt(currentEle.items[i].id)
    }
    currentEle.order = newOrder
    itemElementChange(currentItem, parseInt(element.id), newOrder, column)
        .then(res=>{
            return getCategoryElements(category.id)
        })
        .then(res => {
            let items = sortCategoryElements(res.data)
            currentCat.elements.forEach((element, index) => {
                for (let i in items) {
                    if (element.id === i) {
                        element.items = items[i]
                    }
                }
            })
            dispatch(setCategory(currentCat));
            dispatch(setElements(items));
            dispatch(isLoading(false))
        })
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const itemUpdate = (id, content, category) => dispatch => {
  let currentCat=category
  updateItem(id, content)
  .then(res => {
    dispatch(editItem(res.data))
    itemUpdateSuccess()
  })
      .then(id => {
          return getCategoryElements(category.id)
      })
      .then(res => {
          let items=sortCategoryElements(res.data)
          currentCat.elements.forEach((element,index)=>{
              for(let i in items){
                  if(element.id===i){
                      element.items=items[i]
                  }
              }
          })
          dispatch(setCategory(currentCat));
          dispatch(setElements(items));
          dispatch(isLoading(false))
      })
  .catch(err => {
    console.log(err.message)
      itemUpdateError()
    dispatch(isLoading(false))
  })
}

export const elementUpdate = (id, title, description, category, section) => dispatch => {
    let currentCat=category
    let currentSection=section
    let createdEle
    let categoriesUnsorted=[]
    let categories=[]
  updateElement(id, title, description)
  .then(res => {
      createdEle=res.data
    dispatch(editElement(res.data))
      elementUpdateSuccess()
  }).then(res => {
      return getSectionCategories(currentSection.id)})
      .then(res => {
          let firstId=currentCat.id
          categoriesUnsorted=res.data
          categories=sortCategoryElements(res.data)
          for(let i=0;i<categoriesUnsorted.length;i++){
              for(let j in categories){
                  if(categoriesUnsorted[i].id===parseInt(j)) {
                      categoriesUnsorted[i].elements = categories[j]
                  }
              }
          }
          return firstId
      })
      .then(id => {
          return getCategoryElements(id)
      })
      .then(res => {
          let items=sortCategoryElements(res.data)
          currentCat.elements.forEach((element,index)=>{
              for(let i in items){
                  if(element.id===i){
                      element.items=items[i]
                  }
                  if(element.id===createdEle.id.toString()){
                      element.description=createdEle.description
                      element.title=createdEle.title
                  }
              }
          })
          dispatch(setCategories(categoriesUnsorted));
          dispatch(setCategory(currentCat));
          dispatch(setElements(items));
          dispatch(isLoading(false))
      })
  .catch(err => {
    console.log(err.message)
      elementUpdateError()
    dispatch(isLoading(false))
  })
}

export const categoryUpdate = (id, name, description, category, section) => dispatch => {
    let currentCat=category
    let currentSection=section
    let categoriesUnsorted=[]
    let categories=[]
  updateCategory(id, name, description)
  .then(res => {
    dispatch(editCategory(res.data))
    dispatch(isLoading(false))
      currentCat.description=res.data.description
      currentCat.name=res.data.name
      categoryUpdateSuccess()
  }).then(res => {
    return getSectionCategories(currentSection.id)})
        .then(res => {
            let firstId=currentCat.id
            categoriesUnsorted=res.data
            categories=sortCategoryElements(res.data)
            for(let i=0;i<categoriesUnsorted.length;i++){
                for(let j in categories){
                    if(categoriesUnsorted[i].id===parseInt(j)) {
                        categoriesUnsorted[i].elements = categories[j]
                    }
                }
            }
            return firstId
        })
        .then(id => {
            return getCategoryElements(id)
        })
        .then(res => {
            let items=sortCategoryElements(res.data)
            currentCat.elements.forEach((element,index)=>{
                for(let i in items){
                    if(element.id===i){
                        element.items=items[i]
                    }
                }
            })
            dispatch(setCategories(categoriesUnsorted));
            dispatch(setCategory(currentCat));
            dispatch(setElements(items));
            dispatch(isLoading(false))
        })
  .catch(err => {
    console.log(err.message)
    dispatch(isLoading(false))
      categoryUpdateError()
  })
}

export const sectionUpdate = (id, name, description) => dispatch => {
  dispatch(isLoading(true))
  updateSection(id, name, description)
  .then(res => {
    dispatch(editSection(res.data))
    dispatch(isLoading(false))
  })
  .catch(err => {
    console.log(err.message)
    dispatch(isLoading(false))
  })
}

export const projectUpdate = (id, name, description, data) => dispatch => {
  dispatch(isLoading(true))
  updateProject(id, name, description, data)
  .then(res => {
    dispatch(editProject(res.data))
    dispatch(isLoading(false))
  })
  .catch(err => {
    console.log(err.message)
    dispatch(isLoading(false))
  })
}

export const itemDelete = (id, category) => dispatch => {
    let currentCat = category
  deleteItem(id)
  .then(res => {
    dispatch(removeItem(res.data))
    itemDeleteSuccess()
  })
      .then(id => {
          return getCategoryElements(category.id)
      })
      .then(res => {
          let items=sortCategoryElements(res.data)
          currentCat.elements.forEach((element,index)=>{
              for(let i in items){
                  if(element.id===i){
                      element.items=items[i]
                  }
              }
          })
          dispatch(setCategory(currentCat));
          dispatch(setElements(items));
          dispatch(isLoading(false))
      })
  .catch(err => {
    console.log(err.message)
      itemDeleteError()
    dispatch(isLoading(false))
  })
}

export const elementDelete = (id,category, section) => dispatch => {
  let currentCat=category
    let categories=[]
    let categoriesUnsorted=[]
    let currentSection=section
    let eleId=id
  deleteElement(id)
  .then(res => {
    dispatch(removeElement(res.data))
      elementDeleteSuccess()
  })
      .then(res => {
          return getSectionCategories(currentSection.id)})
      .then(res => {
          let firstId=currentCat.id
          categoriesUnsorted=res.data
          categories=sortCategoryElements(res.data)
          for(let i=0;i<categoriesUnsorted.length;i++){
              for(let j in categories){
                  if(categoriesUnsorted[i].id===parseInt(j)) {
                      categoriesUnsorted[i].elements = categories[j]
                  }
              }
          }
          return firstId
      })
      .then(id => {
          return getCategoryElements(id)
      })
      .then(res => {
          let items=sortCategoryElements(res.data)
          let removeIndex=''
          currentCat.elements.forEach((element,index)=>{
              for(let i in items){
                  if(element.id===i){
                      element.items=items[i]
                  }
                  if(element.id===eleId.toString()){
                      removeIndex=index
                  }
              }
          })
          currentCat.elements.splice(removeIndex,1)
          dispatch(setCategories(categoriesUnsorted));
          dispatch(setCategory(currentCat));
          dispatch(setElements(items));
          dispatch(isLoading(false))
      })

  .catch(err => {
    console.log(err.message)
      elementDeleteError()
    dispatch(isLoading(false))
  })
}

export const categoryDelete = (id) => dispatch => {
  dispatch(isLoading(true))
  deleteCategory(id)
  .then(res => {
    dispatch(removeCategory(res.data))
      dispatch(setCategory({}))
      dispatch(setCategories([]))
    dispatch(isLoading(false))
      categoryDeleteSuccess()
  })
  .catch(err => {
    console.log(err.message)
      categoryDeleteError()
    dispatch(isLoading(false))
  })
}

export const sectionDelete = (id) => dispatch => {
  dispatch(isLoading(true))
  deleteSection(id)
  .then(res => {
    dispatch(removeSection(res.data))
    dispatch(isLoading(false))
  })
  .catch(err => {
    console.log(err.message)
    dispatch(isLoading(false))
  })
}

export const projectDelete = (id) => dispatch => {
  dispatch(isLoading(true))
  deleteProject(id)
  .then(res => {
    dispatch(removeProject(res.data))
    dispatch(isLoading(false))
  })
  .catch(err => {
    console.log(err.message)
    dispatch(isLoading(false))
  })
}
