// let elements = [{id:1}, {id:33}, {id:2}, {id:3}, {id:3}]
//
// let order = [3, 1, 2];
//
// const sortElements = (elements, order) => {
//     let result = []
//
//     // Add elements that exist in order:
//     order.forEach(element_id => {
//         result = [...result, ...elements.filter(element => element.id === element_id)];
//     });
//
//     let rest = elements.filter(element => !order.includes(element.id));
//
//     result = [...result, ...rest];
//
//     return result;
// };
//
//
// const sortElements2 = (elements, order) => {
//     let result = [];
//
//     let elementsDict = {};
//
//     // Create an indexed elements dictionary:
//     elements.forEach(element => {
//         elementsDict[element.id] = element
//     });
//
//     // Add elements that exist in order:
//     order.forEach(element_id => {
//         try {
//             result.push(elementsDict[element_id]);
//             delete elementsDict[element_id];
//         } catch (e) { }
//     });
//
//     // Add the rest:
//     for (let element_id in elementsDict) {
//         result.push(elementsDict[element_id]);
//     }
//
//     return result;
// };
//
//
// let elements = []
//
// for(let i = 1; i< 1000000; i++) {
//     elements.push({id: i})
// }
//
// let order = []
// for(let i = 900000; i> 0; i--) {
//     order.push(i)