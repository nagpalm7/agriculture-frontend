import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Pages/Login/Login';
import AdminDashboard from './Layouts/AdminDashboard/AdminDashboard';
import DdaDashboard from './Layouts/DdaDashboard/DdaDashboard';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      role: null,
      isLoggedIn: false,
    };
  }
  /*eslint-disable */
  componentWillMount() {
    let isLoggedIn =
      localStorage.getItem('Token') === undefined &&
      sessionStorage.getItem('Token') === undefined;
    let roleIsNull =
      localStorage.getItem('Role') === null &&
      sessionStorage.getItem('Role') === null;
    this.setState({
      isLoggedIn: !isLoggedIn,
      role: 5,
    });
  }
  /*eslint-enable */

  toggleIsLoggedIn = () => {
    const { isLoggedIn } = this.state;
    this.setState(() => {
      return {
        ...this.state,
        isLoggedIn: !isLoggedIn,
      };
    });
  };

  setRole = (role) => {
    this.setState(() => {
      return {
        ...this.state,
        role: role,
      };
    });
  };

  logout = () => {
    delete localStorage.Token;
    delete sessionStorage.Token;
    this.toggleIsLoggedIn();
  };

  render() {
    const { isLoggedIn, role } = this.state;

    if (isLoggedIn) {
      if (role === 5) {
        return (
          <BrowserRouter>
            <Switch>
              <Route
                path="/"
                render={(props) => (
                  <AdminDashboard
                    history={props.history}
                    logout={this.logout}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        );
      } else if (role === 4) {
        return (
          <BrowserRouter>
            <Switch>
              <Route
                path="/"
                render={(props) => (
                  <DdaDashboard history={props.history} logout={this.logout} />
                )}
              />
            </Switch>
          </BrowserRouter>
        );
      } else {
        return <>hehllp</>;
      }
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Login
                  history={props.history}
                  toggleIsLoggedIn={this.toggleIsLoggedIn}
                  setRole={this.setRole}
                />
              )}
            />
            <Redirect from="/" to="/" />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}
