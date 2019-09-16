import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getData,
  setData,
  updateNotesStore,
  changeRemoteStore,
  updateData,
} from '../../reduxComponents/actions'
import CommentaryList from './CommentaryList'
import firebaseDB from '../../firebaseDataBase'
import { currentStore as remoteStorage } from '../../constants'
import history from '../../history'
import PropTypes from 'prop-types'

const notesRef = firebaseDB.ref('/notes')

class ViewNote extends Component {
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
      commentaryAuthor: '',
      commentaryContent: '',
    }
  }

  componentDidMount() {
    const { currentStore, onGetData, onUpdateNotesStore } = this.props
    const urlID = this.props.match.params.id
    const _id = !!urlID ? urlID : ''
    onGetData(currentStore)
      .then(result => {
        const { name, content, commentary } = result[_id]
        this.setState({ name, content, commentary })
      })
      .catch(console.error)

    if (currentStore === remoteStorage.firebase) {
      notesRef.on('value', snapshot => {
        const notes = snapshot.val()
        if (notes) {
          onUpdateNotesStore(notes)
        }
      })
    }
  }

  componentWillUnmount() {
    notesRef.off()
  }

  handleBackClick = () => {
    history.push('/')
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    let { _id, name, content, commentary, commentaryAuthor, commentaryContent } = this.state
    if (!commentary.length) {
      commentary = [
        {
          author: commentaryAuthor,
          content: commentaryContent,
          created_at: new Date().toLocaleDateString(),
        },
      ]
    } else {
      const newCommentary = {
        author: commentaryAuthor,
        content: commentaryContent,
        created_at: new Date().toLocaleDateString(),
      }
      commentary.push(newCommentary)
    }
    const { onUpdateData, currentStore } = this.props
    onUpdateData({ _id, name, content, commentary, currentStore }).catch(console.error)

    this.setState({
      commentaryAuthor: '',
      commentaryContent: '',
    })
  }

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
              onClick={this.handleBackClick}
            >
              Back
            </button>
          </div>
        </nav>
        <div className="container-fluid row p-3">
          <h3 className="ml-1">Note details</h3>
          <div className="col-12 h4">
            Note name: <span className="h5">{name}</span>
          </div>
          <div className="col-12 h4">
            Content: <span className="h5">{content}</span>
          </div>
          <div className="col-12 pt-3">
            <h4 className="ml-1">Add comment to note</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="note-name">Input your comment here</label>
                <input
                  id="note-name"
                  className="form-control"
                  name="commentaryContent"
                  onChange={this.handleInputChange}
                  value={commentaryContent}
                  pattern="[a-zA-Z0-9]+"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="note-content">Author</label>
                <input
                  id="note-content"
                  className="form-control"
                  name="commentaryAuthor"
                  onChange={this.handleInputChange}
                  value={commentaryAuthor}
                  pattern="[a-zA-Z0-9]+"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary float-right">
                Add comment
              </button>
            </form>
          </div>
          <div className="container pt-3">
            <h4>Commentaries list</h4>
            <CommentaryList commentary={commentary} />
          </div>
        </div>
      </>
    )
  }
}

ViewNote.propTypes = {
  notes: PropTypes.array.isRequired,
  currentStore: PropTypes.string.isRequired,
  onGetData: PropTypes.func.isRequired,
  onUpdateData: PropTypes.func.isRequired,
  onUpdateNotesStore: PropTypes.func.isRequired,
}

export default withRouter(
  connect(
    notesStore => {
      return { notes: notesStore.notes, currentStore: notesStore.currentStore }
    },
    {
      onGetData: getData,
      onUpdateData: updateData,
      onUpdateNotesStore: updateNotesStore,
    }
  )(ViewNote)
)
