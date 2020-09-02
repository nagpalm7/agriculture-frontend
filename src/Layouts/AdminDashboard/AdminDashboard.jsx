import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout, Menu, Button, PageHeader, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeFilled,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './AdminDashboard.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Headers from '../../Components/Header/Header';
import Contents from '../../Components/Content/Content';
import dashboard_routes from '../../routes/dashboard_routes';
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
      <div style={{ overflow: 'hidden' }}>
        <BrowserRouter>
          <Layout>
            <Sidebar />
            <Layout className="site-layout">
              <Headers />
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
