const grid=8
export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '5px',
    margin: `0 0 1px 0`,

    // change background colour if dragging
    background: isDragging ? 'white' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightgray' : 'white',
    padding: 10 ,
    width: 150
});

export const getListStyleHorizontal = isDraggingOver => ({
    background: isDraggingOver ? 'lightgray' : 'white',
    overflow: 'disabled',
    width:'49%',
    display: 'inline-flex',
    flexWrap: 'wrap',
    flex:'100 100%',
    margin:`10px auto`,
});



export const getItemStyleHorizontal = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    width: '100%',
    minHeight:'100px',
    display:'inline-flex',
    flexDirection:'column',
    overflow:`auto`,
    // change background colour if dragging
    background: isDragging ? 'lightgray' : 'white',
    // styles we need to apply on draggables
    ...draggableStyle,
});

export const getItemStyleHorizontalDouble = (isDragging, draggableStyle) =>  ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    width: isDragging? '100%' : '100%',
    minHeight:'100px',
    display:'inline-flex',
    flexDirection:'column',
    flewGrow:'10',
    // change background colour if dragging
    background: isDragging ? 'lightgray' : 'white',
    // styles we need to apply on draggables
    ...draggableStyle,
});
