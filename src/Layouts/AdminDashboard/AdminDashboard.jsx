import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../Pages/Home/Home';
import District from '../../Pages/District/District';
import Villages from '../../Pages/Villages/Villages';
import DDA from '../../Pages/DDA/DDA';
import ADO from '../../Pages/ADO/ADO';
import Locations from '../../Pages/Locations/Locations';
import { Layout, Menu, Dropdown, Button, PageHeader, Row, Col } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
} from '@ant-design/icons';
import './AdminDashboard.css';

const { Header, Footer, Sider, Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        Pending
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
        Ongoing
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="">
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
      <div>
        <Col>
          <Row span={24}>
            <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}>
                <div className="logo" />

                <br />
                <br />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                  <h1 className="heading">AFL Monitoring</h1>
                  <Menu.Item key="1">Home</Menu.Item>
                  <Menu.Item key="2">District</Menu.Item>
                  <Menu.Item key="3">Villages</Menu.Item>
                  <Menu.Item key="4">DDA</Menu.Item>
                  <Menu.Item key="5">ADO</Menu.Item>
                  <Menu.Item key="6">
                    <Dropdown overlay={menu}>
                      <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}>
                        Locations <DownOutlined />
                      </a>
                    </Dropdown>
                  </Menu.Item>
                </Menu>
              </Sider>
              <Layout>
                <>
                  <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}>
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
                      this.state.collapsed
                        ? MenuUnfoldOutlined
                        : MenuFoldOutlined,
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
                    <Switch>
                      <Route
                        path="/home"
                        render={(props) => (
                          <Home {...props} logout={this.props.logout} />
                        )}
                      />
                      <Route
                        path="/district"
                        render={(props) => (
                          <District {...props} logout={this.props.logout} />
                        )}
                      />
                      <Route
                        path="/villages"
                        render={(props) => (
                          <Villages {...props} logout={this.props.logout} />
                        )}
                      />
                      <Route
                        path="/dda"
                        render={(props) => (
                          <DDA {...props} logout={this.props.logout} />
                        )}
                      />
                      <Route
                        path="ado"
                        render={(props) => (
                          <ADO {...props} logout={this.props.logout} />
                        )}
                      />
                      <Route
                        path="/locations"
                        render={(props) => (
                          <Locations {...props} logout={this.props.logout} />
                        )}
                      />
                      <Route
                        path="/xyz"
                        render={(props) => <Home {...props} />}
                        logout={this.props.logout}
                      />
                      <Redirect from="/" to="/home" />
                    </Switch>
                  </Content>
                  <Footer>Footer</Footer>
                </>
              </Layout>
            </Layout>
          </Row>
        </Col>
      </div>
    );
  }
}

export default AdminDashboard;
