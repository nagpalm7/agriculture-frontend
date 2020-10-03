import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Pages/Login/Login';
import AdminDashboard from './Layouts/AdminDashboard/AdminDashboard';
import DdaDashboard from './Layouts/DdaDashboard/DdaDashboard';
import { axiosInstance } from './utils/axiosIntercepter';

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
    const token =
      localStorage.getItem('token') == null
        ? sessionStorage.getItem('token')
        : localStorage.getItem('token');
    const isLoggedIn = token === null;

    axiosInstance.interceptors.request.use(function (config) {
      config.headers.Authorization = 'token ' + token;
      return config;
    });

    this.setState({
      isLoggedIn: !isLoggedIn,
      role:
        localStorage.getItem('Role') == null
          ? parseInt(sessionStorage.getItem('Role'))
          : parseInt(localStorage.getItem('Role')),
    });
  }
  /*eslint-enable */

  toggleIsLoggedIn = () => {
    const { isLoggedIn } = this.state;
    this.setState((prev) => {
      return {
        ...prev,
        isLoggedIn: !isLoggedIn,
      };
    });
  };

  setRole = (role) => {
    this.setState((prev) => {
      return {
        ...prev,
        role: parseInt(role, 10),
      };
    });
  };

  logout = () => {
    delete localStorage.token;
    delete sessionStorage.token;
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
