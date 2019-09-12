import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getNoteToEdit } from '../../actions'
import { connect } from 'react-redux'

class ListItem extends Component {
  handleEditClick = e => {
    const { onGetNoteToEdit } = this.props
    onGetNoteToEdit(e.target.id)
  }

  render() {
    const { note } = this.props
    return (
      <li key={note.id}>
        {note.name}
        <Link to="/edit">
          <button
            id={note.id}
            className="content__table__button-hidden btn btn-link"
            type="button"
            onClick={this.handleEditClick}
          >
            Edit
          </button>
        </Link>
      </li>
    )
  }
}

export default connect(
  null,
  { onGetNoteToEdit: getNoteToEdit }
)(ListItem)
