import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getNoteToEdit, deleteData } from '../../../reduxComponents/actions'
import history from '../../../history'
import PropTypes from 'prop-types'

class ListItem extends Component {
  handleViewClick = e => {
    const { _id } = this.props
    history.push(`/view-note/${_id}`)
  }

  handleEditClick = e => {
    const { onGetNoteToEdit, _id } = this.props
    onGetNoteToEdit(_id)
    history.push(`/edit/${_id}`)
  }

  handleDeleteClick = () => {
    const { onDeleteNote, currentStore, _id } = this.props
    onDeleteNote(_id, currentStore).catch(console.error)
  }

  render() {
    const { note, _id } = this.props
    const { commentary } = note

    return (
      <li className="list-group-item">
        <div>
          <div>Note name: {note.name}</div>
          <div>Content: {note.content}</div>
          {commentary && commentary.length && (
            <div>
              <button
                className="btn btn-outline-info btn-sm"
                type="button"
                data-toggle="collapse"
                data-target={`#collapse${_id}`}
                aria-expanded="false"
                aria-controls={`collapse${_id}`}
              >
                Show commentaries
              </button>
              <div className="collapse pt-1" id={`collapse${_id}`}>
                <div className="card card-body">
                  {commentary.map(item => {
                    return (
                      <div className="p-1 ml-2" key={item.author}>
                        <h6>Commentaries:</h6>
                        <div className="ml-2">Author: {item.author}</div>
                        <div className="ml-2">Content: {item.content}</div>
                        <div className="ml-2">Created at: {item.created_at}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="d-flex pt-2">
          <button
            id={_id}
            type="button"
            className="btn btn-primary btn-sm"
            onClick={this.handleViewClick}
          >
            View
          </button>
          <button
            id={_id}
            type="button"
            className="btn btn-warning btn-sm ml-1"
            onClick={this.handleEditClick}
          >
            Edit
          </button>
          <button
            id={_id}
            type="button"
            className="btn btn-danger btn-sm ml-auto"
            onClick={this.handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </li>
    )
  }
}

ListItem.propTypes = {
  currentStore: PropTypes.string.isRequired,
  onGetNoteToEdit: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
}

export default withRouter(
  connect(
    notesStore => {
      return {
        currentStore: notesStore.currentStore,
      }
    },
    { onGetNoteToEdit: getNoteToEdit, onDeleteNote: deleteData }
  )(ListItem)
)
