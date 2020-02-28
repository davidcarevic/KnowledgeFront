
export const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '5px',
    margin: `0 0 5px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'papayawhip',

    // styles we need to apply on draggables
    ...draggableStyle
});

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'papayawhip',
    padding: 0,
    width: 250
});