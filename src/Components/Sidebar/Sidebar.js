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
import './Sidebar.css';
import dashboard_routes from '../../routes/dashboard_routes';
import { Link } from 'react-router-dom';
import '../../Layouts/AdminDashboard/AdminDashboard.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
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
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        className="sidebar">
        <div className="logo">
          {this.props.collapsed ? 'AFL' : 'AFL Monitoring'}
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
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title="Locations"
            className="submenu">
            <Link to="/locations">
              <Menu.Item key="7" className="select">
                Pending
              </Menu.Item>
              <Menu.Item key="8" className="select">
                Ongoing
              </Menu.Item>
              <Menu.Item key="9" className="select">
                Completed
              </Menu.Item>
            </Link>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
