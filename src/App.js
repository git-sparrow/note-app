import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './components/HomePage'
import EditNote from './components/EditNote'
import ShowNote from './components/ShowNote'
import NotFound from './components/NotFound404'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/edit" component={EditNote} />
          <Route exact path="/show-note" component={ShowNote} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
