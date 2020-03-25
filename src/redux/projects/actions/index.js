import * as types from './types';

export const setProjectsByTeam = teamProjects => {
    return {
        type:types.SET_PROJECTS_BY_TEAMS,
        payload: teamProjects
    }
}

export const setProject = project => {
    return {
        type: types.SET_PROJECT,
        payload: project
    }
}

export const setProjectsByUser = projects => {
    return {
        type: types.SET_PROJECTS_BY_USER,
        payload: projects
    }
}


export const setSections = sections => {
    return {
        type: types.GET_PROJECT_SECTIONS,
        payload: sections
    }
}

export const setCategories = categories => {
    return {
        type: types.GET_SECTION_CATEGORIES,
        payload: categories
    }
}

export const setElements = elements => {
    return {
        type: types.GET_CATEGORY_ELEMENTS,
        payload: elements
    }
}

export const setSection = section => {
    return {
        type: types.SET_SECTION,
        payload: section
    }
}

export const setCategory = category => {
    return {
        type: types.SET_CATEGORY,
        payload: category
    }
}

export const setElement = element => {
    return {
        type: types.SET_ELEMENT,
        payload: element
    }
}

export const setItem = item => {
    return {
        type: types.SET_ITEM,
        payload: item
    }
}

export const editItem = item => {
  return {
    type: types.UPDATE_ITEM,
    payload: item
  }
}

export const editElement = element => {
  return {
    type: types.UPDATE_ELEMENT,
    payload: element
  }
}

export const editCategory = category => {
  return {
    type: types.UPDATE_CATEGORY,
    payload: category
  }
}

export const editSection = section => {
  return {
    type: types.UPDATE_SECTION,
    payload: section
  }
}

export const editProject = project => {
  return {
    type: types.UPDATE_PROJECT,
    payload: project
  }
}

export const removeItem = id => {
  return {
    type: types.DELETE_ITEM,
    id: id
  }
}

export const removeElement = id => {
  return {
    type: types.DELETE_ELEMENT,
    id: id
  }
}

export const removeCategory = id => {
  return {
    type: types.DELETE_CATEGORY,
    id: id
  }
}

export const removeSection = id => {
  return {
    type: types.DELETE_SECTION,
    id: id
  }
}

export const removeProject = id => {
  return {
    type: types.DELETE_PROJECT,
    id: id
  }
}
