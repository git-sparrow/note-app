import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class EditNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      content: '',
      author: '',
      id: '',
    }
  }

  handleChanges = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { name, content, author } = this.state

    return (
      <div className="editContact-form">
        <nav className="navbar navbar-dark bg-primary">
          <div className="navbar__title">
            <h1>Edit note</h1>
          </div>
          <div className="navbar__navigation">
            <Link to="/">
              <button type="button" className="btn btn-outline-light btn-lg" id="canselButton">
                Cancel
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-lg"
              id="deleteButton"
              onClick={() => {}}
            >
              Delete
            </button>
            <Link to="/">
              <button
                className="navbar__button btn btn-light btn-lg"
                id="saveButton"
                onClick={() => {}}
              >
                Save
              </button>
            </Link>
          </div>
        </nav>
        <div className="content container-fluid">
          <div className="editPersonalData">
            <div className="form-row justify-content-between">
              <div className="form-group col-md-6">
                <label className="input-label">
                  Note name
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Note name"
                    name="name"
                    onChange={this.handleChanges}
                    value={name}
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="input-label">
                  Note content
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Note content"
                    name="content"
                    onChange={this.handleChanges}
                    value={content}
                  />
                </label>
              </div>
              <div className="form-group col-md-6">
                <label className="input-label">
                  Author
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Author"
                    name="author"
                    onChange={this.handleChanges}
                    value={author}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditNote
