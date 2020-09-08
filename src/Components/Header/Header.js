import React, { Component } from 'react';
import { Layout, Button, PageHeader } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './Header.css';

const { Header } = Layout;

class Headers extends Component {
  render() {
    console.log('header', this.props);
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <PageHeader
          className="site-page-header"
          ghost={false}
          title=""
          subTitle=""
          extra={[
            <>
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
            </>,
          ]}
        />
        {React.createElement(
          this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: 'trigger',
            onClick: this.props.toggle,
          },
        )}
      </Header>
    );
  }
}

export default Headers;
