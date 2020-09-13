import React, { Component } from 'react';
import { Layout, Button, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './Header.css';
import MyButton from '../ButtonComponent/MyButton';

const { Header } = Layout;

class Headers extends Component {
  render() {
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
              <MyButton text="Analysis" className="outlined" />
              <MyButton
                text="Logout"
                className="outlined"
                onClick={this.props.logout}
              />
            </Space>
          </div>
        </div>
      </Header>
    );
  }
}

export default Headers;
