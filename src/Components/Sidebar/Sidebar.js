import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeFilled,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import '../../Layouts/AdminDashboard/AdminDashboard.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends Component {
  render() {
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
          <Menu.Item
            key="1"
            onClick={() => {
              this.props.history.push('/');
            }}
            icon={<HomeFilled className="inside" />}>
            Home
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={() => {
              this.props.history.push('/district');
            }}
            icon={<VideoCameraOutlined className="inside" />}>
            District
          </Menu.Item>
          <Menu.Item
            key="3"
            onClick={() => {
              this.props.history.push('/villages');
            }}
            icon={<UploadOutlined className="inside" />}>
            Villages
          </Menu.Item>
          <Menu.Item
            key="4"
            onClick={() => {
              this.props.history.push('/dda');
            }}
            icon={<TeamOutlined className="inside" />}>
            DDA
          </Menu.Item>
          <Menu.Item
            key="5"
            onClick={() => {
              this.props.history.push('/ado');
            }}
            icon={<UserOutlined className="inside" />}>
            ADO
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

export default withRouter(Sidebar);
