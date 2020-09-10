import React, { Component } from 'react';
import { Layout, Button, PageHeader, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './Header.css';

const { Header } = Layout;

class Headers extends Component {
  render() {
    console.log('header', this.props);
    return (
      <Header
        className="site-layout-background"
        style={{ padding: '0 20px', background: '#fff' }}>
        <div className="header-style">
          <div>
            {React.createElement(
              this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: this.props.toggle,
                style: { fontSize: '20px' },
              },
            )}
          </div>
          <div>
            <Space>
              <Button key="analysis" className="headerButton">
                Analysis
              </Button>
              <Button
                key="logout"
                className="headerButton"
                htmlType="submit"
                onClick={() => this.props.logout()}>
                Logout
              </Button>
            </Space>
          </div>
        </div>
      </Header>
    );
  }
}

export default Headers;
