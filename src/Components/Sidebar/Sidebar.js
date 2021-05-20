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
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';

const { Sider } = Layout;
const { SubMenu } = Menu;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en',
    };
  }
  render() {
    if (this.props.type == 'admin_dashboard') {
      return (
        <IntlProvider
          locale={this.state.lang}
          messages={Languages[this.props.lang]}>
          <Sider
            width="220px"
            breakpoint="sm"
            collapsedWidth="80"
            trigger={null}
            collapsible
            collapsed={this.props.collapsed}
            className="large_screen_sider"
            style={{
              overflowY: 'auto',
            }}
            className="sidebar-style">
            <div className="logo">
              {this.props.collapsed ? (
                <FormattedMessage
                  id="afl"
                  defaultMessage="some default one"
                  values={this.state.localeLang}
                />
              ) : (
                <>
                  {' '}
                  <FormattedMessage
                    id="afl"
                    defaultMessage="some default one"
                    values={this.state.localeLang}
                  />{' '}
                  <FormattedMessage
                    id="monitoring"
                    defaultMessage="some default one"
                    values={this.state.localeLang}
                  />{' '}
                </>
              )}
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
                <Link to="/">
                  {' '}
                  <FormattedMessage
                    id="home"
                    defaultMessage="some default one"
                    values={this.state.localeLang}
                  />
                </Link>
              </Menu.Item>
              <Menu.Item
                key="district"
                icon={<VideoCameraFilled />}
                style={{ borderRadius: '0px', marginBottom: '20px' }}>
                <Link to="/district">
                  {' '}
                  <FormattedMessage
                    id="district"
                    defaultMessage="some default one"
                    values={this.state.localeLang}
                  />
                </Link>
              </Menu.Item>
              <Menu.Item
                key="villages"
                icon={<UploadOutlined />}
                style={{ borderRadius: '0px', marginBottom: '20px' }}>
                <Link to="/villages">
                  <FormattedMessage
                    id="village"
                    defaultMessage="some default one"
                    values={this.state.localeLang}
                  />
                </Link>
              </Menu.Item>
              <Menu.Item
                key="dda"
                icon={<TeamOutlined />}
                style={{ borderRadius: '0px', marginBottom: '20px' }}>
                <Link to="/dda">
                  <FormattedMessage
                    id="dda"
                    defaultMessage="DDA"
                    values={this.state.localeLang}
                  />
                </Link>
              </Menu.Item>
              <Menu.Item
                key="ado"
                icon={<UserOutlined />}
                style={{ borderRadius: '0px', marginBottom: '20px' }}>
                <Link to="/ado">
                  <FormattedMessage
                    id="ado"
                    defaultMessage="ADO"
                    values={this.state.localeLang}
                  />
                </Link>
              </Menu.Item>
              <SubMenu
                inlineCollapsed={true}
                icon={<UserOutlined />}
                title={<FormattedMessage
                  id="locations"
                  defaultMessage="some default one"
                  values={this.state.localeLang}
                />}
                key="locations">
                <Menu.Item key="pending">
                  <Link to="/locations/pending">
                    <FormattedMessage
                      id="pending"
                      defaultMessage="some default one"
                      values={this.state.localeLang}
                    />
                  </Link>
                </Menu.Item>
                <Menu.Item key="ongoing">
                  <Link to="/locations/ongoing">
                    <FormattedMessage
                      id="ongoing"
                      defaultMessage="some default one"
                      values={this.state.localeLang}
                    />
                  </Link>
                </Menu.Item>
                <Menu.Item key="completed">
                  <Link to="/locations/completed">
                    <FormattedMessage
                      id="completed"
                      defaultMessage="some default one"
                      values={this.state.localeLang}
                    />
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
        </IntlProvider>
      );
    } else if (this.props.type == 'dda_dashboard') {
      return (
        <Sider
          width="220px"
          breakpoint="sm"
          collapsedWidth="80"
          trigger={null}
          collapsible
          style={{
            overflowY: 'auto',
          }}
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
        </Sider>
      );
    } else if (this.props.type == 'ado_dashboard') {
      return (
        <Sider
          width="220px"
          breakpoint="sm"
          collapsedWidth="80"
          trigger={null}
          collapsible
          style={{
            overflowY: 'auto',
          }}
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
              <Menu.Item key="completed">
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
