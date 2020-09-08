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
      <div>
        <BrowserRouter>
          <Layout>
            <Sidebar />
            <Layout
              className="site-layout"
              style={{ backgroundColor: '#f5f3ff' }}>
              <Headers logout={this.props.logout} />
              <Contents />
              <Footer>footer</Footer>
            </Layout>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

export default AdminDashboard;
