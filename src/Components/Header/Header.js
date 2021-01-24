import React, { Component } from 'react';
import { Layout, Button, Space } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './Header.css';
import MyButton from '../ButtonComponent/MyButton';
import { Link } from 'react-router-dom';
import PopOver from '../../Components/PopOver/Popover.js';

const { Header } = Layout;

class Headers extends Component {
  render() {
    return (
      <Header
        className="site-layout-background"
        style={{ padding: '0 20px', background: '#fff', overflowX: 'auto' }}>
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
          <PopOver></PopOver>
          <div className="largeScreenIcons">
            <Space>
              <Link to="/comparison">
                <MyButton
                  text="Comparison"
                  className="outlined"
                  style={{
                    color: '#e03b3b',
                    backgroundColor: '#f5f3ff',
                    border: '0px',
                  }}
                />
              </Link>
              <Link to="/Analysis">
                <MyButton
                  text="Analysis"
                  className="outlined"
                  style={{
                    color: '#e03b3b',
                    backgroundColor: '#f5f3ff',
                    border: '0px',
                  }}
                />
              </Link>
              <MyButton
                text="Logout"
                className="outlined"
                id="logout-button"
                onClick={this.props.logout}
                style={{
                  color: 'white',
                  backgroundColor: '#e03b3b',
                  border: '1px solid #e03b3b',
                  fontWeight: '500',
                }}
              />
            </Space>
          </div>
        </div>
      </Header>
    );
  }
}

export default Headers;
