import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Pages/LoginPage/Login';
import Dashboard from './Pages/LoginPage/Dashboard';
import isAuthenticated from './Pages/LoginPage/auth';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login}>
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/Dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
