import React, { Component } from 'react';
import { Layout } from 'antd';
import './AdminDashboard.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Headers from '../../Components/Header/Header';
import Contents from '../../Components/Content/Content';
import MyDrawer from '../../Components/Drawer/Drawer.js';
class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
    };
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  onClose=()=>{
    this.setState({
      ...this.state,
      collapsed:false,
    })
  }
  render() {
    return (
      <div>
        <Layout style={{ height: '100vh' }}>
          <Sidebar collapsed={this.state.collapsed} type="admin_dashboard" pathname={this.props.history.location.pathname}/>     
          <MyDrawer type="admin_dashboard" pathname={this.props.history.location.pathname} collapsed={this.state.collapsed} onClose={this.onClose}></MyDrawer> 
          <Layout
            className="site-layout"
            style={{ backgroundColor: '#f5f3ff',overflowY:'auto' 
             }}>
            <Headers
              logout={this.props.logout}
              toggle={this.toggle}
              collapsed={this.state.collapsed}
            />

            <Contents history={this.props.history} style={{overflowY:'scroll',}} role={5}/>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default AdminDashboard;
