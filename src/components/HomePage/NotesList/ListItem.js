import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getNoteToEdit } from '../../../reduxComponents/actions'
import history from '../../../history'

class ListItem extends Component {
  handleEditClick = e => {
    const { onGetNoteToEdit, id } = this.props
    onGetNoteToEdit(id)
    history.push(`/edit/${id}`)
  }

  render() {
    const { note } = this.props

    return (
      <li className="list-group-item">
        <div>
          <div>Note name: {note.name}</div>
          <div>
            {note.content && <div> Content: {note.content}</div>}
              {note.author && <div>Author: {note.author}</div>}
          </div>
          <span>{note.content}</span>
          <span>{note.author}</span>
        </div>
        <button
          id={note.id}
          type="button"
          className="btn btn-warning btn-sm"
          onClick={this.handleEditClick}
        >
          Edit
        </button>
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
