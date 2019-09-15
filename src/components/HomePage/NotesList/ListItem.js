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
      <li>
        <div>{note.name}</div>
        <span>{note.content}</span>
        <span>{note.author}</span>
        <button
          id={note.id}
          className="content__table__button-hidden btn btn-link"
          type="button"
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
