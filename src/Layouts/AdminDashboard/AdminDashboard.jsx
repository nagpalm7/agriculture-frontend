import React, { Component } from 'react';
import { Layout } from 'antd';
import './AdminDashboard.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Headers from '../../Components/Header/Header';
import Contents from '../../Components/Content/Content';
import { BrowserRouter } from 'react-router-dom';

const { Footer } = Layout;

class AdminDashboard extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Sidebar collapsed={this.state.collapsed} toggle={this.toggle} />
          <Layout className="site-layout">
            <Headers collapsed={this.state.collapsed} toggle={this.toggle} />
            <Contents />
            <Footer style={{ textAlign: 'center' }}>Copyright ©2020</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default AdminDashboard;
