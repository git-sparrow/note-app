import { sendData, fetchData, updateRemoteData, deleteRemoteData } from '../../api'
import {
  TOGGLE_LOADING,
  TOGGLE_REMOTE_STORAGE,
  UPDATE_NOTES_STORE,
  GET_NOTE_TO_EDIT,
} from './actionTypes'
import { currentStore as remoteStorage } from '../../constants'

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

export const toggleRemoteStorage = value => ({
  type: TOGGLE_REMOTE_STORAGE,
  payload: {
    currentStore: value,
  },
})

export const setData = ({ name, content, commentary, _id, currentStore }) => {
  const newNote = { [_id]: { name, content, commentary } }

  return dispatch => {
    dispatch(toggleLoading(true))

    return sendData(newNote, currentStore).then(result => {
      if (currentStore === remoteStorage.localStorage) {
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

export const updateData = ({ _id, name, content, commentary, currentStore }) => {
  const updatedNote = { [_id]: { name, content, commentary } }

  return dispatch => {
    dispatch(toggleLoading(true))

    return updateRemoteData(updatedNote, currentStore).then(result => {
      if (currentStore === remoteStorage.localStorage) {
        dispatch(updateNotesStore(result))
      }
      dispatch(toggleLoading(false))
    })
  }
}

export const deleteData = (_id, currentStore) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    return deleteRemoteData(_id, currentStore).then(result => {
      if (currentStore === remoteStorage.localStorage) {
        dispatch(updateNotesStore(result))
      }
      dispatch(toggleLoading(false))
    })
  }
}

export const changeRemoteStore = (nextStorage, notes) => {
  return dispatch => {
    dispatch(toggleLoading(true))

    return updateRemoteData(notes, nextStorage).then(() => {
      dispatch(toggleRemoteStorage(nextStorage))
      dispatch(toggleLoading(false))
    })
  }
}
