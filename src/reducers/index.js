import {TOGGLE_LOADING, UPDATE_NOTES_STORE, GET_NOTE_TO_EDIT} from '../actions/actionTypes'

const initialState = {
  isLoading: false,
  noteToEdit: null,
  currentStore: true,
  notes: {},
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        ...action.payload,
      }
      case UPDATE_NOTES_STORE:
      return {
        ...state,
        notes: { ...action.payload },
      }
    case GET_NOTE_TO_EDIT:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default rootReducer
