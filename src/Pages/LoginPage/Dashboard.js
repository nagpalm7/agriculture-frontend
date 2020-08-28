import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Dashboard.css';
import { Button } from 'antd';

class Dashboard extends Component {
  render() {
    const logoutUser = () => {
      localStorage.removeItem('token');
      this.props.history.push('/');
    };
    if (localStorage.getItem('token')) {
      return (
        <>
          <h1>Dashboard</h1>
          <Button htmlType="submit" onClick={logoutUser}>
            log out
          </Button>
        </>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

export default Dashboard;
