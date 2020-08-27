import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Pages/LoginPage/Login';
import Dashboard from './Pages/LoginPage/Dashboard';
import Error from './Pages/LoginPage/Error';
//import isAuthenticated from './Pages/LoginPage/auth';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        {/*isAuthenticated() ? (
          <Route exact path="/dashboard" component={Dashboard} />
        ) : (
          <Redirect to="/" />
        )*/}
        <Route path="/dashboard" component={Dashboard} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}
