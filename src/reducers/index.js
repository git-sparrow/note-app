const initialState = {
  isLoading: false,
  noteToEdit: null,
  currentStore: true,
  notes: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING':
      return {
        ...state,
        ...action.payload,
      }
    case 'SAVE_NOTE':
      const index = state.notes.findIndex(item => item.id === +action.payload.id)
      function replace(array, index, value) {
        const ret = array.slice(0)
        ret[index] = value
        return ret
      }

      if (index === -1) {
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
      } else {
        return {
          ...state,
          notes: replace(state.notes, index, {
            name: action.payload.name,
            content: action.payload.content,
            author: action.payload.author,
            id: action.payload.id,
          }),
        }
      }
    case 'GET_NOTE_TO_EDIT':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default rootReducer
