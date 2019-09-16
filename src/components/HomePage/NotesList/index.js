import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getNoteToEdit } from '../../../reduxComponents/actions'
import ListItem from './ListItem'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'

class NotesList extends Component {
  render() {
    const { notes } = this.props

    if (isEmpty(notes)) {
      return null
    }

    return (
      <ul className="list-group list-group-flush">
        {Object.keys(notes).map(index => (
          <ListItem _id={index} note={notes[index]} key={index} />
        ))}
      </ul>
    )
  }
}

NotesList.propTypes = {
  notes: PropTypes.array.isRequired,
  onGetNoteToEdit: PropTypes.func.isRequired,
}

export default withRouter(
  connect(
    notesStore => {
      return { notes: notesStore.notes }
    },
    { onGetNoteToEdit: getNoteToEdit }
  )(NotesList)
)
