import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { saveNote } from '../../actions'
import { connect } from 'react-redux'

class EditNote extends Component {
  constructor(props) {
    super(props)
    const { notes = [], noteToEdit = '' } = this.props
    const currentNote = notes.find(index => {
      return index.id === +noteToEdit
    })
    const { name = '', content = '', author = '' } = !!currentNote ? currentNote : []

    this.state = {
      name,
      content,
      author,
      id: noteToEdit,
    }
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSave = () => {
    const { name, content, author, id } = this.state
    const { onSaveNote } = this.props
      onSaveNote({ name, content, author, id })
  }

  render() {
    const { name, content, author } = this.state

    return (
      <div className="editContact-form">
        <nav className="navbar navbar-dark bg-primary">
          <div className="navbar__title">
            <h1>Edit note</h1>
          </div>
          <div className="navbar__navigation">
            <Link to="/">
              <button type="button" className="btn btn-outline-light btn-lg" id="canselButton">
                Cancel
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-lg"
              id="deleteButton"
              onClick={() => {}}
            >
              Delete
            </button>
            <Link to="/">
              <button
                className="navbar__button btn btn-light btn-lg"
                id="saveButton"
                onClick={this.handleSave}
              >
                Save
              </button>
            </Link>
          </div>
        </nav>
        <div className="content container-fluid">
          <div className="editPersonalData">
            <div className="form-row justify-content-between">
              <div className="form-group col-md-6">
                <label className="input-label">
                  Note name
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Note name"
                    name="name"
                    onChange={this.handleChanges}
                    value={name}
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="input-label">
                  Note content
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Note content"
                    name="content"
                    onChange={this.handleChanges}
                    value={content}
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="input-label">
                  Author
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Author"
                    name="author"
                    onChange={this.handleChanges}
                    value={author}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => {
    return { notes: state.notes, noteToEdit: state.noteToEdit }
  },
  { onSaveNote: saveNote }
)(EditNote)
