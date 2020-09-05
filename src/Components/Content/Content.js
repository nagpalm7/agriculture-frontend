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
          margin: '35px 17px 0px 49px',
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
    );
  }
}
export default Contents;
