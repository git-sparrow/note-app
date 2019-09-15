import firebaseDB from './firebaseDataBase'

const notesRef = firebaseDB.ref('/notes')

export const sendData = ({ newNote, currentStore, _id }) => {
  if (currentStore) {
    const data = localStorage.getItem('notes')
    if (!data) {
      localStorage.setItem('notes', JSON.stringify(newNote))

      return Promise.resolve(newNote)
    }
    const notes = JSON.parse(data)
    const newStorage = { ...notes, ...newNote }
    localStorage.setItem('notes', JSON.stringify(newStorage))

    return Promise.resolve(newStorage)
  }
    return notesRef.update(newNote, (error) => {
    if (error) {
      throw new Error(error.message)
    }
  })
}

export const fetchData = currentStore => {
  if (currentStore) {
    const data = localStorage.getItem('notes')
    if (data) {
      const notes = JSON.parse(data)

      return Promise.resolve(notes)
    }

    return Promise.reject(new Error('failed to get data from localStorage'))
  }

  return notesRef.once('value').then(snapshot => snapshot.val())
}

export const updateRemoteData = ({ updatedNote, currentStore, _id }) => {
  if (currentStore) {
    const data = localStorage.getItem('notes')
    if (!data) {
      localStorage.setItem('notes', JSON.stringify(updatedNote))

      return Promise.resolve(updatedNote)
    }
    const notes = JSON.parse(data)
    const newStorage = { ...notes, ...updatedNote }
    localStorage.setItem('notes', JSON.stringify(newStorage))

    return Promise.resolve(newStorage)
  }

  return notesRef.update({ ...updatedNote }, (error) => {
    if (error) {
      throw new Error(error.message)
    }
  })
}

export const deleteData = () => {}
