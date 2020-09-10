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
import { Link } from 'react-router-dom';
import './Sidebar.css';

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
  render() {
    return (
      <Sider
        width="250px"
        breakpoint="sm"
        collapsedWidth="80"
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        className="sidebar-style">
        <div className="logo">
          {this.props.collapsed ? 'AFL' : 'AFL Monitoring'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          className="side-menu-style"
          style={{ background: '#3d0098' }}>
          <Menu.Item
            key="1"
            icon={<HomeFilled />}
            style={{ borderRadius: '25px', marginBottom: '20px' }}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<VideoCameraOutlined />}
            style={{ borderRadius: '25px', marginBottom: '20px' }}>
            <Link to="/district">District</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<UploadOutlined />}
            style={{ borderRadius: '25px', marginBottom: '20px' }}>
            <Link to="/villages">Villages</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<TeamOutlined />}
            style={{ borderRadius: '25px', marginBottom: '20px' }}>
            <Link to="/dda">DDA</Link>
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<UserOutlined />}
            style={{ borderRadius: '25px', marginBottom: '20px' }}>
            <Link to="/ado">ADO</Link>
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<UserOutlined />}
            style={{ borderRadius: '25px', marginBottom: '20px' }}>
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
