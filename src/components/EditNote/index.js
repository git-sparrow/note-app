import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getData, updateData } from '../../actions'

class EditNote extends Component {
  constructor(props) {
    super(props)
    const { notes = {} } = this.props
    const urlID = this.props.match.params.id
    const noteToEdit = !!urlID ? urlID : ''
    const currentNote = notes[noteToEdit]

    const { name = '', content = '', author = '', id = '' } = !!currentNote ? currentNote : {}

    this.state = {
      name,
      content,
      author,
      id,
      _id: noteToEdit,
    }
  }

  componentDidMount() {
    const { currentStore, onGetData } = this.props
    onGetData(currentStore)
      .then(result => {
        const { name, content, author, id } = result[this.state._id]
        this.setState({ name, content, author, id })
      })
      .catch(error => console.error(error))
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSave = () => {
    const { _id, name, content, author, id } = this.state
    const { onUpdateData, currentStore } = this.props
    onUpdateData({ _id, name, content, author, id, currentStore }).catch(error =>
      console.error(error)
    )
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

export default withRouter(
  connect(
    notesStore => {
      return {
        notes: notesStore.notes,
        noteToEdit: notesStore.noteToEdit,
        currentStore: notesStore.currentStore,
      }
    },
    { onGetData: getData, onUpdateData: updateData }
  )(EditNote)
)
