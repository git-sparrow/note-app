import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNoteToEdit } from '../../actions'
import history from '../../history'

class ListItem extends Component {
  handleEditClick = e => {
    const { onGetNoteToEdit } = this.props
    const noteToEdit = e.target.id
    onGetNoteToEdit(noteToEdit)
    history.push('/edit:')
  }

  render() {
    const { note } = this.props
    return (
      <li key={note.id}>
        {note.name}
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

export default connect(
  null,
  { onGetNoteToEdit: getNoteToEdit }
)(ListItem)
