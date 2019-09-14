import React, { Component } from 'react'
import { Router, Switch } from 'react-router-dom'
import routes from './routes'
import history from './history'

import './App.css'

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
            {routes}
        </Switch>
      </Router>
    )
  }
}

export default App
