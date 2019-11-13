import React from "react"
import ReactDOM from "react-dom"
import {Switch} from "react-router-dom"
import { Route } from "react-router-dom"
import { createBrowserHistory } from 'history'
import { Router } from "react-router"
import Albums from "./Albums"

const history = createBrowserHistory()

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact 
            path="/" 
            component={Albums} 
          />
        </Switch>
      </Router>
    )
  }
}

if (!document.getElementById("app").childNodes.length) {
  ReactDOM.render(<App />, document.getElementById("app"))
} else {
  ReactDOM.hydrate(<App />, document.getElementById("app"))
}