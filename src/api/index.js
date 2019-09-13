export const sendData = (newNote, currentStore) => {
  if (currentStore) {
    const storage = localStorage.getItem('notes')
    if (!storage) {
      localStorage.setItem('notes', JSON.stringify(newNote))

      return Promise.resolve()
    }
    const notes = JSON.parse(storage)
    const newStorage = { ...notes, ...newNote }
    localStorage.setItem('notes', JSON.stringify(newStorage))

    return Promise.resolve()
  }
}

export const fetchData = currentStore => {
  console.log('===> fiered FetchData')
  if (currentStore) {
    const storage = localStorage.getItem('notes')
    if (!storage) {
      const notes = JSON.parse(storage)
        console.log(notes)

      return Promise.resolve(notes)
    }
  }
}

export const updateData = () => {}

export const deleteData = () => {}
