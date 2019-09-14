import firebaseDB from '../db'

let notesRef = firebaseDB.ref('/notes')

export const sendData = (newNote, currentStore) => {
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
  notesRef.set(newNote, function(error) {
    if (error) {
      console.error(error)
      return Promise.reject(error)
    }
  })

  return Promise.resolve()
}

export const fetchData = currentStore => {
  if (currentStore) {
    const data = localStorage.getItem('notes')
    if (data) {
      const notes = JSON.parse(data)

      return Promise.resolve(notes)
    }

    return Promise.resolve({})
  }
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
  notesRef.child(_id).update({ ...updatedNote }, function(error) {
    if (error) {
      console.error(error)
      return Promise.reject(error)
    } else {
      return Promise.resolve({})
    }
  })
}

export const deleteData = () => {}
