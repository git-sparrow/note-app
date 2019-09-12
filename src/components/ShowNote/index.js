import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ShowNote extends Component {
  render() {
    return (
      <div className="editContact-form">
        <nav className="navbar navbar-dark bg-primary">
          <div className="navbar__title">
            <h1>Show note</h1>
          </div>
          <div className="navbar__navigation">
            <Link to="/">
              <button type="button" className="btn btn-outline-light btn-lg" id="canselButton">
                Back
              </button>
            </Link>
            <Link to="/">
              <button
                className="navbar__button btn btn-light btn-lg"
                id="saveButton"
                onClick={() => {}}
              >
                Edit
              </button>
            </Link>
          </div>
        </nav>
        <div className="content container-fluid">
          <div className="editPersonalData">
            <div>Name</div>
            <div>Content</div>
            <div>Author</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowNote
