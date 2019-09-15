import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import NotFound from './components/NotFound404'
import HomePage from './components/HomePage'
import ViewNote from './components/ViewNote'
import EditNote from './components/EditNote'
import history from './history'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/edit/:id" component={EditNote} />
          <Route exact path="/view-note/:id" component={ViewNote} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
