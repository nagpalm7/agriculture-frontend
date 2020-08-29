import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from "../../Pages/Home/Home";

class AdminDashboard extends Component {
  
  render() {
    return (
        <div> 
          <Switch>
            <Route exact path="/home" render={ (props) => <Home  {...props} logout={this.props.logout}/>} />
            <Route path="/about" render={ (props) => <Home  {...props} logout={this.props.logout}/>} />
            <Route path="/villages" render={ (props) => <Home  {...props} logout={this.props.logout}/>} />
            <Route path="/district" render={ (props) => <Home  {...props} logout={this.props.logout}/>} />
            <Route path="/xyz" render={ (props) => <Home  {...props} />} logout={this.props.logout}/>
            <Redirect from='/' to='/home' />
          </Switch>
        </div>
    );
  }
}

export default AdminDashboard;
