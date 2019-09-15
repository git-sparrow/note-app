import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'

class CommentaryList extends Component {
  render() {
    const { commentary } = this.props

    if (isEmpty(commentary)) {
      return null
    }

    return (
      <ul className="list-group list-group-flush col-12">
        {commentary.map(item => (
          <li className="list-group-item" key={item}>
            <div>Author: {item.author}</div>
            <div>Content: {item.content}</div>
            <div>Created at: {item.created_at}</div>
          </li>
        ))}
      </ul>
    )
  }
}

export default CommentaryList
