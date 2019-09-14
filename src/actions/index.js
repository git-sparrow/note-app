import { sendData, fetchData, updateRemoteData } from '../api'
import { TOGGLE_LOADING, UPDATE_NOTES_STORE, GET_NOTE_TO_EDIT } from './actionTypes'

export const toggleLoading = isLoading => ({
  type: TOGGLE_LOADING,
  payload: {
    isLoading,
  },
})

export const updateNotesStore = notes => ({
  type: UPDATE_NOTES_STORE,
  payload: notes,
})

export const getNoteToEdit = noteToEdit => ({
  type: GET_NOTE_TO_EDIT,
  payload: { noteToEdit },
})

export const setData = ({ name, content, author, id, currentStore }) => {
  const newNote = { [`_id${id}`]: { name, content, author, id } }

  return dispatch => {
    dispatch(toggleLoading(true))

    return sendData(newNote, currentStore).then(result => {
      dispatch(updateNotesStore(result))
      dispatch(toggleLoading(false))
    })
  }
}

export const getData = currentStore => {
  return dispatch => {
    dispatch(toggleLoading(true))

    return fetchData(currentStore).then(result => {
      dispatch(updateNotesStore(result))
      dispatch(toggleLoading(false))
      return result
    })
  }
}

export const updateData = ({ _id, name, content, author, id, currentStore }) => {
  const updatedNote = { [_id]: { name, content, author, id } }

  return dispatch => {
    dispatch(toggleLoading(true))

    return updateRemoteData(updatedNote, currentStore).then(result => {
      dispatch(updateNotesStore(result))
      dispatch(toggleLoading(false))
      return result
    })
  }
}
