import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ToggleBox from '../ToggleBox';
import {getItemStyle, getItemStyleHorizontal, getListStyle, getListStyleHorizontal} from './styled';
import sortCategoryElements from './sort/index'
import StyledLink from "../../components/elements/Link";
import { PlusIcon } from '../../components/elements/Icons';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {

    console.log('List : ',list)
    console.log('Start index : ',startIndex)
    console.log('End index : ',endIndex)
    const result = Array.from(list);
    console.log("RESULT MOVE /////////////// ",result)
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    console.log('source : ',source);
    console.log('destination : ',source);
    console.log('Droppable source : ',droppableSource);
    console.log('Droppable dest: ',droppableDestination);
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, removed);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return ({
        result: result,
        removed: removed,
        id: droppableDestination.droppableId
    });
};

class DragAndDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    componentWillReceiveProps() {
        /** the function works with an array of categories which are objects*/
        let new_state=sortCategoryElements(this.props.array);
        this.setState(new_state);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

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
        }
        else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            /** function(projects/thunk), changes the category for an element in the current section*/
            this.props.changeCategory(result.removed, result.id, this.props.section.id);
            let new_state = {};
            Object.keys(result.result).forEach(function(key) {
                new_state[key] = result[key];
            });
            this.setState(new_state);
        }
    };

    render() {
        if(this.props.type==="categories") {
            return (
                <div>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {Object.keys(this.state).map((list_id, index) => (
                            <ToggleBox key={index} title={this.props.array[index] ? this.props.array[index].name :''}>
                                <Droppable droppableId={list_id} key={list_id}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                                            {this.state[list_id].map((item, index) => (
                                                <Draggable
                                                    key={'c'+item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps} style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                            {item.title}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </ToggleBox>
                        ))}
                    </DragDropContext>
                </div>
            );
        }
        if(this.props.type==="elements"){

            return(
                <div>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        {Object.keys(this.state).map((list_id,index) => (
                            <div key={index}> <h3 key={index}>{ this.props.array.filter(ele=>ele.id===parseInt(list_id))[0].title}<StyledLink to={"#"}><PlusIcon /></StyledLink></h3>
                                <Droppable droppableId={list_id} key={list_id}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} style={getListStyleHorizontal(snapshot.isDraggingOver)}>
                                            {this.state[list_id].map((item, index) => (
                                                <Draggable
                                                    key={'e'+item.id}
                                                    draggableId={item.id}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps} style={getItemStyleHorizontal(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                            {item.content.title}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                    </DragDropContext>
                </div>
            )
        }
        }
}


export default DragAndDrop;
