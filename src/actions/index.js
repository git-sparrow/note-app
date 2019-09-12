export const addNote = ({ name, content, author, id }) => ({
  type: 'ADD_NOTE',
  payload: {
    name,
    content,
    author,
    id,
  },
})
