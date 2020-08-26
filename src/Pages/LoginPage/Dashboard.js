import React, { Component } from 'react';
import './Dashboard.css';
import { Button } from 'antd';

class Dashboard extends Component {
  render() {
    const logoutUser = () => {
      localStorage.removeItem('token');
      this.props.history.push('/');
    };
    return (
      <>
        <h1>Dashboard</h1>
        <Button htmlType="submit" onClick={logoutUser}>
          log out
        </Button>
      </>
    );
  }
}

export default Dashboard;
