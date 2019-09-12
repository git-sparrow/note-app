import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './components/HomePage'
import EditNote from './components/EditNote'
import ShowNote from './components/ShowNote'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/edit" component={EditNote} />
        <Route exact path="/show-note" component={ShowNote} />
      </Router>
    )
  }
}

export default App
