import {
  TOGGLE_LOADING,
  TOGGLE_REMOTE_STORAGE,
  UPDATE_NOTES_STORE,
  GET_NOTE_TO_EDIT,
} from '../actions/actionTypes'
import { currentStore } from '../../constants'

const initialState = {
  isLoading: false,
  noteToEdit: null,
  currentStore: currentStore.firebase,
  notes: {},
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        ...action.payload,
      }
    case TOGGLE_REMOTE_STORAGE:
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
