import React, { Component } from 'react';
import { Button } from 'antd';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <>
        <h1>Home</h1>
        <Button htmlType="submit" onClick={()=>this.props.logout()}>
          log out
        </Button>
      </>
    );
  }
}

export default Home;
