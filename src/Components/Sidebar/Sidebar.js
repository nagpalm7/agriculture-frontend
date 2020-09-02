import React, { Component } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  HomeFilled,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DownOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import dashboard_routes from '../../routes/dashboard_routes';
import { Link } from 'react-router-dom';
import '../../Layouts/AdminDashboard/AdminDashboard.css';

const { Sider } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" href="">
        Pending
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" href="">
        Ongoing
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" href="">
        Completed
      </a>
    </Menu.Item>
  </Menu>
);

class Sidebar extends Component {
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
      <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
        <div className="logo">
          {this.state.collapsed ? 'AFL' : 'AFL Monitoring'}
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeFilled />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/district">District</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            <Link to="/villages">Villages</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            <Link to="/dda">DDA</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined />}>
            <Link to="/ado">ADO</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<UserOutlined />}>
            <Link to="/locations">
              {' '}
              Locations
              <Dropdown overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}>
                  <DownOutlined />
                </a>
              </Dropdown>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
