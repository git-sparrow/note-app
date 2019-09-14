import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getNoteToEdit } from '../../../actions'
import ListItem from './ListItem'
import isEmpty from 'lodash/isEmpty'

class NotesList extends Component {
  render() {
    const { notes } = this.props

    if (isEmpty(notes)) {
      return null
    }

    return (
      <ul>
        {Object.keys(notes).map(index => (
          <ListItem id={index} note={notes[index]} key={index} />
        ))}
      </ul>
    )
  }
}

export default withRouter(
  connect(
    notesStore => {
      return { notes: notesStore.notes }
    },
    { onGetNoteToEdit: getNoteToEdit }
  )(NotesList)
)
