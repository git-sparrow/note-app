import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getData, setData, updateNotesStore } from '../../reduxComponents/actions'
import NotesList from './NotesList'
import firebaseDB from '../../firebaseDataBase'

const notesRef = firebaseDB.ref('/notes')

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      content: '',
      author: '',
      id: '',
    }
  }

  componentDidMount() {
    const { currentStore, onGetData, onUpdateNotesStore } = this.props
    if (currentStore) {
      onGetData(currentStore).catch(error => console.error(error))
    }
    notesRef.on('value', snapshot => {
      const notes = snapshot.val()
        if (notes) {
            onUpdateNotesStore(notes)
        }
    })
  }

  componentWillUnmount() {
    notesRef.off()
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, content, author } = this.state
    const { onSetData, currentStore } = this.props

    const newNote = {
      name,
      content,
      author,
      id: Date.now(),
      currentStore,
    }

    onSetData(newNote).catch(error => console.error(error))

    this.setState({
      name: '',
      content: '',
      author: '',
      id: '',
    })
  }

  render() {
    const { name, content, author } = this.state

    return (
      <div>
        <h3>Notes</h3>
        <NotesList />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="note-name">Input your note name</label>
          <input id="note-name" name="name" onChange={this.handleChange} value={name} />
          <label htmlFor="note-content">Input note content</label>
          <input id="note-content" name="content" onChange={this.handleChange} value={content} />
          <label htmlFor="note-author">Author</label>
          <input id="note-author" name="author" onChange={this.handleChange} value={author} />
          <button>Add note</button>
        </form>
      </div>
    )
  }
}

export default withRouter(
  connect(
    notesStore => {
      return { notes: notesStore.notes, currentStore: notesStore.currentStore }
    },
    { onGetData: getData, onSetData: setData, onUpdateNotesStore: updateNotesStore }
  )(HomePage)
)
