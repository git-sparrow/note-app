import { sendData, fetchData } from '../api'

export const toggleLoading = isLoading => ({
  type: 'TOGGLE_LOADING',
  payload: {
    isLoading,
  },
})

export const updateStore = notes => ({
  type: 'UPDATE_STORE',
  payload: notes,
})

export const getNoteToEdit = noteToEdit => ({
  type: 'GET_NOTE_TO_EDIT',
  payload: { noteToEdit },
})

export const setData = ({ name, content, author, id, currentStore }) => {
  const newNote = { [`_id${id}`]: { name, content, author, id } }

  return dispatch => {
    dispatch(toggleLoading(true))

    return sendData(newNote, currentStore)
      .then(() => {
        fetchData(currentStore)
      })
      .then(result => {
        dispatch(updateStore(result))
      })
  }
}

export const getData = currentStore => {
  return dispatch => {
    dispatch(toggleLoading(true))

    return fetchData(currentStore)
  }
}
