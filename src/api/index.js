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

      notesRef.set({
          'username': 'sadsa',
          'email': '5456',
      })

    return Promise.resolve(newStorage)
  }
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

export const updateRemoteData = (updatedNote, currentStore) => {
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
}

export const deleteData = () => {}
