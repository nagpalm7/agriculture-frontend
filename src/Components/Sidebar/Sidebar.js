import React, { Component } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  HomeFilled,
  UserOutlined,
  UploadOutlined,
  DownOutlined,
  TeamOutlined,
  VideoCameraFilled,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const { Sider } = Layout;
const { SubMenu } = Menu;
class Sidebar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.pathname.split('/')[1]);
    if (this.props.type == 'admin_dashboard') {
      return (
        <Sider
          width="220px"
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
            defaultSelectedKeys={[
              this.props.pathname.split('/')[1] == ''
                ? 'home'
                : this.props.pathname.split('/')[1],
              this.props.pathname.split('/')[2],
            ]}
            className="side-menu-style"
            style={{
              background: 'white',
              color: 'black',
              padding: '0px',
            }}
            defaultOpenKeys={[this.props.pathname.split('/')[1]]}>
            <Menu.Item
              key="home"
              icon={<HomeFilled />}
              style={{ marginBottom: '20px', padding: '0px' }}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              key="district"
              icon={<VideoCameraFilled />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/district">District</Link>
            </Menu.Item>
            <Menu.Item
              key="villages"
              icon={<UploadOutlined />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/villages">Villages</Link>
            </Menu.Item>
            <Menu.Item
              key="dda"
              icon={<TeamOutlined />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/dda">DDA</Link>
            </Menu.Item>
            <Menu.Item
              key="ado"
              icon={<UserOutlined />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/ado">ADO</Link>
            </Menu.Item>
            <SubMenu
              inlineCollapsed={true}
              icon={<UserOutlined />}
              title="Locations"
              key="locations">
              <Menu.Item key="pending">
                <Link to="/locations/pending">Pending</Link>
              </Menu.Item>
              <Menu.Item key="ongoing">
                <Link to="/locations/ongoing">Ongoing</Link>
              </Menu.Item>
              <Menu.Item key="completed">
                <Link to="/locations/completed">Completed</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      );
    } else if (this.props.type == 'dda_dashboard') {
      return (
        <Sider
          width="220px"
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
            style={{
              background: 'white',
              color: 'black',
              padding: '0px',
            }}>
            <Menu.Item
              key="1"
              icon={<HomeFilled />}
              style={{ marginBottom: '20px', padding: '0px' }}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<UploadOutlined />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/villages">Villages</Link>
            </Menu.Item>

            <Menu.Item
              key="3"
              icon={<UserOutlined />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/ado">ADO</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Locations">
              <Menu.Item>
                <Link to="/locations/pending">Pending</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/locations/ongoing">Ongoing</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/locations/completed">Completed</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
      );
    }
  }
}

export default Sidebar;
