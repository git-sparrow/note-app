export const sendData = (newNote, currentStore) => {
    if (currentStore) {
        const storage = localStorage.getItem('notes')
        if (!storage) {
            localStorage.setItem('notes', JSON.stringify([newNote]))
        }
    }
}

export const getData = () => {

}

export const updateData = () => {

}

export const deleteData = () => {

}