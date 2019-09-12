import React, { Component } from 'react'
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

    const newItem = {
      name,
      content,
      author,
      id: Date.now(),
    }

    this.setState(state => ({
      notes: [...state.notes, newItem],
      name: '',
      content: '',
      author: '',
    }))
  }

  render() {
    const { name, content, author, notes } = this.state

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

export default App
