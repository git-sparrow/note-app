import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getData, updateData, deleteData } from '../../reduxComponents/actions'
import history from '../../history'
import PropTypes from 'prop-types'

class EditNote extends Component {
  constructor(props) {
    super(props)
    const { notes = {} } = this.props
    const urlID = this.props.match.params.id
    const noteToEdit = !!urlID ? urlID : ''
    const currentNote = notes[noteToEdit]

    const { name = '', content = '', commentary = [] } = !!currentNote ? currentNote : {}

    this.state = {
      name,
      content,
      commentary,
      _id: noteToEdit,
    }
  }

  componentDidMount() {
    const { currentStore, onGetData } = this.props
    onGetData(currentStore)
      .then(result => {
        const { name, content, commentary } = result[this.state._id]
        this.setState({ name, content, commentary })
      })
      .catch(console.error)
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleDeletion = () => {
    const { onDeleteNote, currentStore } = this.props
    const { _id } = this.state
    onDeleteNote(_id, currentStore).catch(console.error)
    history.push('/')
  }

  handleCancelClick = () => {
    history.push('/')
  }

  handleSave = () => {
    const { _id, name, content, commentary } = this.state
    const { onUpdateData, currentStore } = this.props
    onUpdateData({ _id, name, content, commentary, currentStore }).catch(console.error)
    history.push('/')
  }

  render() {
    const { name, content } = this.state

    return (
      <div className="editContact-form">
        <nav className="navbar navbar-dark bg-primary">
          <div className="navbar__title">
            <h1>Edit note</h1>
          </div>
          <div className="navbar__navigation">
            <button
              type="button"
              className="btn btn-outline-light btn-lg"
              id="canselButton"
              onClick={this.handleCancelClick}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger btn-lg"
              id="deleteButton"
              onClick={this.handleDeletion}
            >
              Delete
            </button>
            <button
              className="navbar__button btn btn-light btn-lg"
              id="saveButton"
              onClick={this.handleSave}
            >
              Save
            </button>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EditNote.propTypes = {
  notes: PropTypes.array.isRequired,
  currentStore: PropTypes.string.isRequired,
  onGetData: PropTypes.func.isRequired,
  onUpdateData: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
}

export default withRouter(
  connect(
    notesStore => {
      return {
        notes: notesStore.notes,
        currentStore: notesStore.currentStore,
      }
    },
    { onGetData: getData, onUpdateData: updateData, onDeleteNote: deleteData }
  )(EditNote)
)
