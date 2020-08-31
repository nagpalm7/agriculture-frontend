import React, { Component } from 'react';
import { Layout, Button, PageHeader } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header } = Layout;

class Headers extends Component {
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
    );
  }
}

export default Headers;
