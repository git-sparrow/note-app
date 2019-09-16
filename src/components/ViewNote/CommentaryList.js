import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import PropTypes from "prop-types";

class CommentaryList extends Component {
  render() {
    const { commentary } = this.props

    if (isEmpty(commentary)) {
      return null
    }

    return (
      <ul className="list-group list-group-flush col-12">
        {commentary.map(item => (
          <li className="list-group-item" key={`f${(~~(Math.random()*1e8)).toString(16)}`}>
            <div>Author: {item.author}</div>
            <div>Content: {item.content}</div>
            <div>Created at: {item.created_at}</div>
          </li>
        ))}
      </ul>
    )
  }
}

CommentaryList.propTypes = {
    commentary:  PropTypes.array,
}

export default CommentaryList
