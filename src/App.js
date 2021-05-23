import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Pages/Login/Login';
import AdminDashboard from './Layouts/AdminDashboard/AdminDashboard';
import DdaDashboard from './Layouts/DdaDashboard/DdaDashboard';
import { axiosInstance } from './utils/axiosIntercepter';
import AdoDashboard from './Layouts/AdoDashboard/AdoDashboard';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      role: null,
      isLoggedIn: false,
      loginData: null,
      lang:  'en',
    };
  }
  /*eslint-disable */
  componentWillMount() {
    const token =
      localStorage.getItem('token') == null
        ? sessionStorage.getItem('token')
        : localStorage.getItem('token');
    console.log(token);
    let isLoggedIn = token === null;
    console.log(' asdAD', token);
    if (token) {
      axiosInstance.interceptors.request.use(function (config) {
        config.headers.Authorization = 'token ' + token;
        return config;
      });
    }
    let lang;
    if (sessionStorage.getItem('lang')) {
      lang = sessionStorage.getItem('lang');
    }
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
    }
    this.setState({
      ...this.state,
      isLoggedIn: !isLoggedIn,
      lang:lang,
      role:
        localStorage.getItem('Role') == null
          ? parseInt(sessionStorage.getItem('Role'))
          : parseInt(localStorage.getItem('Role')),
      ddaId:
        localStorage.getItem('dda_id') == null
          ? parseInt(sessionStorage.getItem('dda_id'))
          : parseInt(localStorage.getItem('dda_id')),
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
  setLoginData = (data) => {
    console.log(data);
    this.setState({
      ...this.state,
      loginData: data,
    });
  };
  setLang = (data) => {
    this.setState({
      ...this.state,
      lang: data,
    });
    localStorage.setItem('lang', data);
  };
  logout = () => {
    delete localStorage.token;
    delete sessionStorage.token;
    delete localStorage.Role;
    delete sessionStorage.Role;
    delete localStorage.dda_id;
    delete sessionStorage.loginData;
    delete localStorage.loginData;
    delete sessionStorage.dda_id;
    this.toggleIsLoggedIn();
  };
  render() {
    const { isLoggedIn, role, ddaId } = this.state;
    if (isLoggedIn) {
      if (role === 5) {
        return (
          <BrowserRouter>
            <Switch>
              <Route
                path="/"
                render={(props) => (
                  <AdminDashboard
                    setLang={this.setLang}
                    lang={this.state.lang}
                    history={props.history}
                    logout={this.logout}
                    loginData={this.state.loginData}
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
                  <DdaDashboard
                    setLang={this.setLang}
                    lang={this.state.lang}
                    history={props.history}
                    logout={this.logout}
                    loginData={this.state.loginData}
                    ddaId={ddaId}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        );
      } else {
        return (
          <BrowserRouter>
            <Switch>
              <Route
                path="/"
                render={(props) => (
                  <AdoDashboard
                    setLang={this.setLang}
                    lang={this.state.lang}
                    history={props.history}
                    logout={this.logout}
                    loginData={this.state.loginData}
                    ddaId={ddaId}
                  />
                )}
              />
            </Switch>
          </BrowserRouter>
        );
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
                  setLang={this.setLang}
                  lang={this.state.lang}
                  setLoginData={this.setLoginData}
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
