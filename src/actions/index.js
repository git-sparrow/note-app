import { sendData } from '../api'

export const toggleLoading = isLoading => ({
  type: 'TOGGLE_LOADING',
  payload: {
    isLoading,
  },
})

export const saveNote = ({ name, content, author, id }) => ({
  type: 'SAVE_NOTE',
  payload: {
    name,
    content,
    author,
    id,
  },
})

export const getNoteToEdit = noteToEdit => ({
  type: 'GET_NOTE_TO_EDIT',
  payload: { noteToEdit },
})

export const setData = ({ name, content, author, id, currentStore }) => {
  const newNote = { name, content, author, id }
  return () => {
    return sendData(newNote, currentStore)
  }
}
