import React from 'react'
import { Route } from 'react-router-dom'
import EditNote from '../components/EditNote'
import NotFound from '../components/NotFound404'
import HomePage from '../components/HomePage'
import ShowNote from '../components/ShowNote'

const routes = [
  <Route exact path="/" component={HomePage} />,
  <Route exact path="/edit/:id" component={EditNote} />,
  <Route exact path="/note-list" component={ShowNote} />,
  <Route component={NotFound} />,
]

export default routes
