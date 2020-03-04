const sortElements=props=> {
    let order=[];
    let new_state = [];
    let tmp=[];

    /** gets the order of the category elements and creates a similar object to the state*/
    /** sets the state for drag and drop*/
    for(let i = 0 ; i <  props.length; i++){
        if(props[i].order.length>0) {
            order[props[i].id] = props[i].order;

            // for(let j = 0; j < props[i].order.length; j++){
            //     console.log("trenutni order", props[i].order[i])
            //     if(props[i][props[i].id]===props[i].order[i]){
            //         order[props[i].id] = props[i][props[i].id];
            //     }
            // }
        }
        else{
            order[props[i].id] = props[i][props[i].id];
        }

        new_state[props[i].id] = props[i][props[i].id]

    }

    try {
    /** remapping of the new state to fit the order*/
    for(let category = 1; category < new_state.length; category++){
        new_state[category].forEach((ele,index)=>{
            let i = 0;
            for(i ; i < order[category].length; i++) {
                if (ele.id === order[category][i]) {
                    order[category][i]=ele
                }
                else{
                    tmp[index]=ele;
                }
            }
        })
    }
  } catch {}

    console.log("NEW STATE ", new_state);
    console.log("ORDER POSLE" , order);
    console.log("TMP ", tmp);

    /** converts the id of the element into string*/
    for(let p in new_state) {
        for(let i = 0; i < new_state[p].length; i++) {
            new_state[p][i].id = new_state[p][i].id.toString()
        }
    }

    return new_state
};
export default sortElements
