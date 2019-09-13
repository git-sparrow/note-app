import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData, setData } from '../../actions'
import ListItem from './ListItem'

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
    const { currentStore } = this.props
    getData(currentStore)
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

    onSetData(newNote)

    this.setState({
      name: '',
      content: '',
      author: '',
      id: '',
    })
  }

  render() {
    const { name, content, author } = this.state
    const { notes } = this.props

    return (
      <div>
        <h3>Notes</h3>
        {!!notes.length && (
          <ul>
            {notes.map(item => {
              return <ListItem note={item} key={item.id} />
            })}
          </ul>
        )}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="note-name">Input your note name</label>
          <input id="note-name" name="name" onChange={this.handleChange} value={name} />
          <label htmlFor="note-content">Input note content</label>
          <input id="note-content" name="content" onChange={this.handleChange} value={content} />
          <label htmlFor="note-author">Author</label>
          <input id="note-author" name="author" onChange={this.handleChange} value={author} />
          <button>Add note</button>
        </form>
      </div>
    )
  }
}

export default connect(
  state => {
    return { notes: state.notes, currentStore: state.currentStore }
  },
  { onSetData: setData }
)(HomePage)