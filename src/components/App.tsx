import React from 'react'
import { Route, Switch } from 'react-router-dom'
import WeatherApp from './WeatherApp'

export default function App() {
  return (
    <Switch>
      <Route path="/">
        <WeatherApp />
      </Route>
    </Switch>
  )
}
