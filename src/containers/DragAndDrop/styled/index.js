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

export const getListStyleHorizontalHidden = (isDraggingOver, isDragging )=> ({
    background: isDraggingOver ? 'black' : 'black',
    overflow: 'disabled',
    width: isDraggingOver? '49%':'49%',
    display: isDragging? 'flex':'hidden',
    flexWrap: 'wrap',
    float:'right',
    margin:`10px auto`,
    minHeight:`100%`,
});

export const getListStyleHorizontalDouble = (isDraggingOver, isDragging) => ({
    background: isDraggingOver ? 'lightgray' : 'white',
    overflow: 'disabled',
    width: isDragging? '49%':'98%',
    display: 'inline-flex',
    flexWrap: 'wrap',
    margin:`10px auto`,
    minHeight:`100%`,
});


export const getListStyleHorizontal = isDraggingOver => ({
    background: isDraggingOver ? 'lightgray' : 'white',
    overflow: 'disabled',
    width:'49%',
    display: 'inline-flex',
    flexWrap: 'wrap',
    margin:`10px auto`,
    minHeight:`100%`,
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

