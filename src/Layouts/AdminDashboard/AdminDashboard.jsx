import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
import dashboard_routes from '../../routes/dashboard_routes';
import { BrowserRouter, Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Sider, Content, Footer } = Layout;

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
      <BrowserRouter>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">
              {this.state.collapsed ? 'AFL' : 'AFL Monitoring'}
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<HomeFilled />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/district"> District</Link>
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
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <PageHeader
                ghost={false}
                title=""
                subTitle=""
                extra={[
                  <>
                    <Button shape="round">Analysis</Button>
                    <Button
                      shape="round"
                      htmlType="submit"
                      onClick={() => this.props.logout()}>
                      Logout
                    </Button>
                  </>,
                ]}
              />
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.toggle,
                },
              )}
            </Header>

            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}>
              <div style={{ flex: 1, padding: '10px' }}>
                <Switch>
                  {dashboard_routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      children={<route.component />}
                    />
                  ))}
                </Switch>
              </div>
            </Content>

            <Footer>footer</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default AdminDashboard;
