import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Panel from "./components/Panel";
import GuardedRoute from "./components/GuardRoute";
import { Router, Switch, Route } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default class App extends Component {
  constructor() {
    super();
    this.state = { isAutheticated: false };
    this.checkToken = this.checkToken.bind(this);
  }
  logout = () => {
    localStorage.clear();
  };

  checkToken = (data) => {
    this.setState({ isAutheticated: data });
  };

  render() {
    return (
      <div className="App">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Notifications</Navbar.Brand>
          <Nav className="float-right">
            <Nav.Link href="/" onClick={this.logout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Login tokenHandler={this.checkToken} history={history}></Login>
            </Route>
            <GuardedRoute
              path="/panel"
              component={Panel}
              auth={this.state.isAutheticated}
              history={history}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
