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
    display: 'flex',
    padding: grid,
    margin: grid,
    flexWrap: 'wrap',
    overflow: 'disabled'
});

export const getItemStyleHorizontal = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: grid,
    width: 'auto',
    height: 'auto',

    // change background colour if dragging
    background: isDragging ? 'lightgray' : '#F0F0F0',

    // styles we need to apply on draggables
    ...draggableStyle,
});
