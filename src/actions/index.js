export const addNote = ({ name, content, author, id }) => ({
  type: 'ADD_NOTE',
  payload: {
    name,
    content,
    author,
    id,
  },
})

export const getNoteToEdit = id => ({
  type: 'GET_NOTE_TO_EDIT',
  payload: id,
})
