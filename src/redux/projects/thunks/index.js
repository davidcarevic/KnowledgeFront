import { createProject, getProjects, getProjectsByUser, getSingleProject, getProjectSections, getSectionCategories,
    getCategoryElements, createSection, createCategory, createElement, elementCategoryChange, createItem,
    reorderElementsForCategory, reorderItemsForElement, itemElementChange } from "../../../services";
import { setProjectsByTeam, setProjectsByUser, setProject, setSections, setCategories, setElements,
    setSection, setCategory, setElement, setItem } from "../actions";
import { isLoading } from "../../global/actions";
//notifications
import {projectCreateError,projectCreateSuccess} from "../../../components/elements/Notifications/ProjectCreate";
import {generalError} from "../../../components/elements/Notifications/GeneralError";
import {categoryCreateError,categoryCreateSuccess} from "../../../components/elements/Notifications/CategoryCreate";
import {sectionCreateError,sectionCreateSuccess} from "../../../components/elements/Notifications/SectionCreate";
import {elementCreateError,elementCreateSuccess} from "../../../components/elements/Notifications/ElementCreate";
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
        currentCat=categoriesUnsorted[0]
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
    dispatch(isLoading(true))
    let categoriesUnsorted=[]
    let categories=[]
    let currentCat=[]
    dispatch(setCategories([]))
    dispatch(setCategory([]))
    dispatch(setElements([]))
    dispatch(setElement([]))
    getSectionCategories(id)
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
            currentCat=categoriesUnsorted[0]
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

export const categoryCreation = (name, description, section_id) => dispatch => {
    dispatch(isLoading(true))
    createCategory(name, description, section_id)
    .then(res => {
        dispatch(setCategory(res.data))
        dispatch(isLoading(false))
        categoryCreateSuccess()
    })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
        categoryCreateError()
    })
}

export const elementCreation = (title, description, category_id) => dispatch => {
    dispatch(isLoading(true))
    createElement(title, description, category_id)
    .then(res => {
        dispatch(setElement(res.data))
        dispatch(isLoading(false))
        elementCreateSuccess()
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
    console.log("CURRENT ", currentCat)
    let categories = []
    elementCategoryChange(currentElement, parseInt(category.id))
        .then(res=>{
        return getSectionCategories(section.id)
    })
        .then(res => {
            let currentId = currentCat.id
            categoriesUnsorted=res.data
            categories=sortCategoryElements(res.data)
            for(let i=0;i<categoriesUnsorted.length;i++){
                for(let j in categories){
                    if(categoriesUnsorted[i].id===parseInt(j)) {
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
}

export const itemCreation = (content, type, element) => dispatch => {
    dispatch(isLoading(true))
    createItem(content, type, element)
    .then(res => {
        dispatch(setItem(res.data))
        dispatch(isLoading(false))
    })
    .catch(err => {
        console.log(err.message)
        dispatch(isLoading(false))
    })
}

export const changeCategory = (category) => dispatch =>{
    let currentCat=category
    dispatch(setElements([]))
    dispatch(setCategory([]))
         getCategoryElements(category.id)
        .then(res=>{
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
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const reorderElements=(elementsIdArray,category)=>dispatch=>{
     let currentCat=category
    reorderElementsForCategory(elementsIdArray,category.id)
        .then(res=>{
            return getCategoryElements(category.id)
        })
        .then(res=>{
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
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

export const reorderItems=(itemsIdArray,element)=>dispatch=>{
    reorderItemsForElement(itemsIdArray,element.id)
        .then(res=>{
        })
        .catch(err=>{
            console.log(err.message)
        })
}

export const changeElementForItem = (currentItem, element, category) => dispatch =>{
    let currentCat=category
    itemElementChange(currentItem, parseInt(element.id))
        .then(res=>{
            return getCategoryElements(category.id)
        })
        .then(res=>{
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
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
        })
        .catch(err=>{
            console.log(err.message)
            dispatch(isLoading(false))
        })
}

