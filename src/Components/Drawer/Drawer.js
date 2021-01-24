import React, { Component } from 'react';
import { Drawer, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeFilled,
  UserOutlined,
  UploadOutlined,
  DownOutlined,
  TeamOutlined,
  VideoCameraFilled,
} from '@ant-design/icons';
import './Drawer.css';
const { SubMenu } = Menu;

class MyDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Drawer
        title="AFL Monitoring"
        headerStyle={{
          textAlign: 'center',
          fontWeight: 1000,
        }}
        placement="left"
        closable={false}
        onClose={this.props.onClose}
        visible={this.props.collapsed}>
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
            marginTop: '-1px',
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
      </Drawer>
    );
  }
}
export default MyDrawer;
