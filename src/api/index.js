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
}

export const fetchData = currentStore => {
  if (currentStore) {
    const data = localStorage.getItem('notes')
    if (data) {
      const notes = JSON.parse(data)
      console.log(notes)

      return Promise.resolve(notes)
    }

    return Promise.resolve({})
  }
}

export const updateData = () => {}

export const deleteData = () => {}
