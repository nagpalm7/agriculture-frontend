import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import dashboard_routes from '../../routes/dashboard_routes';
import { Layout } from 'antd';

const { Content } = Layout;

class Contents extends Component {
  render() {
    return (
      <Content
        className="site-layout-background"
        style={{
          margin: '25px 17px 0px 49px',
          minHeight: 280,
          backgroundColor: "transparent"
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
    );
  }
}
export default Contents;
