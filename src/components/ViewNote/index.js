import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getData,
  setData,
  updateNotesStore,
  changeRemoteStore,
} from '../../reduxComponents/actions'
import CommentaryList from './CommentaryList'
import firebaseDB from '../../firebaseDataBase'
import { currentStore as remoteStorage } from '../../constants'

const notesRef = firebaseDB.ref('/notes')

class ViewNote extends Component {
  constructor(props) {
    super(props)
    const { notes = {} } = this.props
    console.log(notes)
    const urlID = this.props.match.params.id
    const noteToEdit = !!urlID ? urlID : ''
    console.log(noteToEdit)
    const currentNote = notes[noteToEdit]
    console.log(currentNote)

    const { name = '', content = '', commentary = [] } = !!currentNote ? currentNote : {}

    this.state = {
      name,
      content,
      commentary,
      _id: noteToEdit,
      commentaryAuthor: '',
      commentaryContent: '',
    }
  }

  componentDidMount() {
    const { currentStore, onGetData } = this.props
    const urlID = this.props.match.params.id
    const _id = !!urlID ? urlID : ''
    onGetData(currentStore)
      .then(result => {
        const { name, content, commentary } = result[_id]
        this.setState({ name, content, commentary })
      })
      .catch(console.error)
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {}

  render() {
    const { name, content, commentary, commentaryAuthor, commentaryContent } = this.state

    return (
      <>
        <nav className="navbar sticky-top navbar-dark bg-primary">
          <div className="container-fluid d-flex justify-content-between">
            <h1 className="">Notes app</h1>
            <button
              type="button"
              className="btn btn-outline-light btn-lg float-right"
              id="canselButton"
              onClick={this.handleCancelClick}
            >
              Back
            </button>
          </div>
        </nav>
        <div className="container-fluid row p-3">
          <h3>Note details</h3>
          <div className="col-12">Note name: {name}</div>
          <div className="col-12">Content: {content}</div>
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="note-name">Input your comment here</label>
                <input
                  id="note-name"
                  className="form-control"
                  name="commentaryContent"
                  onChange={this.handleInputChange}
                  value={commentaryContent}
                />
              </div>
              <div className="form-group">
                <label htmlFor="note-content">Content</label>
                <input
                  id="note-content"
                  className="form-control"
                  name="commentaryAuthor"
                  onChange={this.handleInputChange}
                  value={commentaryAuthor}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add comment
              </button>
            </form>
          </div>
          <CommentaryList commentary={commentary} />
        </div>
      </>
    )
  }
}

export default withRouter(
  connect(
    notesStore => {
      return { notes: notesStore.notes, currentStore: notesStore.currentStore }
    },
    {
      onGetData: getData,
      onSetData: setData,
      onUpdateNotesStore: updateNotesStore,
      onChangeRemoteStore: changeRemoteStore,
    }
  )(ViewNote)
)
