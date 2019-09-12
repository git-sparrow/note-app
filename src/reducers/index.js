const rootReducer = (state = { notes: [],  noteToEdit: null}, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [
          ...state.notes,
          {
            name: action.payload.name,
            content: action.payload.content,
            author: action.payload.author,
            id: action.payload.id,
          },
        ],
      }
    default:
      return state
  }
}

export default rootReducer
