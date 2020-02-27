import React, { Component } from 'react';
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

class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        console.log("PROPS: ", props)
        for (let i = 0; i < props.props.length; i++) {
            this.state[props.props[i].id] = props.props[i][props.props[i].id]
        }

        for (let p in this.state) {
            for (let i = 0; i < this.state[p].length; i++) {
                this.state[p][i].id = this.state[p][i].id.toString()
            }
        }

        for (let i = 0; i < this.state.length; i++) {
            console.log("USAO")
            for (let j = 0; j < this.state[i].length; j++) {
                console.log("ID: ", this.state[i][j].id)
                let s = this.state[i][j].id
                let s1 = s.toString()
                this.state[i][j].id = s1
            }
        }
        console.log("DRAG: ", this.state)
    }
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
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {Object.keys(this.state).map((list_id, index) => (
                        <Droppable droppableId={list_id} key={list_id}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef}>
                                    <h2>{this.props.props[index].name}</h2>
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
                                                    {item.title}
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
export default DragAndDrop;