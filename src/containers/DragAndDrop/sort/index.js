const sortCategoryElements=props=> {
    let new_state = {};
    console.log("PROPS PRE SORTA!!!",props)
    try {
        props.forEach(category => {
            if (category.elements) {
                //console.log("category" , category.elements)
                new_state[category.id] = sortElements2(category.elements, category.order)
            }
            if (category.items) {
                console.log("element ID ", category.id)
                new_state["e"+category.id] = sortElements2(category.items, category.order)
            }
        });
        }
        catch{}


    for(let p in new_state) {
        for(let i = 0; i < new_state[p].length; i++) {
            if(new_state[p][i])
                try {
                    new_state[p][i].id = new_state[p][i].id.toString()
                }catch{}
        }
    }

    return new_state;
};

const sortElements2 = (elements, order) => {
    let result = [];
    let elementsDict = {};

    // Create an indexed elements dictionary:
    elements.forEach(element => {
        elementsDict[element.id] = element
    });

    // Add elements that exist in order:
    order.forEach(element_id => {
        try {
            result.push(elementsDict[element_id]);
            delete elementsDict[element_id];
        } catch (e) { }
    });

    // Add the rest:
    for (let element_id in elementsDict) {
        result.push(elementsDict[element_id]);
    }

    console.log("RES" , result)
    return result;
};

export default sortCategoryElements