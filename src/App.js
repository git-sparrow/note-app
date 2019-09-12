import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNote } from './actions'

import './App.css'

class NoteListItem extends Component {
  handleEditClick = () => {
    const { id } = this.props
  }

  render() {
    const { note } = this.props
    return (
      <li key={note.id}>
        {note.name}
        <button onClick={this.handleEditClick}>Edit</button>
      </li>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      name: '',
      content: '',
      author: '',
      id: null,
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, content, author } = this.state
    const { onAddNote } = this.props

    const newNote = {
      name,
      content,
      author,
      id: Date.now(),
    }

    onAddNote(newNote)

    this.setState({
      name: '',
      content: '',
      author: '',
      id: '',
    })
  }

  render() {
    const { name, content, author } = this.state
    const { notes } = this.props

    return (
      <div>
        <h3>Notes</h3>
        {!!notes.length && (
          <ul>
            {notes.map(item => {
              return <NoteListItem note={item} />
            })}
          </ul>
        )}
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

export default connect(
  state => {
    return { notes: state.notes }
  },
  { onAddNote: addNote }
)(App)
