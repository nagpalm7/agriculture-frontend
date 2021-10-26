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
import {MdHolidayVillage} from  "react-icons/md";
import {ImHome } from "react-icons/im";
import {ImLocation } from "react-icons/im";

import {FaGithub} from  "react-icons/fa";
const { SubMenu } = Menu;

class MyDrawer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.type == 'admin_dashboard') {
      return (
        <div id="side_drawer">
          <Drawer
            title="AFL Monitoring"
            headerStyle={{
              textAlign: 'center',
              fontWeight: '1000',
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
                style={{ marginBottom: '20px', padding: '0px', borderRadius: '0px',}}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item
                key="district"
                icon={<ImHome/>}
                style={{ borderRadius: '0px', marginBottom: '20px' }}>
                <Link to="/district">District</Link>
              </Menu.Item>
              <Menu.Item
                key="villages"
                icon={<MdHolidayVillage />}
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
                icon={<ImLocation />}
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
        </div>
      );
    } else if (this.props.type == 'dda_dashboard') {
      return (
        <Drawer
          title="AFL Monitoring"
          headerStyle={{
            textAlign: 'center',
            fontWeight: '1000',
          }}
          placement="left"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            className="side-menu-style"
            style={{
              background: 'white',
              color: 'black',
              padding: '0px',
              marginTop: '-1px',
            }}
            defaultSelectedKeys={[
              this.props.pathname.split('/')[1] == ''
                ? 'home'
                : this.props.pathname.split('/')[1],
              this.props.pathname.split('/')[2],
            ]}
            defaultOpenKeys={[this.props.pathname.split('/')[1]]}>
            <Menu.Item
              key="home"
              icon={<HomeFilled />}
              style={{ marginBottom: '20px', padding: '0px' }}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              key="villages"
              icon={<UploadOutlined />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/villages">Villages</Link>
            </Menu.Item>

            <Menu.Item
              key="ado"
              icon={<UserOutlined />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/ado">ADO</Link>
            </Menu.Item>
            <SubMenu key="locations" icon={<UserOutlined />} title="Locations">
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
    } else if (this.props.type == 'ado_dashboard') {
      return (
        <Drawer
          title="AFL Monitoring"
          headerStyle={{
            textAlign: 'center',
            fontWeight: '1000',
          }}
          placement="left"
          closable={false}
          onClose={this.props.onClose}
          visible={this.props.collapsed}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            className="side-menu-style"
            style={{
              background: 'white',
              color: 'black',
              padding: '0px',
              marginTop: '-1px',
            }}
            defaultSelectedKeys={[
              this.props.pathname.split('/')[1] == ''
                ? 'home'
                : this.props.pathname.split('/')[1],
              this.props.pathname.split('/')[2],
            ]}
            defaultOpenKeys={[this.props.pathname.split('/')[1]]}>
            <Menu.Item
              key="home"
              icon={<HomeFilled />}
              style={{ marginBottom: '20px', padding: '0px' }}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item
              key="villages"
              icon={<UploadOutlined />}
              style={{ borderRadius: '0px', marginBottom: '20px' }}>
              <Link to="/villages">Villages</Link>
            </Menu.Item>
            <SubMenu key="locations" icon={<UserOutlined />} title="Locations">
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
}
export default MyDrawer;
