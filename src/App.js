import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Pages/LoginPage/Login';
import Dashboard from './Pages/LoginPage/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}
