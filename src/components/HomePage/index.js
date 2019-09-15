import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getData, setData, updateNotesStore } from '../../reduxComponents/actions'
import NotesList from './NotesList'
import firebaseDB from '../../firebaseDataBase'
import {currentStore as remoteStorage} from "../../constants";

const notesRef = firebaseDB.ref('/notes')

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      content: '',
      author: '',
      id: '',
    }
  }

  componentDidMount() {
    const { currentStore, onGetData, onUpdateNotesStore } = this.props
    if (currentStore === remoteStorage.localStorage) {
      onGetData(currentStore).catch(console.error)
    } else {
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, content, author } = this.state
    const { onSetData, currentStore } = this.props

    const newNote = {
      name,
      content,
      author,
      id: Date.now(),
      currentStore,
    }

    onSetData(newNote).catch(console.error)

    this.setState({
      name: '',
      content: '',
      author: '',
      id: '',
    })
  }

  render() {
    const { name, content, author } = this.state
    const { currentStore } = this.props

    return (
      <>
        <nav className="navbar sticky-top navbar-dark bg-primary row">
          <div className="col-4 form-group">
            <button type="button" class="btn btn-success">
              LocalStorage
            </button>
            <button type="button" className="btn btn-secondary ml-1">
              Firebase
            </button>
          </div>
          <div className="col-8 text-left">
            <h1 className="">Notes app</h1>
          </div>
        </nav>
        <div className="row p-3">
          <div className="col-6">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="note-name">Input your note name</label>
                <input
                  id="note-name"
                  className="form-control"
                  name="name"
                  onChange={this.handleChange}
                  value={name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="note-content">Input note content</label>
                <input
                  id="note-content"
                  className="form-control"
                  name="content"
                  onChange={this.handleChange}
                  value={content}
                />
              </div>
              <div className="form-group">
                <label htmlFor="note-author">Author</label>
                <input
                  id="note-author"
                  className="form-control"
                  name="author"
                  onChange={this.handleChange}
                  value={author}
                />
              </div>
              <button type="button" className="btn btn-primary">
                Add note
              </button>
            </form>
          </div>
          <div className="col-6">
            <NotesList />
          </div>
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
    { onGetData: getData, onSetData: setData, onUpdateNotesStore: updateNotesStore }
  )(HomePage)
)
