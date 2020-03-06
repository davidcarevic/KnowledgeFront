// const sortCategoryElements=props=> {
//     let order=[];
//     let new_state = [];
//     let tmp=[];
//
//     /** gets the order of the category elements and creates a similar object to the state*/
//     /** sets the state for drag and drop*/
//     for(let i = 0 ; i <  props.length; i++){
//         if(props[i].order.length>0) {
//             order[props[i].id] = props[i].order;
//         }
//         else{
//             order[props[i].id] = props[i][props[i].id];
//         }
//         new_state[props[i].id] = props[i][props[i].id]
//     }
//
//     /** remapping of the new state to fit the order*/
//     /** tmp adds the unsorted elements to the ordered array*/
//     for(let category = 0; category < new_state.length; category++){
//         if(new_state[category]) {
//             new_state[category].forEach((ele, index) => {
//                 let i = 0;
//                 for (i; i < order[category].length; i++) {
//                     if (ele.id === order[category][i]) {
//                         order[category][i] = ele
//                     } else {
//                         tmp[index] = ele;
//                     }
//                 }
//             })
//         }
//     }
//     for(let category = 0; category < new_state.length; category++){
//         let arr=order[category]
//         if(new_state[category]) {
//             new_state[category].forEach((ele, index) => {
//                 let i = 0;
//                 for (i; i < tmp.length; i++) {
//                     if (ele.id === tmp[i].id) {
//                         order[category][index] = tmp[i]
//                     }
//                 }
//             })
//         }
//     }
//     console.log("NEW STATE ", new_state);
//     console.log("ORDER POSLE" , order);
//     // console.log("TMP ", tmp);
//     /** converts the id of the element into string*/
//     for(let p in order) {
//         for(let i = 0; i < order[p].length; i++) {
//             order[p][i].id = order[p][i].id.toString()
//         }
//     }
//
//     return order
// };
//
// export default sortCategoryElements