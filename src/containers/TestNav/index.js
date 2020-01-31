import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {

    console.log('List : ',list)
    console.log('Start index : ',startIndex)
    console.log('End index : ',endIndex)
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    console.log('source : ',source)
    console.log('destination : ',source)
    console.log('Droppable source : ',droppableSource)
    console.log('Droppable dest: ',droppableDestination)
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

//const grid = 8;

console.log('asdasdasd')



class TestNav extends Component{
    state = {
        1: [
            {
                id: `item-1`,
                content: `item 1`
            },
            {
                id: `item-2`,
                content: `item 2`
            },
            {
                id: `item-3`,
                content: `item 3`
            }
        ],
        2: [
            {
                id: `item-4`,
                content: `item 4`
            },
            {
                id: `item-5`,
                content: `item 5`
            },
            {
                id: `item-6`,
                content: `item 6`
            }
        ],
        3: [
            {
                id: `item-7`,
                content: `item 7`
            },
            {
                id: `item-8`,
                content: `item 8`
            },
            {
                id: `item-9`,
                content: `item 9`
            }
        ]
    };

    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */   
    getList = id => this.state[id];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let key = source.droppableId;

            let state = { [key]: items };

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            let new_state = {};

            Object.keys(result).forEach(function(key) {
                new_state[key] = result[key];
            });

            this.setState(new_state);
        }
    };


    render() {
        return (
            <div>
                <h1>Project</h1>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {Object.keys(this.state).map((list_id, index) => (
                        <Droppable droppableId={list_id} key={list_id}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} style={{backgroundColor:'gray'}}>
                                    <h2>Category {index}</h2>
                                    {this.state[list_id].map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    {item.content}
                                                </div>
                                            )}
                                        </Draggable>
                                     ))}
                                    {provided.placeholder}
                                </div>
                             )}
                    </Droppable>
                    ))}
                </DragDropContext>
            </div>
        );
    }
}
export default TestNav;