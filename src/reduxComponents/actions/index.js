import { sendData, fetchData, updateRemoteData, deleteRemoteData } from '../../api'
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
  const _id = `_id${id}`
  const newNote = { [_id]: { name, content, author, id } }

  return dispatch => {
    dispatch(toggleLoading(true))

    return sendData({ newNote, currentStore, _id }).then(result => {
      if (currentStore) {
        dispatch(updateNotesStore(result))
      }
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

    return updateRemoteData({ updatedNote, currentStore, _id }).then(result => {
      if (currentStore) {
        dispatch(updateNotesStore(result))
      }
      dispatch(toggleLoading(false))
    })
  }
}

export const deleteData = ( _id, currentStore ) => {
    return dispatch => {
        dispatch(toggleLoading(true))

        return deleteRemoteData( _id, currentStore  ).then(result => {
            if (currentStore) {
                dispatch(updateNotesStore(result))
            }
            dispatch(toggleLoading(false))
        })
    }
}
