export const saveNote = ({ name, content, author, id }) => ({
    type: 'SAVE_NOTE',
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
