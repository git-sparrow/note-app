import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import {
  getData,
  setData,
  updateNotesStore,
  changeRemoteStore,
} from '../../reduxComponents/actions'
import NotesList from './NotesList'
import firebaseDB from '../../firebaseDataBase'
import { currentStore as remoteStorage } from '../../constants'

const notesRef = firebaseDB.ref('/notes')

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      content: '',
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

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleChangeRemoteStore = e => {
    const { notes, currentStore, onChangeRemoteStore, onUpdateNotesStore } = this.props
    const chosenRemoteStore = e.target.name
    if (currentStore === chosenRemoteStore) {
      return
    } else {
      onChangeRemoteStore(chosenRemoteStore, notes)
        .then(() => {
          if (chosenRemoteStore === remoteStorage.localStorage) {
            notesRef.off()
          } else {
            notesRef.on('value', snapshot => {
              const notes = snapshot.val()
              if (notes) {
                onUpdateNotesStore(notes)
              }
            })
          }
        })
        .catch(console.error)
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, content } = this.state
    const { onSetData, currentStore } = this.props

    const newNote = {
      name,
      content,
      commentary: '',
      _id: `_id${Date.now()}`,
      currentStore,
    }

    onSetData(newNote).catch(console.error)

    this.setState({
      name: '',
      content: '',
    })
  }

  render() {
    const { name, content } = this.state
    const { currentStore } = this.props
    const localStorageBtnClass = classNames('btn', {
      'btn-success': currentStore === remoteStorage.localStorage,
      'btn-secondary': currentStore !== remoteStorage.localStorage,
    })
    const firebaseBtnClass = classNames('btn', 'ml-1', {
      'btn-success': currentStore === remoteStorage.firebase,
      'btn-secondary': currentStore !== remoteStorage.firebase,
    })

    return (
      <>
        <nav className="navbar sticky-top navbar-dark bg-primary row">
          <div className="col-4 form-group">
            <div className="h5">Chose remote store:</div>
            <button
              type="button"
              className={localStorageBtnClass}
              name={remoteStorage.localStorage}
              onClick={this.handleChangeRemoteStore}
            >
              LocalStorage
            </button>
            <button
              type="button"
              className={firebaseBtnClass}
              name={remoteStorage.firebase}
              onClick={this.handleChangeRemoteStore}
            >
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
                  onChange={this.handleInputChange}
                  value={name}
                  pattern="[a-zA-Z0-9]+"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="note-content">Content</label>
                <input
                  id="note-content"
                  className="form-control"
                  name="content"
                  onChange={this.handleInputChange}
                  value={content}
                  pattern="[a-zA-Z0-9]+"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
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
    {
      onGetData: getData,
      onSetData: setData,
      onUpdateNotesStore: updateNotesStore,
      onChangeRemoteStore: changeRemoteStore,
    }
  )(HomePage)
)
