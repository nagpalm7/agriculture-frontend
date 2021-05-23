import React, { Component } from 'react';
import { Layout } from 'antd';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Headers from '../../Components/Header/Header';
import Contents from '../../Components/Content/Content';
import MyDrawer from '../../Components/Drawer/Drawer.js';

class AdoDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  onClose = () => {
    this.setState({
      ...this.state,
      collapsed: false,
    });
  };
  render() {
    console.log('x');
    return (
      <div>
        <Layout style={{ height: '100vh' }}>
          <Sidebar
            collapsed={this.state.collapsed}
            type="ado_dashboard"
            pathname={this.props.history.location.pathname}
          />
          <MyDrawer
            type="ado_dashboard"
            pathname={this.props.history.location.pathname}
            collapsed={this.state.collapsed}
            onClose={this.onClose}></MyDrawer>
          <Layout
            className="site-layout"
            style={{ backgroundColor: '#f5f3ff', overflowY: 'auto' }}>
            <Headers
              logout={this.props.logout}
              toggle={this.toggle}
              collapsed={this.state.collapsed}
              loginData={this.props.loginData}
              lang={this.props.lang}
              setLang={this.props.setLang}
            />
            <Contents
              history={this.props.history}
              style={{ overflowY: 'scroll' }}
              role={3}
              loginData={this.props.loginData}
              lang={this.props.lang}
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}
export default AdoDashboard;
