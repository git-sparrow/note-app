import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getNoteToEdit } from '../../../reduxComponents/actions'
import history from '../../../history'

class ListItem extends Component {
  handleViewClick = e => {
      const { onGetNoteToEdit, _id } = this.props
      onGetNoteToEdit(_id)
      history.push(`/view-note/${_id}`)
  }

  handleEditClick = e => {
    const { onGetNoteToEdit, _id } = this.props
    onGetNoteToEdit(_id)
    history.push(`/edit/${_id}`)
  }

  handleDeleteClick = e => {}

  render() {
    const { note, _id } = this.props
    const { commentary } = note

    return (
      <li className="list-group-item">
        <div>
          <div>Note name: {note.name}</div>
          <div>Content: {note.content}</div>
          {commentary &&
            commentary.length &&
            commentary.map(item => {
              return (
                <div>
                  <div>Author: {item.author}</div>
                  <div>Content: {item.content}</div>
                  <div>Created at: {item.created_at}</div>
                </div>
              )
            })}
        </div>
        <div className="d-flex">
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

export default withRouter(
  connect(
    null,
    { onGetNoteToEdit: getNoteToEdit }
  )(ListItem)
)
