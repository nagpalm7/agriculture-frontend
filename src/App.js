import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Pages/Login/Login';
import AdminDashboard from './Layouts/AdminDashboard/AdminDashboard';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }
  /*eslint-disable */
  UNSAFE_componentWillMount() {
    let isLoggedIn =
      localStorage.getItem('Token') || sessionStorage.getItem('Token');
    this.setState({
      isLoggedIn: isLoggedIn,
    });
  }
  /*eslint-enable */

  toggleIsLoggedIn = () => {
    const { isLoggedIn } = this.state;
    this.setState({
      isLoggedIn: !isLoggedIn,
    });
  };

  logout = () => {
    delete localStorage.Token;
    delete sessionStorage.Token;
    this.toggleIsLoggedIn();
  };

  render() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return (
        <BrowserRouter>
          <Switch>
            <Route
              path="/"
              render={(props) => (
                <AdminDashboard history={props.history} logout={this.logout} />
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
              exact
              render={(props) => (
                <Login
                  history={props.history}
                  toggleIsLoggedIn={this.toggleIsLoggedIn}
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
